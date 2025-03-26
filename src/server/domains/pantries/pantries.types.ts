export type  PantryIngredient = {
    id: number;
    unit: string;
    amount: number;
    status?: 'SHELF_OPEN' | 'SHELF_SEALED' | 'REFRIGERATED_SEALED' | 'REFRIGERATED_OPEN' | 'FROZEN' | 'EXPIRED' | 'CONSUMED'
};

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

