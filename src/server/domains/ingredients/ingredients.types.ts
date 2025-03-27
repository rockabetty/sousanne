export type Ingredient = {
    id?: number;
    name?: string;
    path?: string;
    seasonality_status: 'STORAGE' | 'IN_SEASON' | 'NON_SEASONAL';
}

export type RecipeIngredient = {
    id?: number;
    name?: number;
    amount?: number;
}