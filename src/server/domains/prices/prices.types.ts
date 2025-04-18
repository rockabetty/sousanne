export type PriceModel = {
    id: number;
    product_id: number;
    store_id: number;
    price: number;
    currency_id?: number;
    created?: Date;
    sale?: boolean;
    sale_begins?: Date;
    sale_ends?: Date;
    user_id?: number;
    price_by_measurement?: boolean;
}

export type PriceModelColumn = keyof PriceModel;

export const priceModelColumns: PriceModelColumn[] = [
    "id",
    "product_id",
    "store_id",
    "price",
    "currency_id",
    "created",
    "sale",
    "sale_begins",
    "sale_ends",
    "user_id",
    "price_by_measurement"
];

export const priceModelColumnSet: Set<PriceModelColumn> = new Set(priceModelColumns);
