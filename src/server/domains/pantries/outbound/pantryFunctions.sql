/*
  Function to reduce pantry items! It prioritizes the things that
  will expire first.  

  Examples:
  Reduce user 1's ingredient ID 42 by 2.5:
  SELECT reduce_pantry_fefo(1, 42, 2.5) 

  Reduce user 1's ingredient ID 42 by 2.5, unless it's frozen:
  SELECT reduce_pantry_fefo(1, 42, 2.5, TRUE);
*/ 

CREATE OR REPLACE FUNCTION reduce_pantry_fefo(
  p_user_id INT, 
  p_ingredient_id INT, 
  p_amount_needed DECIMAL,
  p_exclude_frozen BOOLEAN DEFAULT FALSE
) RETURNS VOID AS $
DECLARE
  v_total_available DECIMAL;
BEGIN
  -- Check if we have enough in total
  SELECT SUM(amount_purchased - amount_consumed) INTO v_total_available
  FROM pantries
  WHERE user_id = p_user_id 
    AND ingredient_id = p_ingredient_id
    AND status NOT IN ('USED', 'EXPIRED');
    
  IF v_total_available < p_amount_needed THEN
    RAISE EXCEPTION 'Insufficient quantity of ingredient %. Needed: %, Available: %', 
      p_ingredient_id, p_amount_needed, v_total_available;
  END IF;
  
  WITH ordered_items AS (
    SELECT 
      id,
      amount_purchased,
      amount_consumed,
      (amount_purchased - amount_consumed) AS available_amount,
      expires_on
    FROM pantries
    WHERE user_id = p_user_id 
      AND ingredient_id = p_ingredient_id
      AND status NOT IN ('USED', 'EXPIRED')
      -- When p_exclude_frozen is FALSE it's (NOT FALSE OR status != 'FROZEN') which is TRUE
      AND (NOT p_exclude_frozen OR status != 'FROZEN')
    ORDER BY expires_on ASC NULLS LAST
  ),
  running_amounts AS (
    SELECT
      id,
      amount_purchased,
      amount_consumed,
      available_amount,
      -- check out https://www.postgresql.org/docs/current/tutorial-window.html
      SUM(available_amount) OVER (ORDER BY expires_on ASC NULLS LAST ROWS UNBOUNDED PRECEDING) AS running_total
    FROM ordered_items
  ),
  consumption_amounts AS (
    SELECT
      id,
      amount_purchased,
      amount_consumed,
      available_amount,
      running_total,
      CASE
        -- Items that are fully before our needed amount - consume all
        WHEN (running_total - available_amount) < p_amount_needed 
          THEN available_amount
        -- Item that crosses our threshold - partial consumption
        WHEN running_total > p_amount_needed AND (running_total - available_amount) < p_amount_needed
          THEN p_amount_needed - (running_total - available_amount)
        -- Don't go into negatives, you can have crippling debt sure but not negative groceries.
        ELSE 0
      END AS amount_to_consume
    FROM running_amounts
  )
  UPDATE pantries
  SET 
    amount_consumed = pantries.amount_consumed + ca.amount_to_consume,
    status = CASE 
      WHEN pantries.amount_consumed + ca.amount_to_consume >= pantries.amount_purchased 
        THEN 'USED'::storage_type 
      ELSE status 
    END
  FROM consumption_amounts ca
  WHERE pantries.id = ca.id
    AND ca.amount_to_consume > 0;
    
END;
$$ LANGUAGE plpgsql;