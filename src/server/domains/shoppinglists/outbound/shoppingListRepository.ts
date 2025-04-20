import { handleDatabaseError } from '@errors'
import { queryDbConnection, withTransaction, getOneRowResult } from '@postgres'
import {
  ShoppingListModel,
  ShoppingListItemModel,
  ShoppingListWithItems,
} from '../shoppinglists.types'
import { ErrorKeys } from '../errors.types'

const _verifyUserAccessToItem = function (itemId, userId, client) {
  const verifyQuery = `
      SELECT gl.id
      FROM grocery_lists gl
      JOIN grocery_lists_items gli ON gl.id = gli.grocery_list_id
      WHERE gli.id = $1 AND gl.user_id = $2
    `
  const verifyValues = [itemId, userId]
  try {
    const verifyResult = await queryDbConnection(
      verifyQuery,
      verifyValues,
      client
    )
    if (verifyResult.rows.length === 0) {
      handleDatabaseError(new Error(ErrorKeys.USER_NOT_OWNER))
    }
  } catch (error) {
    handleDatabaseError(error)
  }
  return
}

const _verifyUserAccessToList = function (listId, userId, client) {
  const verifyQuery = `
      SELECT gl.id
      FROM grocery_lists gl
      WHERE gl.id = $1 AND gl.user_id = $2
    `
  const verifyValues = [listId, userId]
  try {
    const verifyResult = await queryDbConnection(
      verifyQuery,
      verifyValues,
      client
    )
    if (verifyResult.rows.length === 0) {
      handleDatabaseError(new Error(ErrorKeys.USER_NOT_OWNER))
    }
  } catch (error) {
    handleDatabaseError(error)
  }
  return
}

/**
 * Creates a new shopping list
 *
 * @param shoppingList Shopping list data
 * @returns The created shopping list with ID
 */
export async function createShoppingList(
  shoppingList: Omit<ShoppingListModel, 'id' | 'created'>
): Promise<ShoppingListModel> {
  withTransaction(async (client) => {
    const { name, user_id } = shoppingList

    const query = `
      INSERT INTO grocery_lists (name, user_id)
      VALUES ($1, $2)
      RETURNING id, name, user_id, archived, created
    `

    const values = [name, user_id]

    try {
      const result = await queryDbConnection(query, values, client)
      if (result.rows.length === 0) {
        handleDatabaseError(new Error(ErrorKeys.SHOPPING_LIST_CREATION_FAILED))
      }

      return result.rows[0]
    } catch (error) {
      handleDatabaseError(error)
    }
  })
}

/**
 * Gets a shopping list by ID with all its items
 *
 * @param listId Shopping list ID
 * @param userId User ID for verification
 * @returns Shopping list with items
 */
export async function selectShoppingListItems(
  listId: number,
  userId: number
): Promise<ShoppingListWithItems> {
  try {
    await _verifyUserAccessToList(listId, userId)

    const query = `
        SELECT id, grocery_list_id, ingredient_id, product_id, price_id, obtained, created
        FROM grocery_lists_items
        WHERE grocery_list_id = $1
      `

    const values = [listId]

    const itemsResult = await queryDbConnection(query, values, client)
    const items = itemsResult.rows as ShoppingListItemModel[]

    return {
      items,
    }
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Gets all shopping lists for a user
 *
 * @param userId User ID
 * @param includeArchived Whether to include archived lists
 * @returns Array of shopping lists
 */
export async function selectUserShoppingLists(
  userId: number,
  includeArchived: boolean = false
): Promise<ShoppingListModel[]> {
  try {
    let query = `
      SELECT id, name, user_id, archived, created
      FROM grocery_lists
      WHERE user_id = $1
    `

    if (!includeArchived) {
      query += ' AND archived IS NULL'
    }

    query += ' ORDER BY created DESC'

    const values = [userId]

    const result = await queryDbConnection(query, values)
    return result.rows
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Updates a shopping list's name or archived status
 *
 * @param listId Shopping list ID
 * @param userId User ID for verification
 * @param updates Fields to update
 * @returns Updated shopping list
 */
export async function updateShoppingList(
  listId: number,
  userId: number,
  updates: Partial<Pick<ShoppingListModel, 'name' | 'archived'>>
): Promise<ShoppingListModel> {
  try {
    withTransaction(async (client) => {
      await _verifyUserAccessToList(listId, userId)

      const fields = []
      const values = []
      let valueIndex = 1

      if (!!updates.name) {
        fields.push(`name = $${valueIndex++}`)
        values.push(updates.name)
      }

      if (!!updates.archived) {
        fields.push(`archived = $${valueIndex++}`)
        values.push(updates.archived)
      }

      if (fields.length === 0) {
        // there's nothing to do lol
        return []
      }

      const query = `
        UPDATE grocery_lists
        SET ${fields.join(', ')}
        WHERE id = $${valueIndex++} AND user_id = $${valueIndex++}
        RETURNING id, name, user_id, archived, created`

      values.push(listId, userId)

      const result = await queryDbConnection(query, values, client)
      if (result.rows.length === 0) {
        handleDatabaseError(ErrorKeys.SHOPPING_LIST_UPDATE_FAILED)
      }

      return result.rows[0]
    })
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Updates a shopping list item's obtained status
 *
 * @param itemId Item ID
 * @param userId User ID for ownership verification
 * @param obtained New obtained status
 * @returns Updated shopping list item
 */
export async function updateShoppingListItem(
  itemId: number,
  userId: number,
  obtained: boolean
): Promise<ShoppingListItemModel> {
  try {
    withTransaction(async (client) => {
      await _verifyUserAccessToItem(itemId, userId)

      const query = `
        UPDATE grocery_lists_items
        SET obtained = $1
        WHERE id = $2
        RETURNING id, grocery_list_id, ingredient_id, product_id, price_id, obtained, created
      `

      const query = [obtained, itemId]

      const result = await queryDbConnection(query, values, client)
      if (result.rows.length === 0) {
        handleDatabaseError(
          new Error(ErrorKeys.SHOPPING_LIST_ITEM_UPDATE_FAILED)
        )
      }

      return result.rows[0]
    })
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Updates all items in a shopping list to be obtained
 *
 * @param listId Shopping list ID
 * @param userId User ID for verification
 * @param obtained New obtained status for all items
 * @returns Number of updated items
 */
export async function updateAllShoppingListItems(
  listId: number,
  userId: number,
  obtained: boolean
): Promise<number> {
  try {
    withTransaction(async (client) => {
      await _verifyUserAccessToList(listId, userId)
      // First verify this user owns this list

      const query = `
        UPDATE grocery_lists_items
        SET obtained = $1
        WHERE grocery_list_id = $2
        RETURNING id
      `

      const values = [obtained, listId]

      const result = await queryDbConnection(query, values, client)
      return result.rowCount
    })
  } catch (error) {
    handleDatabaseError(error)
  }
}

/**
 * Removes an item from a shopping list
 *
 * @param itemId Item ID
 * @param userId User ID for verification
 * @returns Whether the operation was successful
 */
export async function deleteShoppingListItem(
  itemId: number,
  userId: number
): Promise<boolean> {
  try {
    withTransaction(async (client) => {
      await _verifyUserAccessToItem(itemId, userId)

      const query = `
        DELETE FROM grocery_lists_items
        WHERE id = $1
        RETURNING id
      `

      const values = [itemId]

      const deleteResult = await queryDbConnection(query, values, client)
      return deleteResult.rowCount > 0
    })
  } catch (error) {
    handleDatabaseError(error)
  }
}
