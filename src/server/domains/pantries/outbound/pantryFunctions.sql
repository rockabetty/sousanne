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
) RETURNS VOID AS $$
DECLARE
  v_remaining_needed DECIMAL := p_amount_needed;
  v_consume_amount DECIMAL;
  rec RECORD;
BEGIN
  -- this is processing things in order of expiration see line 36
  FOR rec IN (
    SELECT 
      id,
      amount_purchased,
      amount_consumed,
      (amount_purchased - amount_consumed) AS available_amount
    FROM pantry_items
    WHERE user_id = p_user_id 
      AND ingredient_id = p_ingredient_id
      AND status NOT IN ('CONSUMED', 'EXPIRED')
      AND (NOT p_exclude_frozen OR status NOT IN ('FROZEN', 'FROZEN_OPEN', 'FROZEN_SEALED'))  -- Updated to handle new status values
    ORDER BY expires_on ASC NULLS LAST
  ) LOOP
    EXIT WHEN v_remaining_needed <= 0;
    
    v_consume_amount := LEAST(rec.available_amount, v_remaining_needed);
    
    UPDATE pantry_items  
    SET 
      amount_consumed = amount_consumed + v_consume_amount,
      status = CASE 
        WHEN amount_consumed + v_consume_amount >= amount_purchased 
          THEN 'CONSUMED'::storage_type 
        WHEN status = 'SHELF_SEALED'
          THEN 'SHELF_OPEN'::storage_type
        WHEN status = 'REFRIGERATED_SEALED'
          THEN 'REFRIGERATED_OPEN'::storage_type
        WHEN status = 'FROZEN_SEALED'
          THEN 'FROZEN_OPEN'::storage_type
        ELSE status
      END
    WHERE id = rec.id;
    
    v_remaining_needed := v_remaining_needed - v_consume_amount;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

/*
  Function to update expiration dates of pantry items! It's triggered
  by any instance of a pantry item's status changing since there is no
  world or situation in which the expiration date info shouldn't update
  according to the storage status changing.
*/ 
CREATE OR REPLACE FUNCTION update_pantry_expiration()
RETURNS TRIGGER AS $$
BEGIN
  IF (OLD.status = 'SHELF_SEALED' AND NEW.status = 'SHELF_OPEN') OR
     (OLD.status = 'REFRIGERATED_SEALED' AND NEW.status = 'REFRIGERATED_OPEN') OR
     (OLD.status = 'FROZEN_SEALED' AND NEW.status = 'FROZEN_OPEN') OR
     (OLD.status NOT LIKE 'FROZEN%' AND NEW.status LIKE 'FROZEN%') OR
     (OLD.status LIKE 'FROZEN%' AND NEW.status NOT LIKE 'FROZEN%') THEN
    
    -- This joins to ingredient_hierarchy to get the shelf life data
    UPDATE pantry_items
    SET expires_on = CASE
        WHEN NEW.status IN ('FROZEN', 'FROZEN_SEALED', 'FROZEN_OPEN') THEN
          NEW.purchased_on + (ih.shelf_life_frozen * INTERVAL '1 day') 
        WHEN NEW.status = 'SHELF_OPEN' THEN 
          NEW.purchased_on + (ih.shelf_life_room_temp_open * INTERVAL '1 day')
        WHEN NEW.status = 'REFRIGERATED_OPEN' THEN 
          NEW.purchased_on + (ih.shelf_life_refrigerated_open * INTERVAL '1 day')
        WHEN NEW.status = 'SHELF_SEALED' THEN
          NEW.purchased_on + (ih.shelf_life_room_temp_sealed * INTERVAL '1 day')
        WHEN NEW.status = 'REFRIGERATED_SEALED' THEN
          NEW.purchased_on + (ih.shelf_life_refrigerated_sealed * INTERVAL '1 day')
        ELSE
          NEW.expires_on 
      END
    FROM ingredients i
    JOIN ingredient_hierarchy ih ON i.ingredient_hierarchy_id = ih.id
    WHERE pantry_items.id = NEW.id AND i.id = NEW.ingredient_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pantry_status_change_trigger
AFTER UPDATE OF status ON pantry_items
FOR EACH ROW
WHEN (OLD.status IS DISTINCT FROM NEW.status)
EXECUTE FUNCTION update_pantry_expiration();