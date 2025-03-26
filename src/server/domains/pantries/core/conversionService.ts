import convert from 'convert-units'

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

export const convertForPantry = function (unit, amount) {
  const newUnit = identifyTargetUnit(unit)
  if (unit.toLowerCase() === 'dash') {
    return 0.035  // ~ 1 gram to ounces 
  }
  if (newUnit === 'count') return amount
  const oldUnit = unitMap[unit.toLowerCase()]
  return convert(amount).from(oldUnit).to(newUnit)
}