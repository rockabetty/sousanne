import convert from 'convert-units'
import { selectConversionData } from '../outbound/pantryRepository';
import { handleServiceError } from '@errors';
import { PantryIngredientCollection, PantryIngredientUpdate } from '../pantries.types';
import { ApiResponse } from "@errors/apiResponse.types"
import { ErrorKeys } from "../errors.types";

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
}

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

export const convertIngredientAmounts = async function (ingredients: PantryIngredient[]): Promise<ApiResponse<PantryIngredientUpdate[]>> {
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