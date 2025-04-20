export type Store = {
  id?: number
  name: string
  value?: number | string
  zipcode?: string
  street?: string
  city?: string
  state?: string
}

export type StorePrice = {
  storeId: number | string
  price: number
  currencyId: number | string
}
