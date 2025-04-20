import { handleServiceError } from '@errors'
import {
  createShoppingList,
  addShoppingListItem,
  getShoppingListWithItems,
  getUserShoppingLists,
  updateShoppingList,
  updateShoppingListItem,
  updateAllShoppingListItems,
  deleteShoppingListItem,
  archiveShoppingList,
  unarchiveShoppingList,
} from '../outbound/shoppingListRepository'
import {
  ShoppingListModel,
  ShoppingListItemModel,
  ShoppingListWithItems,
} from '../shoppinglists.types'
import { ErrorKeys } from '../errors.types'

/**
 * Creates a new shopping list for a user
 *
 * @param userId User ID
 * @param name Shopping list name
 * @returns The created shopping list
 */
export async function createUserShoppingList(userId: number, name: string) {
  try {
    const shoppingList = await createShoppingList({
      name: name,
      user_id: userId,
    })
    return {
      success: true,
      data: shoppingList,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

/**
 * Adds a product to a shopping list
 *
 * @param listId Shopping list ID
 * @param userId User ID for verification
 * @param productId Product ID
 * @param priceId Optional price ID
 * @returns The created shopping list item
 */
export async function addProductToShoppingList(
  listId: number,
  userId: number,
  productId: number,
  priceId?: number
) {
  try {
    const shoppingListItem = await addShoppingListItem({
      grocery_list_id: validatedListId,
      product_id: validatedProductId,
      price_id: validatedPriceId,
      ingredient_id: null, // According to schema, we link to products, not ingredients
      obtained: false,
    })

    return {
      success: true,
      data: shoppingListItem,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

/**
 * Gets a user's shopping list with all its items
 *
 * @param listId Shopping list ID
 * @param userId User ID for verification
 * @returns Shopping list with items
 */
export async function getUserShoppingList(listId: number, userId: number) {
  try {
    const shoppingList = await getShoppingListWithItems(listId, userId)

    return {
      success: true,
      data: shoppingList,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

/**
 * Gets all shopping lists for a user
 *
 * @param userId User ID
 * @param includeArchived Whether to include archived lists
 * @returns Array of shopping lists
 */
export async function getAllUserShoppingLists(
  userId: number,
  includeArchived: boolean = false
) {
  try {
    const shoppingLists = await getUserShoppingLists(userId, includeArchived)

    return {
      success: true,
      data: shoppingLists,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

/**
 * Updates a shopping list's name
 *
 * @param listId Shopping list ID
 * @param userId User ID for verification
 * @param name New name
 * @returns Updated shopping list
 */
export async function editShoppingList(
  listId: number,
  userId: number,
  update: Partial<ShoppingListModel>
) {
  try {
    const updatedList = await updateShoppingList(listId, userId, update)

    return {
      success: true,
      data: updatedList,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

/**
 * Updates a shopping list item's obtained status
 *
 * @param itemId Item ID
 * @param userId User ID for verification
 * @param obtained New obtained status
 * @returns Updated shopping list item
 */
export async function editShoppingListItem(
  itemId: number,
  userId: number,
  update: Partial<ShoppingListItem>
) {
  try {
    const updatedItem = await updateShoppingListItem(itemId, userId, update)

    return {
      success: true,
      data: updatedItem,
    }
  } catch (error) {
    handleServiceError(error)
  }
}

/**
 * Updates all items in a shopping list at once.
 *
 * @param listId Shopping list ID
 * @param userId User ID for verification
 * @param obtained New obtained status for all items
 * @returns Number of updated items
 */
export async function editAllShoppingListItems(
  listId: number,
  userId: number,
  update: Partial<ShoppingListItem>
) {
  try {
    const updatedCount = await updateAllShoppingListItems(
      listId,
      userId,
      update
    )

    return {
      success: true,
      data: { updatedCount },
    }
  } catch (error) {
    handleServiceError(error)
  }
}

/**
 * Removes an item from a shopping list
 *
 * @param itemId Item ID
 * @param userId User ID for verification
 * @returns Whether the operation was successful
 */
export async function removeItemFromShoppingList(
  itemId: number,
  userId: number
) {
  try {
    const success = await deleteShoppingListItem(itemId, userId)

    return {
      success,
      data: { removed: success },
    }
  } catch (error) {
    handleServiceError(error)
  }
}
