type Unit =
  | 'fluid ounce'
  | 'ounce'
  | 'cup'
  | 'pound'
  | 'tea bag'
  | 'quart'
  | 'teaspoon'
  | 'tablespoon'
  | 'gallon'
  | 'count'
  | 'liter'

type Ingredient = {
  name: string
  amount: number
  unit: Unit
  prepState?: 'Chopped' | 'Sliced' | 'Diced' | 'Julienned' | 'Pureed' | 'Mashed'
  note?: string
}

type RecipeComponent = {
  name: string
  ingredients: Ingredient[]
  instructions: string[]
}

type Supply = 'Stovetop' | 'Oven' | 'Strainer' | 'Saucepan' | 'Gallon Container'

type Recipe = {
  name: string
  supplies?: Supply[]
  activeDuration: [number, number]
  passiveDuration?: [number, number]
  categories: string[]
  ovenPreheat?: number
  byProducts?: string[]
  yield: { amount: number; unit: Unit }
  servings: number
  components: RecipeComponent[]
}

type CocktailMenu = {
  smoky: Recipe[]
  sweet: Recipe[]
  zesty: Recipe[]
}

export type CuisineMenu = {
  name: string
  description: string
  drinks: {
    cocktails: CocktailMenu
    beers: Recipe[]
    beverages: Recipe[]
  }
  snacks: {
    sweet: Recipe[]
    salty: Recipe[]
    tangy: Recipe[]
    savory?: Recipe[]
    spicy?: Recipe[]
    bitter?: Recipe[]
    herbal?: Recipe[]
    fatty?: Recipe[]
  }
  soups: Recipe[]
  sides: {
    vegetable: Recipe[]
    starch: Recipe[]
    fruit: Recipe[]
  }
  salad: Recipe[]
  fish: Recipe[]
  redMeat: Recipe[]
  poultry: Recipe[]
  palateCleanser: Recipe[]
  cheeseFruit: Recipe[]
  dessert: Recipe[]
  misc: Recipe[]
}

/*
export const starterMenu: CuisineMenu = {
  name: '',
  description: '',
  drinks: {
    cocktails: { smoky: [], sweet: [], zesty: [] },
    beers: [],
    beverages: [],
  },
  snacks: {
    sweet: [],
    salty: [],
    tangy: [],
  },
  soups: [],
  sides: {
    vegetable: [],
    starch: [],
    fruit: [],
  },
  salad: [],
  fish: [],
  redMeat: [],
  poultry: [],
  palateCleanser: [],
  cheeseFruit: [],
  dessert: [],
}
*/
