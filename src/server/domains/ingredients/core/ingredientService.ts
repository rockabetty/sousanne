import { selectIngredientOptions, selectIngredientOptionsWithSeasonality } from '../outbound/ingredientRepository';
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { QueryResult } from "pg";
import { handleServiceError } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";

export async function getIngredientOptions(id: number) {
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

export async function getIngredientOptionsWithSeasonality(id: number) {
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

