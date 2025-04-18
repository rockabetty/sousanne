export type ProductModel = {
    id: number;
    name: string;
    ingredient_id: number;
    created_at?: Date;
    unit_id: number;
    base_quantity?: number | null;
    packaged_item?: boolean | null;
    package_count?: number | null;
    display_quantity?: number | null;
    brand_id?: number | null;
    product_template_id?: number | null;
}

export type ProductModelColumn = keyof ProductModel;

export const productModelColumns: ProductModelColumn[] = [
    "id",
    "name",
    "ingredient_id",
    "created_at",
    "unit_id",
    "base_quantity",
    "packaged_item",
    "package_count",
    "display_quantity",
    "brand_id",
    "product_template_id"
];

export const productModelColumnSet: Set<ProductModelColumn> = new Set(productModelColumns);

export type BrandModel = {
    id: number;
    name: string;
}

export type BrandModelColumn = keyof BrandModel;

export const brandModelColumns: BrandModelColumn[] = [
    "id",
    "name"
];

export const brandModelColumnSet: Set<BrandModelColumn> = new Set(brandModelColumns);
