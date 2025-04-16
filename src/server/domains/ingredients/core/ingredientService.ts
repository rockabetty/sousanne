import { 
  selectIngredientArchetypes,
  selectIngredientById,
  selectIngredientOptions,
  selectIngredientOptionsWithSeasonality,
} from '../outbound/ingredientRepository';
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { handleServiceError } from "@errors";
import { ApiResponse } from '@errors/apiResponse.types';
import { Ingredient } from '../ingredients.types';

/**
 * Retrieves a list of ingredient IDs, names, and paths. 
 * Results are paginated.
 * 
 * @param limit - The max number of entries per page
 * @param page - the 'page' that you should be on, e.g. page 2
 * @returns a promise resolving to a standardized API response with an array
 *          of ingredient IDs, names, and path strings if successful. An error
 *          response if not successful.
 */
export async function getIngredients(limit: number = 50, page: number = 0) {
  try {
    if (isNaN(limit) || isNaN(page)) {
      return {
        success: false,
        error: CoreErrors.INVALID_REQUEST
      }
    }
    const offset = page * limit
    const ingredients = await selectIngredientArchetypes(limit, offset)
    return { success: true, data: ingredients}    
  } catch(error) {
      return handleServiceError(error)
  }
}

/**
 * Retrieves available ingredient options for a given, ingredient ID.
 * This doesn't fetch substitutions, this fetches subtypes of an item, like
 * "white onion" and "red onion" for "onion", not "margarine instead of butter".
 * 
 * @param id - The ID of the ingredient to fetch options for.
 * @returns a promise resolving to a standardized API response with an array 
 *          of ingredient subtypes if successful, or an error response
 *          if a database error occurs.
 */
export async function getIngredientOptions(id: number): Promise<ApiResponse<Ingredient[]>> {
  try {
    const options = await selectIngredientOptions(id);
    return {
      success: true,
      data: options 
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

/**
 * Retrieves available ingredient options and whether they are in season for
 * a single, given ingredient ID. This doesn't fetch substitutions, but types
 * of an item, like"white onion" and "red onion" for "onion", not "margarine 
 * instead of butter".
 * 
 * @param id - The ID of the ingredient to fetch options for.
 * @returns a promise resolving to a standardized API response with an array 
 *          of ingredient subtypes if successful, or an error response
 *          if a database error occurs.
 */
export async function getIngredientOptionsWithSeasonality(id: number): Promise<ApiResponse<Ingredient[]>> {
  try {
    const options = await selectIngredientOptionsWithSeasonality(id);
    return {
      success: true,
      data: options 
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function getIngredientById(id: number): Promise<ApiResponse<Ingredient>> {
  try {
    const ingredient = await selectIngredientById(id);
    return {
      success: true,
      data: ingredient
    }
  } catch (error) {
    return handleServiceError(error)
  }
}