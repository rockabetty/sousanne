import { queryDbConnection } from "@postgres";
import { QueryResult } from 'pg';
import { handleDatabaseError } from "@errors"
import { RecipeIngredient } from '../ingredients.types';
import { PantryIngredient } from '../pantries.types';
import { ErrorKeys } from "../errors.types";


/**
 * Selects the available amount of specified ingredients in a user's pantry, 
 * regardless of their storage state (e.g., frozen items are still considered).
 * An ingredient is available if its status is neither "CONSUMED" nor "EXPIRED".
 * 
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 */
export async function selectAvailableAmountInPantry(ingredientIds: number[], user_id: number): Promise<PantryIngredient[] | null> {
  try {
    const query = `SELECT 
      ingredient_id as id,
      amount_purchased - amount_consumed as amount
    FROM pantries
    WHERE
      user_id = $1 AND 
      ingredient_id = ANY($2) AND 
      (status IS NULL OR status NOT IN ('CONSUMED', 'EXPIRED'))`;
    const values = [user_id, ingredientIds];
    const queryResult = await queryDbConnection(query, values)
    return queryResult.rows 
  } catch (error) {
    handleDatabaseError(error);
  }
}

/**
 * Confirms if a specific pantry ingredient exists in a user's pantry period.
 * An ingredient is available if its status is neither "CONSUMED" nor "EXPIRED".
 * This is to be used to prevent expensive computations that would be pointless
 * if the user doesn't have the ingredient in the first place.
 * 
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 */
const confirmItemsAreAvailableInPantry = async function (user_id: number, ingredients: PantryIngredient[]): Promise<boolean> {
  try {
    const ingredientIds: number[] = ingredients.map((ingredient) => { return ingredient.ingredient_id})
    const query = `SELECT 
      count(1) 
      FROM pantries
      WHERE 
        user_id = $1 AND 
        ingredient_id = ANY($2) AND 
        (status IS NULL OR status NOT IN ('CONSUMED', 'EXPIRED'))`;
    const values = [user_id, ingredientIds];
    const queryResult = await queryDbConnection(query, values)
    console.log(queryResult.rows)
    console.log(ingredients)
    return queryResult.rows[0].count >= ingredientIds.length
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
* Sometimes, the same ingredient appears multiple times in a list.
* e.g., you reserve butter in a baking recipe for multiple uses.
*/
const collapseRepeatIngredients = function (ingredients: PantryIngredient[]): Map<number, PantryIngredient> { 
  const collapsedIngredientList = new Map<number, PantryIngredient>();
  ingredients.forEach(ing => {
    const currentIngredient = collapsedIngredientList.get(ing.ingredient_id) || { ingredient_id: ing.ingredient_id, amount: 0 }
    const {amount} = currentIngredient
    currentIngredient.amount += ing.amount
    collapsedIngredientList.set(ing.ingredient_id, currentIngredient);
  });
  return collapsedIngredientList;
}

/**
 * Confirms if a specific pantry ingredient has at least a specific amount.
 * An ingredient is available if its status is neither "CONSUMED" nor "EXPIRED".
 * 
 * @see confirmItemsAreAvailableInPantry to confirm if something exists at all. 
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 */
const confirmQuantitiesAreAvailableInPantry = async function (user_id: number, ingredients: PantryIngredient[]): Promise<boolean> {
  try {

    const ingredientsToConfirm = collapseRepeatIngredients(ingredients);
    const ingredientIdList: number[] = Array.from(ingredientsToConfirm.keys());
    const sumAmountsQuery = `
      SELECT 
        ingredient_id, 
        SUM(amount_purchased - amount_consumed) as available_amount
      FROM 
        pantries 
      WHERE 
        user_id = $1 
        AND ingredient_id = ANY($2)
        AND (status IS NULL OR status NOT IN ('EXPIRED', 'CONSUMED'))
      GROUP BY 
        ingredient_id
    `;

    const values = [user_id, ingredientIdList];
    const result = await queryDbConnection(sumAmountsQuery, values);
    console.log(result.rows)

    for (const row of result.rows) {
      const requiredAmount = ingredientsToConfirm.get(row.ingredient_id);
      if (!requiredAmount || row.available_amount < requiredAmount) {
        return false;
      }
    }
    return result.rows.length === ingredientIdList.length;
  }
  catch (error) {
    handleDatabaseError(error)
  }
};

/**
 * Records the consumption of one or more ingredients in a pantry.
 * Items are prioritized by their soonest expiration date. 
 * Frozen items are excluded from this function. 
 *
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 */
export async function consumePantryItemsFIFOStyle(user_id: number, ingredients: PantryIngredient[]) {
  const hasItems = await confirmItemsAreAvailableInPantry(user_id, ingredients)
  // if (!hasItems) {
  //   throw new Error(ErrorKeys.ITEMS_NOT_IN_PANTRY)
  // }
  const hasEnough = await confirmQuantitiesAreAvailableInPantry(user_id, ingredients)
  // if (!hasEnough) {
  //   throw new Error(ErrorKeys.ITEMS_NOT_IN_PANTRY)
  // }
  console.log("VERRNICE")
}
