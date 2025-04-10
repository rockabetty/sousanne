export type Ingredient = {
    id?: number;
    name?: string;
    path?: string;
    description?: string;
    seasonality_status?: 'STORAGE' | 'IN_SEASON' | 'NON_SEASONAL';
    shelf_life_room_temp_sealed?: number;
    shelf_life_room_temp_open?: number;
    shelf_life_refrigerated_sealed?: number;
    shelf_life_refrigerated_open?: number;
    shelf_life_frozen?: number;
    average_weight?: number;
    edible_percentage?: number;
    cup_weight?: number;
    cooking_yield_percentage?: number;
    unit: string;

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