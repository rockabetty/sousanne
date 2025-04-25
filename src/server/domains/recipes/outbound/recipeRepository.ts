import { queryDbConnection } from '@postgres'
import { QueryResult } from 'pg'
import { handleDatabaseError } from '@errors'

export async function selectRecipes(
  offset: number = 0,
  limit: number = 20
): Promise<Recipe[] | null> {
  try {
    const query = `
            SELECT *
            FROM recipes
            OFFSET $1
            LIMIT $2
        `
    const values = [limit, offset]
    const queryResult = await queryDbConnection(query, values)
    return queryResult.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

export async function selectRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const query = `
        SELECT 
            r.name,
            r.base_serving_size,
            r.cook_time,
            r.oven_preheat,
            r.active_prep_time,
            r.wait_time,
            ingredients,
            instructions
        FROM 
            recipes r 
        CROSS JOIN LATERAL (
            SELECT array_agg(json_build_object(
                'id', i.id,
                'name', i.name,
                'amount', ri.amount,
                'unit', u.name,
                'abbreviation', u.abbreviation
            )) AS ingredients
            FROM recipe_ingredients ri
            LEFT JOIN ingredients i ON i.id = ri.ingredient_id
            LEFT JOIN units u ON u.id = ri.unit_id
            WHERE ri.recipe_id = r.id
        ) ing
        CROSS JOIN LATERAL (
            SELECT array_agg(rs.instruction ORDER BY rs.step_order ASC) AS instructions
            FROM recipe_steps rs
            WHERE rs.recipe_id = r.id
        ) inst
        WHERE
            r.slug = $1;
        `
    const values = [slug]
    const queryResult = await queryDbConnection(query, values)
    return queryResult.rows[0]
  } catch (error) {
    handleDatabaseError(error)
  }
}
