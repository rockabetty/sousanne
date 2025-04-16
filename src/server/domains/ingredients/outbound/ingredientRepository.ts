import { queryDbConnection } from "@postgres";
import { handleDatabaseError } from "@errors"
import { Ingredient } from "../ingredients.types";

export async function selectIngredientsByName (name: string): Promise<Ingredient[]> {
  try {
    const query =`
    SELECT
      i.id,
      i.name,
      ih.path
    FROM
      ingredients i
    JOIN
      ingredient_hierarchy ih ON ih.id = i.ingredient_hierarchy_id
    WHERE
      i.name ILIKE $1
    ORDER BY
      CASE
        WHEN name ILIKE $2 THEN 0  -- Exact match
        WHEN name ILIKE $3 THEN 1  -- Starts with query
        ELSE 2                     -- Contains query
      END,
      name ASC
    `;

    const values = [
      `%${query}%`,    // general LIKE match
      `${query}`,      // exact match
      `${query}%`      // "starts with"
    ];
    
    const queryResult = await queryDbConnection(query,values);
    return queryResult.rows;

  } catch (error) {
    handleDatabaseError(error)
  }
}

export async function selectIngredientArchetypes ( 
  limit: number = 50,
  offset: number = 0,): Promise<Ingredient[]> {
  try {
    const query = `
    SELECT
      i.id,
      i.name,
      ih.path
    FROM
      ingredients i
    JOIN
      ingredient_hierarchy ih ON ih.id = i.ingredient_hierarchy_id
    WHERE archetype IS TRUE
    ORDER BY i.name ASC
    OFFSET $1
    LIMIT $2
    `;

    const values = [offset, limit]
    const queryResult = await queryDbConnection(query,values);
    return queryResult.rows;
  }
  catch (error) {
    handleDatabaseError(error);
  }
}

export async function selectIngredientOptions(ingredientId: number): Promise<Ingredient[]> {
  try {
    const query = `WITH relevant_hierarchy AS (
      SELECT 
        i.id,
        i.name,
        ih.path
      FROM 
        ingredients i
      JOIN
        ingredient_hierarchy ih ON ih.id = i.ingredient_hierarchy_id
      WHERE 
        i.id = $1
    )
    SELECT
      child_i.id,
      child_i.name
    FROM
      relevant_hierarchy rh
    JOIN
      ingredient_hierarchy child_ih ON child_ih.path <@ rh.path AND child_ih.path != rh.path
    JOIN
      ingredients child_i ON child_i.ingredient_hierarchy_id = child_ih.id
    ORDER BY
      child_i.name;
    `;
    
    const values = [ingredientId];
    const queryResult = await queryDbConnection(query, values);
    return queryResult.rows;
  } catch (error) {
    handleDatabaseError(error);
  }
}

export async function selectIngredientById(id: number): Promise<Ingredient> {
  try {
    console.log(id)
    const query = `
    SELECT 
      i.id,
      i.name,
      description,
      shelf_life_room_temp_sealed,
      shelf_life_room_temp_open,
      shelf_life_refrigerated_sealed,
      shelf_life_refrigerated_open,
      shelf_life_frozen,
      average_weight,
      edible_percentage,
      cooking_yield_percentage,
      cup_weight,
      u.name as unit
    FROM 
      ingredients i
    JOIN
      ingredient_hierarchy ih ON ih.id = i.ingredient_hierarchy_id
    JOIN
      units u ON u.id = ih.unit_id
    WHERE 
        i.id = $1
    `;
    const values = [id]
    const queryResult = await queryDbConnection(query, values)
    return queryResult.rows[0]
  } catch (error) {
    handleDatabaseError(error)
  }
}

export async function selectIngredientOptionsWithSeasonality(ingredientId: number): Promise<Ingredient[]> {
  try {
    const query = `
      WITH relevant_hierarchy AS (
          SELECT 
            i.id,
            i.name,
            ih.path
          FROM 
            ingredients i
          JOIN
            ingredient_hierarchy ih ON ih.id = i.ingredient_hierarchy_id
          WHERE 
            i.id = $1
        ),
        ingredient_options AS (
          SELECT
            child_i.id,
            child_i.name,
            CASE 
              WHEN child_ih.path::text LIKE '%produce%' OR child_ih.path::text LIKE '%seafood%' OR child_ih.path::text LIKE '%wildgame%' THEN
                COALESCE((
                  SELECT ist.status
                  FROM ingredient_seasonality ist
                  WHERE 
                    ist.ingredient_hierarchy_id = child_i.id AND
                    ist.region_id = 1 AND
                    ist.month = EXTRACT(MONTH FROM CURRENT_DATE)::integer
                  LIMIT 1
                ))
              ELSE 'NON_SEASONAL'
            END AS seasonality_status
          FROM
            relevant_hierarchy rh
          JOIN
            ingredient_hierarchy child_ih ON child_ih.path <@ rh.path AND child_ih.path != rh.path
          JOIN
            ingredients child_i ON child_i.ingredient_hierarchy_id = child_ih.id
        )
        SELECT
          id,
          name,
          seasonality_status
        FROM
          ingredient_options
        ORDER BY
          CASE 
            WHEN seasonality_status = 'IN_SEASON' THEN 1
            WHEN seasonality_status = 'STORAGE' THEN 2
            WHEN seasonality_status = 'NON_SEASONAL' THEN 3
            ELSE 4
          END,
          name;
    `;
    
    const values = [ingredientId];
    const queryResult = await queryDbConnection(query, values);
    return queryResult.rows;
  } catch (error) {
    handleDatabaseError(error);
  }
}