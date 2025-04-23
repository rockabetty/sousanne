import { sauces, stocks } from './saucesAndStocks'

const creole = {
  name: 'Creole',
  saucesAndStocks: [
    sauces['Roux'],
    sauces['Creole Sauce'],
    sauces['Béarnaise Sauce'],
    stocks['Cajun-Creole Fish Stock'],
    stocks['French Beef Stock'],
    stocks['Chicken Stock'],
  ],
}
const cajun = {
  name: 'Cajun',
  saucesAndStocks: [
    sauces['Roux'],
    stocks['Cajun-Creole Fish Stock'],
    stocks['French Beef Stock'],
    stocks['Chicken Stock'],
  ],
}

const southern = {
  name: 'Southern and Soul',
  saucesAndStocks: [
    stocks['Roux'],
    stocks['Southern Beef Stock'],
    stocks['Chicken Stock'],
    stocks['Turkey Stock'],
    stocks['Roasted Turkey Stock'],
  ],
}

const texMex = {
  name: 'Tex-Mex',
  saucesAndStocks: [stocks['Chicken Stock']],
}

const french = {
  name: 'French',
  saucesAndStocks: [stocks['French Beef Stock'], stocks['Chicken Stock']],
}
