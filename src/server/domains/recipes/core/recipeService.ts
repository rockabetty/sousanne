import { selectRecipes, selectRecipeBySlug } from '../outbound/recipeRepository';
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { handleServiceError } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import slugify from 'slugify';
import { ApiResponse } from '@errors/apiResponse.types';
import { Recipe } from "../recipes.types";

export async function getRecipes( limit: number = 20, offset: number = 0): Promise<ApiResponse<Recipe[]>> {
  try {
    const recipeList  = await selectRecipes(limit, offset);
    if (!!recipeList) {
       return {
        success: true,
        data: recipeList 
      };
    }
    return handleServiceError(CoreErrors.GENERAL_SERVER_ERROR);
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function getRecipeBySlug(query: string): Promise<ApiResponse<Recipe>> {
  try {
    const slug = slugify(query, {lower: true});
    const recipe = await selectRecipeBySlug(slug);
    if (!!recipe) {
      return {
        success: true,
        data: recipe 
      };
    }
    return handleServiceError(CoreErrors.RESOURCE_NOT_FOUND);
  } catch (error) {
    return handleServiceError(error);
  }
}

