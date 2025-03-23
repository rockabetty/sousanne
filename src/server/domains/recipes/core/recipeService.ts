import { selectRecipes } from '../outbound/recipeRepository';
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { QueryResult } from "pg";
import { handleServiceError } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";

export async function getRecipes( limit: number = 20, offset: number = 0) {
  try {
    const recipeList  = await selectRecipes(limit, offset);
    return {
      success: true,
      data: recipeList 
    };
  } catch (error) {
    console.log(error)
    return handleServiceError(error);
  }
}