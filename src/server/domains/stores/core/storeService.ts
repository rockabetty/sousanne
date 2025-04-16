import { handleServiceError } from "@errors"
import { Store } from "../stores.types"
import { selectStores } from "../outbound/storeRepository"
import { ApiResponse } from '@errors/apiResponse.types';

export async function getStores (): Promise<ApiResponse<Store[]>> {
    // We'll have to make this way more refined to do location based stuff
    // but right now it's only 2 stores and no actual authed user so... yeah.

    try {
        const stores = await selectStores()
        return {
            success: true,
            data: stores
        }
    } catch (error) {
        handleServiceError(error)
    }
}