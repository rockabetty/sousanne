import { sauces, stocks } from '../recipes/saucesAndStocks'
import { breakfasts } from '../recipes/breakfasts'

const european = {
  children: {
    name: 'French',
    recipes: {
      saucesAndStocks: [stocks['French Beef Stock'], sauces['Béarnaise Sauce']],
    },
  },
}

const americana = {
  name: 'American',
  recipes: {
    saucesAndStocks: [stocks['Chicken Stock'], sauces['Cocktail Sauce']],
  },
  children: [
    {
      name: 'Tex-Mex',
    },
    {
      name: 'Southern Food',
      recipes: {
        breakfasts: [breakfasts['Grits']],
        saucesAndStocks: [
          stocks['Roux'],
          stocks['Southern Beef Stock'],
          stocks['Chicken Stock'],
        ],
      },
      children: [
        {
          name: 'Cajun-Creole',
          recipes: {
            saucesAndStocks: [
              sauces['Béarnaise Sauce'],
              stocks['French-Creole Fish Stock'],
            ],
          },
          children: [
            {
              name: 'Cajun',
              recipes: {
                saucesAndStocks: [sauces['Cajun Fish Stock']],
              },
            },
          ],
        },
        {
          name: 'Southern & Soul',
          recipes: {
            saucesAndStocks: [
              stocks['Turkey Stock'],
              stocks['Roasted Turkey Stock'],
            ],
          },
        },
      ],
    },
  ],
}
