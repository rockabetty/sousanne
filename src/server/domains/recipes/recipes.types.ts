export type RecipeModel = {
    id: number;
    name: string;
    slug: string;
    user_id?: number;
    is_public?: boolean;
    cuisine_id?: number;
    base_serving_size?: number;
    wait_time?: number;
    active_prep_time?: number;
    cook_time?: number;
    oven_preheat?: number;
    rating?: number;
}

export type RecipeModelColumn = keyof RecipeModel;

export const recipeModelColumns: RecipeModelColumn[] = [
    "id",
    "name",
    "slug",
    "user_id",
    "is_public",
    "cuisine_id",
    "base_serving_size",
    "wait_time",
    "active_prep_time",
    "cook_time",
    "oven_preheat",
    "rating"
];

export const recipeModelColumnSet: Set<RecipeModelColumn> = new Set(recipeModelColumns);

export type RecipeIngredientModel = {
    id: number;
    recipe_id: number;
    ingredient_id: number;
    section_id?: number;
    unit_id: number;
    amount: number;
    variant?: string; // This is an enum in the DB
    from_scratch_recipe_id?: number;
}

export type RecipeIngredientModelColumn = keyof RecipeIngredientModel;

export const recipeIngredientModelColumns: RecipeIngredientModelColumn[] = [
    "id",
    "recipe_id",
    "ingredient_id",
    "section_id",
    "unit_id",
    "amount",
    "variant",
    "from_scratch_recipe_id"
];

export const recipeIngredientModelColumnSet: Set<RecipeIngredientModelColumn> = 
    new Set(recipeIngredientModelColumns);