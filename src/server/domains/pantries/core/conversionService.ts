import convert from 'convert-units'
import { selectConversionData } from '../outbound/pantryRepository';
import { handleServiceError } from '@errors';
import { PantryIngredientCollection, PantryIngredientUpdate } from '../pantries.types';

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

const identifyTargetUnit = function (unit) {
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
      case 'clove':
        pantryChange.amount = ing.recipe_amount * 0.2; // A clove is ~0.2 ounces.
        break;
      case'dash': 
        pantryChange.amount = ing.recipe_amount * 0.035; // A 'dash' is 1 gram, which is ~0.35 oz.
        break;
      case 'self':
        if (ing.convert_to_unit === 'self') {
          pantryChange.amount = ing.recipe_amount;
        } else {
          pantryChange.amount = ing.average_weight * ing.multiplier * ing.recipe_amount
        }
        break;
      default:
        const oldUnit = originalUnit;
        const newUnit = ing.convert_to_unit.toLowerCase();
        if (volumeSet.has(oldUnit) && massSet.has(newUnit)) { // a solid ingredient is likely measured in cups, tbsp, etc. like flour.
          const amountInCups = convert(ing.recipe_amount).from(unitMap[oldUnit]).to('cup');
          pantryChange.amount = amountInCups * ing.cup_weight
        } else {
          pantryChange.amount = convert(ing.recipe_amount).from(unitMap[oldUnit]).to(unitMap[newUnit])
        }
    }
    updates.push(pantryChange);
  }
  console.log(updates)
  return updates;
}

export const getConversionData = async function(ingredients: PantryIngredient[]): PantryIngredient[] {
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

export const convertIngredientAmounts = async function (ingredients: PantryIngredient[]): PantryIngredientUpdate[] {
  console.log("CONVERT")
  console.log(ingredients)
  const {data} = await getConversionData(ingredients);
  console.log("Conversion data")
  console.log(data)
  if (data.length > 0) {
    const updateList = convertForPantryUpdate(data);
    console.log(updateList)
  }
}