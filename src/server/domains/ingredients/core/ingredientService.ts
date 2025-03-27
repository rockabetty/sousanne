import { selectIngredientOptions, selectIngredientOptionsWithSeasonality } from '../outbound/ingredientRepository';
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { handleServiceError } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import { ApiResponse } from '@errors/apiResponse.types';
import { Ingredient } from '../ingredients.types';

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

