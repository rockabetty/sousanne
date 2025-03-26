import { queryDbConnection } from "@postgres";
import { QueryResult } from 'pg';
import { handleDatabaseError } from "@errors"
import { IngredientOption } from '../ingredients.types';

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

export async function selectIngredientOptionsWithSeasonality(ingredientId: number): Promise<IngredientOption[]> {
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
              WHEN child_ih.path::text LIKE '%freshproduce%' OR child_ih.path::text LIKE '%freshseafood%' THEN
                COALESCE((
                  SELECT ist.status
                  FROM ingredient_seasonality ist
                  WHERE 
                    ist.ingredient_hierarchy_id = child_i.id AND
                    ist.region_id = 1 AND
                    ist.month = EXTRACT(MONTH FROM CURRENT_DATE)::integer
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