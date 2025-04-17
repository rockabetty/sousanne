import { handleServiceError } from "@errors";
import { insertOrSelectOneProduct } from "../outbound/productRepository";

export async function addProduct (productData) {
    // we need to validate.

    const product = {}

    try {
        const productId = await insertOrSelectOneProduct(product)

    } catch (error) {
        handleServiceError(error)
    }
}