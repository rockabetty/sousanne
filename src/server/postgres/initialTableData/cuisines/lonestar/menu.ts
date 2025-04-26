import { CuisineMenu } from '../index'
import {
  byProductRecipes,
  cansOfSodaRecipes,
  cocktailRecipes,
  fruitAdeRecipes,
  teaRecipes,
} from './recipes'

export const starterMenu: CuisineMenu = {
  name: 'Lone Star Southern',
  description:
    'The Czech and German side of Texas. Curated for people with a bunch of antique ceramic roosters and/or sunflowers in their kitchen.',
  drinks: {
    cocktails: {
      smoky: [],
      sweet: [cocktailRecipes.sweet.bourbonPeachSweetTea],
      zesty: [cocktailRecipes.zesty.ginPeachShrub],
    },
    beers: [],
    beverages: [
      cansOfSodaRecipes.creamSoda,
      cansOfSodaRecipes.drPepper,
      teaRecipes.sweetTea,
      teaRecipes.icedTea,
      fruitAdeRecipes.cherryLimeade,
      teaRecipes.peachTea,
      teaRecipes.sweetPeachTea,
    ],
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
  misc: [byProductRecipes.peachJam],
}
