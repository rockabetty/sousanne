import { queryDbConnection } from "@postgres";
import { handleDatabaseError } from "@errors"
import { RecipeIngredient } from '@domains/ingredients/ingredients.types';
import { PantryIngredient } from '../pantries.types';
import { ErrorKeys } from "../errors.types";
import { collapseRepeatIngredients } from "../core/conversionService";

/**
 * Builds a comma-separated string of excluded statuses for SQL queries.
 * Always excludes EXPIRED and CONSUMED statuses, and optionally FROZEN.
 */
const _buildPracticalExclusions = function(excludeFrozen: boolean) {
  const excludedStatuses = ['EXPIRED', 'CONSUMED'];
    if (excludeFrozen) {
      excludedStatuses.push('FROZEN');
    }
  return excludedStatuses.map(s => `'${s}'`).join(', ')
}

/**
 * Selects the available amount of specified ingredients in a user's pantry, 
 * regardless of their storage state (e.g., frozen items are still considered).
 * An ingredient is available if its status is neither "CONSUMED" nor "EXPIRED".
 * It is not available if the amount_consumed >= amount_purchased.
 * @param user_id is the user owning the query.
 * @param ingredientIds refers to the database's ingredients table.
 * @param excludeFrozen defaults to false because the main use case for this
 *        function is to determine if you can cook something, which gives you
 *        the opportunity to thaw something out.
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 */
export async function selectAvailableAmountInPantry(
  ingredientIds: number[],
  user_id: number,
  excludeFrozen: boolean = false
): Promise<PantryIngredient[] | null> {
  try {
    const excludedStatuses = _buildPracticalExclusions(excludeFrozen);
    const query = `SELECT 
      ingredient_id as id,
      amount_purchased - amount_consumed as pantry_amount
    FROM pantries
    WHERE
      user_id = $1 AND 
      ingredient_id = ANY($2) AND 
      amount_purchased - amount_consumed > 0 AND
      (status IS NULL OR status NOT IN (${excludedStatuses}))`;
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
 * @param excludeFrozen defaults to false because the main use case for this
 *        function is to determine if you can cook something, which gives you
 *        the opportunity to thaw something out. If this function is called in
 *        the context of a user cooking something (e.g. pantry auto deductions)
 *        then excludeFrozen should be true to prevent auto-deduction of an item
 *        that is technically not a reasonable candidate. 
 * @returns false if any one single item in the list is not available.
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 */
const confirmItemsAreAvailableInPantry = async function (
  user_id: number,
  ingredients: PantryIngredient[],
  excludeFrozen: boolean = true
): Promise<boolean> {
  try {
    const ingredientIds: number[] = ingredients.map((ingredient) => { return Number(ingredient.ingredient_id)})
    const excludedStatuses = _buildPracticalExclusions(excludeFrozen);
    const query = `SELECT 
      count(1) 
      FROM pantries
      WHERE 
        user_id = $1 AND 
        ingredient_id = ANY($2) AND
        amount_purchased - amount_consumed > 0 AND
        (status IS NULL OR status NOT IN (${excludedStatuses}))`;
    const values = [user_id, ingredientIds];
    const queryResult = await queryDbConnection(query, values)
    return queryResult.rows[0].count >= ingredientIds.length
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Confirms if a specific pantry ingredient has at least a specific amount.
 * An ingredient is available if its status is neither "CONSUMED" nor "EXPIRED".
 * @param user_id is the user owning the query.
 * @param excludeFrozen defaults to false because the main use case for this
 *        function is to determine if you can cook something, which gives you
 *        the opportunity to thaw something out.
 * @returns true if a user pantry has an amount >= recipe_amount for each item.
 * @see confirmItemsAreAvailableInPantry to confirm if something exists at all. 
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 * 
 * 
 */
const confirmQuantitiesAreAvailableInPantry = async function (
  user_id: number,
  ingredients: PantryIngredient[],
  excludeFrozen: boolean = false
): Promise<boolean> {
  try {

    const ingredientsToConfirm = collapseRepeatIngredients(ingredients);
    const ingredientIdList: number[] = Array.from(ingredientsToConfirm.keys());
    const excludedStatuses = _buildPracticalExclusions(excludeFrozen);
    const sumAmountsQuery = `
      SELECT 
        ingredient_id, 
        SUM(amount_purchased - amount_consumed) as available_amount
      FROM 
        pantries 
      WHERE 
        user_id = $1 
        AND ingredient_id = ANY($2)
        AND (status IS NULL OR status NOT IN (${excludedStatuses}))
      GROUP BY 
        ingredient_id
    `;

    const values = [user_id, ingredientIdList];
    const result = await queryDbConnection(sumAmountsQuery, values);

    for (const row of result.rows) {
      const ingredient = ingredientsToConfirm.get(row.ingredient_id);
      if (!ingredient || !ingredient.recipe_amount || row.available_amount < ingredient.recipe_amount) {
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
 * Frozen items are excluded from this function by default.
 *
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 */
export async function consumePantryItemsFEFOStyle(user_id: number, ingredients: PantryIngredient[]) {
  try {
    const hasItems = await confirmItemsAreAvailableInPantry(user_id, ingredients)
    // if (!hasItems) {
    //   throw new Error(ErrorKeys.ITEMS_NOT_IN_PANTRY)
    // }
    const hasEnough = await confirmQuantitiesAreAvailableInPantry(user_id, ingredients)
    // if (!hasEnough) {
    //   throw new Error(ErrorKeys.ITEMS_NOT_IN_PANTRY)
    // }
  } catch (error) {
    handleDatabaseError(error)
  } 
}

/** 
 * Selects necessary information for functions converting ingredients in recipes.
 * It's not always the case a recipe calls for an ingredient in the same measuring
 * unit that the database stores it in. For example, an onion might be called for
 * whole, or a half a cup of it diced, or maybe in terms of pounds!
 *
 * @throws {Error} This function throws the original error from the database.
 *                 Lacking such info, it'll throw an "unknown error" Error. 
 */
export async function selectConversionData(ingredient_ids: number[]) {
  try {
    const query = `
      SELECT 
        jsonb_object_agg(i.id, jsonb_build_object(
        'multiplier', i.weight_multiplier,
        'convert_to_unit', u.name,
        'cup_weight', ih.weight_of_one_diced_cup,
        'average_weight', ih.average_weight
      )) AS data
      FROM
        ingredients i
      JOIN ingredient_hierarchy ih
        ON ih.id = i.ingredient_hierarchy_id
      JOIN units u
        ON u.id = ih.unit_id
      WHERE i.id = ANY($1)
    `;
    const values = [ingredient_ids]
    const result = await queryDbConnection(query,values)
    const {data} = result.rows[0]
    return data
  } catch (error) {
    handleDatabaseError(error)
  }
};