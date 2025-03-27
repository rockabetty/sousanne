import convert from 'convert-units'
import { selectConversionData } from '../outbound/pantryRepository';
import { handleServiceError } from '@errors';
import { PantryIngredient, PantryIngredientCollection, PantryIngredientUpdate } from '../pantries.types';
import { ApiResponse } from "@errors/apiResponse.types"
import { ErrorKeys } from "../errors.types";
import { ErrorKeys as CoreErrors } from "@errors/errors.types";

export const volumeSet = new Set([
  'fluid ounce',
  'teaspoon',
  'tablespoon',
  'cup',
  'pint',
  'quart',
  'gallon',
  'milliliter',
  'liter'
]);

export const massSet = new Set([
  'gram',
  'kilogram',
  'ounce',
  'pound',
  'dash'
]);

export const itemSet = new Set([
  'piece',
  'whole',
  'slice',
  'bun',
  'egg'
]);

const unitMap = {
  'tablespoon': 'Tbs',
  'teaspoon': 'tsp',
  'pint': 'pnt',
  'cup': 'cup',
  'gallon': 'gal',
  'quart': 'qt',
  'fluid ounce': 'fl-oz',
  'liter': 'l',
  'milliliter': 'ml',
  'gram': 'g',
  'ounce': 'oz',
  'pound': 'lb',
  'milligram': 'mg',
  'kiligram': 'kg'
};

/**
 * Determines what standard unit type a given unit belongs to for the database.
 * All liquid measurements in the pantry is stored in fl-oz. (e.g. 32 fl oz oil).
 * All solid measurements in the pantry are stored in oz (e.g. 16 oz beef).
 * Fresh produce items sold loose (e.g. onions, potatoes) are stored are 'count'. 
 * So are eggs; nobody buys '12 ounces of eggs', they buy 12 eggs straight up.
 * @param unit The unit name to categorize
 * @returns Standard unit type: 'fl-oz' for volume, 'oz' for mass, or 'count' for items
 */
const identifyTargetUnit = function (unit: string) {
  const lcUnit = unit.toLowerCase()
  if (volumeSet.has(lcUnit)) {
    return 'fl-oz'
  }
  if (massSet.has(lcUnit)) {
    return 'oz'
  }
  return 'count'
}

/**
 * Converts a list of recipe ingredients to pantry update quantities. Any given
 * recipe might call for "1 tablespoon of flour" or "8 ounces of flour" or
 * "JUST BUNG THE WHOLE BAGGO FLOUR IN THE POT, LUV" or whatever the hell while
 * the database is strictly thinking of things in ounces/fluid ounces or counts.
 * This is not intended to be scientifically accurate, just practical estimates
 * to help do automatic ingredient deductions to later prompt you to buy more.
 * So if you're trying to improve this function and give it SCIENTIFIC ACCURACY
 * please don't.
 * @param ingredients List of recipe ingredients with conversion data
 * @returns List of pantry updates with converted amounts
 */

