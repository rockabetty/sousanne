import { RecipeIngredient } from '@domains/ingredients/ingredients.types';
import { convertForPantry } from './conversionService';
import { PantryIngredient, PantryUpdateObject } from '../pantries.types';
import { selectAvailableAmountInPantry, consumePantryItemsFIFOStyle } from '../outbound/pantryRepository';
import { handleServiceError } from "@errors";
import { ErrorKeys } from "../errors.types";

export async function excludeIngredientsNotInPantry (ingredients: RecipeIngredient[], user_id: number) {
  try {
    const ingredientIds = ingredients.map(ingredient => parseInt(ingredient.id));
   
    const pantryItems = await selectAvailableAmountInPantry(ingredientIds, user_id);

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
  } catch (error) {
    handleServiceError(error)
  }
}


export async function countIngredientAmountsInPantry (ingredients: RecipeIngredient[], user_id: number) {
  try {
    const ingredientIds = ingredients.map(ingredient => parseInt(ingredient.id));
    const pantryItems = await selectAvailableAmountInPantry(ingredientIds, user_id);
    const pantryMap = new Map();
    pantryItems.forEach(item => {
      pantryMap.set(item.ingredient_id, {
        amount: item.amount
      });
    });

    const markedIngredients = ingredients.map(ingredient => {
      const pantryItem = pantryMap.get(parseInt(ingredient.id));
      if (!!pantryItem) {
        return {
            ...ingredient,
            inPantry: true,
            amount: pantryItem.amount
        }
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
  } catch (error) {
    handleServiceError(error)
  }
}

export async function countIngredientAmountInPantry (ingredientId: number) {
  try {
    const amountRequest = await selectAvailableAmountInPantry([ingredientId]);
    if (!!amountRequest[0]) {
      const {amount} = amountRequest[0]
        return {
          success: true,
          data: amount || 0
        }
      }

    return {
      success: true,
      data: 0
    }
  } catch (error) {
    handleServiceError(error)
  }
}

const convertIngredientAmounts = function (itemList: PantryIngredient[]) {
  const convertedList = []
  for (let ingredient of itemList) {
    const amount = convertForPantry(ingredient.unit, ingredient.amount)
    convertedList.push({
        amount,
        ingredient_id: ingredient.id
    })
  }
  return convertedList
}

export async function updatePantryWithConsume (update: PantryUpdateObject) {
  const {itemList, user_id} = update;
  const ingredientsToConsume = convertIngredientAmounts(itemList)
  console.log("Converted amounts")
  try {
    const result = await consumePantryItemsFIFOStyle(user_id, ingredientsToConsume)
    return { success: true, result }
  } catch (error) {
    handleServiceError(error)
  }
}

export async function updatePantryWithPurchase (update: PantryUpdateObject) {
  
}

export async function updatePantryWithDecrease (update: PantryUpdateObject) {
  
}

export async function updatePantryWithIncrease (update: PantryUpdateObject) {
 
  
}

export async function updatePantryWithSpoil (update: PantryUpdateObject) {
  
}

export async function updatePantryWithFreeze (update: PantryUpdateObject) {
  
}

export async function updatePantryWithRefrigerate (update: PantryUpdateObject) {
  
}

export async function updatePantryWithShelve (update: PantryUpdateObject) {
  
}

export async function updateIngredientAmountsInPantry (update: PantryUpdateObject) {
  const {action} = update;
  switch (action) {
    case "purchase":
      return await updatePantryWithPurchase(update);
      break;
    case "consume":
      return await updatePantryWithConsume(update)
      break;
    case "decrease":
      return await updatePantryWithDecrease(update);
      break;
    case "increment":
      return await updatePantryWithIncrease(update);
      break;
    case "spoil":
      return await updatePantryWithSpoil(update);
      break;
    case "freeze":
      return await updatePantryWithFreeze(update);
      break;
    case "refrigerate": 
      return await updatePantryWithRefrigerate(update);
      break;
    case "shelve": 
      return await updatePantryWithShelve(update);
      break;
    default:
      return {
        success: false,
        error: ErrorKeys.UNKNOWN_PANTRY_ACTION
      }
  }
}

  // try {

  //   for (let ingredient of ingredients) {
  //     const amount = convertForPantry(ingredient.unit,ingredient.amount)
  //     if (amount < 0) {
  //       consumptionList.push({
  //         user_id: 2,
  //         amount: Math.abs(amount),
  //         ingredient_id: ingredient.id
  //       })
  //     } else {
  //       purchaseList.push({
  //         user_id: 2,
  //         amount,
  //         ingredient_id: ingredient.id
  //       })
  //     }
  //   }
  //   const purchaseUpdates = await addIngredientsToPantry(purchaseList)
  //   const consumptionUpdates = await consumeIngredientsInPantry(consumptionList)
  //   return { success: true }
  // } catch (error) {
  //   handleServiceError(error)
  // }