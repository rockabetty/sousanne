import { queryDbConnection } from "@postgres";
import { QueryResult } from 'pg';
import { handleDatabaseError } from "@errors"
import { RecipeIngredient } from '../ingredients.types';

export async function selectAmountInPantry(ingredientIds: number[]): Promise<QueryResult | null> {
  try {
    const query = `SELECT 
      ingredient_id,
      amount_purchased - amount_consumed as amount
    FROM pantries
    WHERE
      user_id = $1 AND 
      ingredient_id = ANY($2) AND 
      (expires_on IS NULL or expires_on > NOW())`;
    const values = [2, ingredientIds];
    const queryResult = await queryDbConnection(query, values)
    return queryResult.rows
  } catch (error) {
    handleDatabaseError(error);
  }
}