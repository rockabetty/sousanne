type SeasonalityStatus = 'STORAGE' | 'IN_SEASON' | 'NON_SEASONAL';

export type IngredientModel = {
    id: number;
    name?: string;
    ingredient_hierarchy_id: number;
    is_archetype?: boolean;
    weight_multiplier?: number;
}

export type IngredientModelColumn = keyof IngredientModel;

export const ingredientModelColumns: IngredientModelColumn[] = [
  "id",
  "name",
  "ingredient_hierarchy_id",
  "is_archetype",
  "weight_multiplier"
];

export type IngredientHierarchyModel = {
    id: number;
    path: string;
    unit_id: number;
    shelf_life_room_temp_sealed?: number;
    shelf_life_room_temp_open?: number;
    shelf_life_refrigerated_sealed?: number;
    shelf_life_refrigerated_open?: number;
    shelf_life_frozen_sealed?: number;
    shelf_life_frozen_open?: number;
    average_weight?: number;
    cooking_yield_percentage?: number;
    edible_percentage?: number;
    description?: string;
    cup_weight?: number;
    no_freezer_storage?: boolean;
    no_room_temp_storage?: boolean;
    no_refrigerated_storage?: boolean;
}

export type IngredientHierarchyModelColumn = keyof IngredientHierarchyModel;

const ingredientHierarchyModelColumns: IngredientHierarchyModelColumn[] = [
  "id",
  "path",
  "unit_id",
  "shelf_life_room_temp_sealed",
  "shelf_life_room_temp_open",
  "shelf_life_refrigerated_sealed",
  "shelf_life_refrigerated_open",
  "shelf_life_frozen_sealed",
  "shelf_life_frozen_open",
  "average_weight",
  "description",
  "cup_weight", 
  "cooking_yield_percentage",
  "edible_percentage",
  "no_freezer_storage",
  "no_room_temp_storage",
  "no_refrigerated_storage"
];

export const ingredientHierarchyModelColumnSet: Set<IngredientHierarchyModelColumn> = new Set(ingredientHierarchyModelColumns);

export type UserFacingIngredient = IngredientHierarchyModel & {
    seasonality_status: SeasonalityStatus
    name: string;
    unit: string;
}

type _RecipeIngredient = {
    id?: string | number;
    name?: string;
    amount?: string | number;
    seasonality_status: SeasonalityStatus
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