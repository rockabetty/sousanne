export type  PantryIngredient = {
    ingredient_id?: number;
    unit?: string;
    recipe_amount?: number;
    convert_to_unit?: string;
    average_weight?: number;
    multiplier?: number;
    cup_weight?: number;
    status?: 'SHELF_OPEN' | 'SHELF_SEALED' | 'REFRIGERATED_SEALED' | 'REFRIGERATED_OPEN' | 'FROZEN' | 'EXPIRED' | 'CONSUMED'
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

