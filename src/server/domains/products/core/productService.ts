import { handleServiceError } from "@errors";
import { insertOrSelectOneProduct } from "../outbound/productRepository";
import { alphaNumericAndSpacingOnly, isValidInteger, isValidNumber, parseFloatOrThrow, parseIntegerOrThrow } from "@server-services/sanitizer";
import { ErrorKeys } from "@errors/errors.types";
import { selectUnitByAbbreviation } from "@domains/units/outbound/unitRepository";
import { selectIngredientById } from "@domains/ingredients/outbound/ingredientRepository";

export type Product = {
    id?: number;
    name: string;
    ingredient_id: number;
    packaged_item?: boolean | null;
    display_quantity?: number | null;
    package_count?: number | null;
    product_template_id?: number | null;
    brand_id?: number | null;
}


export const parsePackageTypeOrThrow = (packageType: string) => {
    const trimmed = packageType.trim()
    if (["single", "multiple", "weight", "apiece"].includes(trimmed)) {
        return trimmed
    } else {
        throw new Error(ErrorKeys.INVALID_REQUEST)
    }
}

const generateDefaultProductNameFromData = function (product: Product) {
    const ingredientName = await selectIngredientById(product.ingredient_id, ["name"])
}


export async function addProduct (productData) {
    try {
        const {
           ingredient_id,
            packageAmount,
            packageCount,
            packageType,
            unitName,
            brand_id,
            product_template_id
        } = productData

        const product: Product = {}

        const parsedPackageType = parsePackageTypeOrThrow(packageType, true);
        product.packaged_item = ["single", "multiple"].includes(parsedPackageType);
        const ingredient_id = parseIntegerOrThrow(ingredient_id, true);
        product.display_quantity = parseFloatOrThrow(packageAmount);
        product.package_count = parseIntegerOrThrow(packageCount);
        product.product_template_id = parseIntegerOrThrow(product_template_id);
        product.brand_id = parseIntegerOrThrow(brand_id);

        if (productData.name) {
            product.name = alphaNumericAndSpacingOnly(productData.name);
        } else {
            product.name = generateDefaultProductNameFromData(product)
        }
        
        const unit = await selectUnitByAbbreviation(unitName);
        if (!!unit) {
            product.unit_id = unit.id
        }
        const productId = await insertOrSelectOneProduct(product)
        if (!!productId) {
            return {
                success: true,
                data: productId
            }
        }

    } catch (error) {
        handleServiceError(error)
    }
}