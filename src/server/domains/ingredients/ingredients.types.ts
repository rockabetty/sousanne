export type Ingredient = {
    id?: number;
    name?: string;
    path?: string;
    seasonality_status: 'STORAGE' | 'IN_SEASON' | 'NON_SEASONAL';
}

type _RecipeIngredient = {
    id?: string | number;
    name?: string;
    amount?: string | number;
    seasonality_status: 'STORAGE' | 'IN_SEASON' | 'NON_SEASONAL';
};

export type RecipeIngredient = {
    id?: number;
    name?: string;
    amount?: number;
}

export function parseRecipeIngredient(before: _RecipeIngredient ): RecipeIngredient {
    const after: RecipeIngredient = { name: before.name }
    return {
        id: before.id !== undefined ? 
            (typeof before.id === 'string' ? parseInt(before.id, 10) : before.id) : 
            undefined,
        name: before.name,
        amount: before.amount !== undefined ? 
            (typeof before.amount === 'string' ? parseFloat(before.amount) : before.amount) : 
            undefined
    }
}