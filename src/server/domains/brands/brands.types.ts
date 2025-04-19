export type BrandModel = {
  id: number
  name: string
}

export type BrandModelColumn = keyof BrandModel

export const brandModelColumns: BrandModelColumn[] = ['id', 'name']

export const brandModelColumnSet: Set<BrandModelColumn> = new Set(
  brandModelColumns
)
