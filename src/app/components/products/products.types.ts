export type ProductData = {
  name?: string
  ingredientId?: string
  packageType: 'single' | 'multiple' | 'weight' | 'apiece'
  packageCount?: number
  packageAmount?: number
  unitName: string
  organic: boolean
}