export const convertForPantryUpdate = function (ingredients: PantryIngredient[]): PantryIngredientUpdate[] {
  let updates = [];
  for (let ing of ingredients) {
    const originalUnit = ing.unit.toLowerCase();
    let pantryChange = { id: ing.id };
    switch (originalUnit) {
      /*
      'clove of garlic' opens the possibility for other 'piece of produce that
      has a standard name'  e.g. 'stalk/rib of celery', 'sprig of <insert herb 
      here>'. We'll take 'em as they come but I expect this to grow. 
      */
      case 'clove of garlic':
        pantryChange.amount = ing.recipe_amount * 0.2; // A clove is ~0.2 ounces.
        break;
      case'dash': 
        pantryChange.amount = ing.recipe_amount * 0.035; // A 'dash' is 1 gram, which is ~0.35 oz.
        break;
      case 'count':
        if (ing.convert_to_unit === 'count') {
          pantryChange.amount = ing.recipe_amount;
        } else {
          pantryChange.amount = ing.average_weight * ing.multiplier * ing.recipe_amount
        }
        break;
      default:
        const recipeUnit = originalUnit;
        const pantryUnit = ing.convert_to_unit.toLowerCase();

        if (volumeSet.has(recipeUnit)) {
          const amountInCups = convert(ing.recipe_amount).from(unitMap[recipeUnit]).to('cup');
          if (pantryUnit === 'count') { 
              // Recipe calls for a volume of an item that is measured by item
              // e.g. recipe: "1/2 cup onions" pantry: "You have 3 onions" 
              pantryChange.amount * ing.average_weight;
          } else if (massSet.has(pantryUnit)) {
            // Recipe calls for a volume of an item that is measured by mass
            // e.g. recipe: "1/4 cup of flour" pantry: "You have 32 oz of flour"
            pantryChange.amount = amountInCups * ing.cup_weight;
          } else {
            // The only left over possibility is that it's a volume to volume conversion
            pantryChange.amount = amountInCups;
          }
        }
        else {
          pantryChange.amount = convert(ing.recipe_amount).from(unitMap[recipeUnit]).to(unitMap[pantryUnit])
        }
    }
    updates.push(pantryChange);
  }
  return updates;
};

export const getConversionData = async function(ingredients: PantryIngredient[]): Promise<ApiResponse<PantryIngredient[]>> {
  let convertibleIngredients = []
  try {
    const ingredientIDList = ingredients.map((ing) => { return ing.id })
    const ingredientsWithConversionData = await selectConversionData(ingredientIDList);
    for (let ing of ingredients) {
      const key = ing.id;
      let item = ingredientsWithConversionData[key]
      if (!!item) {
        convertibleIngredients.push({ ...item, ...ing })
      }
    }
    return { success: true, data: convertibleIngredients }
  } catch (error) {
    handleServiceError(error)
  }
};


/**
 * Combines duplicate ingredients in a list and aggregates their amounts.
 * It's meant for scenarios where an ingredient appears multiple times in different
 * contexts like recipes that use the same ingredient multiple times, like a
 * tablespoon of flour to dust something + a cup of flour to mix with other stuff.
 * You also can use it to combine ingredients from multiple recipes.
 * 
 * @param ingredients - may contain duplicates, the point is to collapse 'em.'
 * @returns a map to make operations on a specific item easy-access. 
 * 
 * @example
 * // Input: [
 *   { ingredient_id: 1, recipe_amount: 2 },
 *   { ingredient_id: 2, recipe_amount: 1 },
 *   { ingredient_id: 1, recipe_amount: 3 } e
 * ];
 * 
 * // Output: Map(2) {
 * //   101 => { ingredient_id: 101, recipe_amount: 5 },
 * //   102 => { ingredient_id: 102, recipe_amount: 1 }
 * // }
 * 
 * @throws - never, it instead skips entries without a valid ingredient_id
 */
export const collapseRepeatIngredients = function (ingredients: PantryIngredient[]): Map<number,PantryIngredient>{
  const ingredientMap = new Map<number, PantryIngredient>()
  for (let ingredient of ingredients) {
    const key = ingredient.ingredient_id;
    if (!!key) {
      const value = ingredientMap.get(key) || { ingredient_id: key, recipe_amount: 0 }
      let newAmount = value.recipe_amount || 0;
      newAmount += ingredient.recipe_amount || 0;
      value.recipe_amount = newAmount
      ingredientMap.set(key, value)
    }
  }
  return ingredientMap;
}

export const convertIngredientAmounts = async function (ingredients: PantryIngredient[]): Promise<PantryIngredientUpdate[]> {
  try {
    const result = await getConversionData(ingredients);
    if (!result.success || !result.data || result.data.length === 0) {
      handleServiceError(ErrorKeys.ITEMS_NOT_IN_PANTRY)
    } 
    return convertForPantryUpdate(result.data);
  } catch (error) {
    handleServiceError(error);
  }
}