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
