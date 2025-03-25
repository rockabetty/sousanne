import { RecipeIngredient } from '@domains/ingredients/ingredients.types';
import { selectAmountInPantry } from '../outbound/pantryRepository';

export async function excludeIngredientsNotInPantry (ingredients: RecipeIngredient[]) {
    const ingredientIds = ingredients.map(ingredient => parseInt(ingredient.id));
   
    const pantryItems = await selectAmountInPantry(ingredientIds);

    const pantryMap = new Map();
    pantryItems.forEach(item => {
      pantryMap.set(item.ingredient_id, {
        amount: item.amount,
    //    unit: item.unit
      });
    });

    const inStockIngredients = []

    ingredients.map(ingredient => {
      const pantryItem = pantryMap.get(ingredient.id);
      if (pantryItem) {
        inStockIngredients.push(
        {
            ...ingredient,
            amount: pantryItem.amount
        })
      }
    });

    return {
      success: true,
      data: inStockIngredients 
    }
}


export async function countIngredientAmountsInPantry (ingredients: RecipeIngredient[]) {
    const ingredientIds = ingredients.map(ingredient => parseInt(ingredient.id));
    const pantryItems = await selectAmountInPantry(ingredientIds);

    const pantryMap = new Map();
    pantryItems.forEach(item => {
      pantryMap.set(item.ingredient_id, {
        amount: item.amount,
    //    unit: item.unit
      });
    });

    const markedIngredients = ingredients.map(ingredient => {
      const pantryItem = pantryMap.get(ingredient.id);
      if (pantryItem) {
        return {
            ...ingredient,
            inPantry: true,
            amount: pantryItem.amount
        })
      }
      return {
        ...ingredient,
        inPantry: false,
        amount: 0.0
      }
    });

    return {
      success: true,
      data: markedIngredients 
    }
}