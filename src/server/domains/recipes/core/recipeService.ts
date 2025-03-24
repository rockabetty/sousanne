import { selectRecipes, selectRecipeBySlug } from '../outbound/recipeRepository';
import { ErrorKeys as CoreErrors } from "@errors/errors.types";
import { QueryResult } from "pg";
import { handleServiceError } from "@errors";
import { acceptGetOnly } from "@errors/methodgatekeeper";
import slugify from 'slugify';

export async function getRecipes( limit: number = 20, offset: number = 0) {
  try {
    const recipeList  = await selectRecipes(limit, offset);
    return {
      success: true,
      data: recipeList 
    };
  } catch (error) {
    return handleServiceError(error);
  }
}

export async function getRecipeBySlug(query: string) {
  try {
    const slug = slugify(query, {lower: true});
    const recipe = await selectRecipeBySlug(slug);
    return {
      success: true,
      data: recipe 
    };
  } catch (error) {
    console.log("Service error")
    console.log(error)
    return handleServiceError(error);
  }
}

