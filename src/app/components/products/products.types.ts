export type ProductData = {
  name?: string;
  ingredient_id?: string;
  packageType: "single" | "multiple" | "weight" | "apiece";
  packageCount?: number;
  packageAmount?: number;
  unitName: string;
};