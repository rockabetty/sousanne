type PantryIngredientStatus = 'SHELF_OPEN' 
    | 'SHELF_SEALED'
    | 'REFRIGERATED_SEALED'
    | 'REFRIGERATED_OPEN' 
    | 'FROZEN'
    | 'EXPIRED'
    | 'CONSUMED'

export type PantryModel = {
    user_id: number;
    ingredient_id: number;
    purchased_on?: Date;
    status?: PantryIngredientStatus
    amount_purchased: number;
    amount_consumed: number;
    expires_on?: Date;
}

export type PantryModelColumn = keyof PantryModel;

export const pantryModelColumns: PantryModelColumn[] = [
    "user_id",
    "ingredient_id",
    "purchased_on",
    "status",
    "amount_purchased",
    "amount_consumed",
    "expires_on"
];

export const pantryModelColumnSet: Set<PantryModelColumn> = new Set(pantryModelColumns);

export type  PantryIngredient = {
    ingredient_id?: number;
    unit?: string;
    recipe_amount?: number;
    convert_to_unit?: string;
    average_weight?: number;
    multiplier?: number;
    cup_weight?: number;
    status?: PantryIngredientStatus;
};

export type PantryIngredientCollection = {
    [key: string]: PantryIngredient
}

export type PantryIngredientUpdate = {
    ingredient_id: number;
    amount: number;
}

export type PantryUpdateObject = {
    user_id: string | number;
    action: "purchase"  
      | "consume"
      | "decrease"   
      | "increase"
      | "spoil"
      | "freeze"
      | "refrigerate"
      | "shelve"
    itemList: PantryIngredient[]
};

