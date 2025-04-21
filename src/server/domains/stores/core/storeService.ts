import { handleServiceError } from '@errors'
import { Store } from '../stores.types'
import {
  insertOrSelectOneStore,
  selectStores,
} from '../outbound/storeRepository'
import { ApiResponse } from '@errors/apiResponse.types'

export async function getStores(): Promise<ApiResponse<Store[]>> {
  // We'll have to make this way more refined to do location based stuff
  // but right now it's only 2 stores and no actual authed user so... yeah.

  try {
    return {
      success: true,
      data: await selectStores(),
    }
  } catch (error) {
    handleServiceError(error)
  }
}

export async function addStore(storeData) {
  console.log('Service layer')
  console.log(storeData)
  try {
    return {
      success: true,
      data: await insertOrSelectOneStore(storeData),
    }
  } catch (error) {
    handleServiceError(error)
  }
}
