export type StoreModel = {
    id: number;
    name: string;
    address?: string;
    zipcode?: number;
    created_at?: Date;
}

export type StoreModelColumn = keyof StoreModel;

export const storeModelColumns: StoreModelColumn[] = [
    "id",
    "name",
    "address",
    "zipcode",
    "created_at"
];

export const storeModelColumnSet: Set<StoreModelColumn> = new Set(storeModelColumns);
