export type ShoppingListModel = {
  id: number
  name: string
  user_id: number
  archived: Date | null
  created: Date
}

export type ShoppingListItemModel = {
  id: number
  grocery_list_id: number
  ingredient_id: number | null
  product_id: number
  price_id: number | null
  obtained: boolean
  created: Date
}

export type ShoppingListModelColumn = keyof ShoppingListModel

export const shoppingListModelColumns: ShoppingListModelColumn[] = [
  'id',
  'name',
  'user_id',
  'archived',
  'created',
]

export const shoppingListModelColumnSet: Set<ShoppingListModelColumn> = new Set(
  shoppingListModelColumns
)

export type ShoppingListItemModelColumn = keyof ShoppingListItemModel

export const shoppingListItemModelColumns: ShoppingListItemModelColumn[] = [
  'id',
  'grocery_list_id',
  'ingredient_id',
  'product_id',
  'price_id',
  'obtained',
  'created',
]

export const shoppingListItemModelColumnSet: Set<ShoppingListItemModelColumn> =
  new Set(shoppingListItemModelColumns)

export type ShoppingListWithItems = ShoppingListModel & {
  items: ShoppingListItemModel[]
}
