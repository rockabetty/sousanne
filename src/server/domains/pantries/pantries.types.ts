export type  PantryIngredient = {
    id: number;
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
    id: number;
    amount: number;
}

export type PantryUpdateObject = {
    user: string | number;
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

