const drinkPrepcipes = {
  'Simple Syrup': {
    yield: { amount: 1.75, unit: 'cup' },
    byProducts: [{ name: 'Simple Syrup', type: 'Ingredient' }],
    duration: [5, 10],
    activeDuration: [1, 5],
    components: [
      {
        name: 'Syrup',
        ingredients: [
          {
            name: 'Water',
            unit: 'cup',
            amount: 1,
          },
          {
            name: 'Sugar',
            unit: 'cup',
            amount: 1,
          },
        ],
      },
    ],
  },
}

export const mocktailRecipes = {
  peachShrub: {
    duration: [5, 10],
    activeDuration: [5, 5],
    categories: ['Drinks'],
    byProducts: ['Peach Shrub'],
    supplies: ['Blender', 'Saucepan', 'Stovetop'],
    yield: { amount: 1.5, unit: 'cup' },
    servings: 1,
    components: [
      {
        name: 'shrub',
        ingredients: [
          { name: 'Peach', amount: 2, unit: 'count' },
          { name: 'Sugar', amount: 1, unit: 'cup' },
          { name: 'Apple Cider Vinegar', amount: 0.5, unit: 'cup' },
          { name: 'Water', amount: 0.5, unit: 'cup' },
        ],
        instructions: [
          'Zap the hell out of all that in a food processor or blender.',
          'Pour the mixture into a sauce pan and simmer over medium heat.',
          'Stir over heat until the sugar is completely dissolved.',
          'If you want, strain the mixture before you refrigerate it.',
        ],
      },
    ],
  },
}

export const cocktailRecipes = {
  smoky: {
    oldFashioned: {
      // rye old fashioned
    },
  },
  zesty: {
    ginPeachShrub: {
      duration: [5, 10],
      activeDuration: [5, 5],
      categories: ['Drinks'],
      supplies: ['Blender', 'Saucepan', 'Stovetop'],
      yield: { amount: 1.5, unit: 'cup' },
      servings: 1,
      components: [
        {
          name: 'cocktail',
          ingredients: [
            { name: 'Peach Shrub', amount: 2, unit: 'fluid ounce' },
            { name: 'Lemon Juice', amount: 0.5, unit: 'fluid ounce' },
            { name: 'Gin', amount: 1, unit: 'fluid ounce' },
            { name: 'Tonic Water', amount: 1.5, unit: 'fluid ounce' },
          ],
          instructions: [
            'Stir together everything but the tonic water in a glass of ice.',
            'Pour the tonic water over top.',
          ],
        },
      ],
    },
  },
  sweet: {
    bourbonPeachSweetTea: {
      name: 'Bourbon Peach Sweet Tea',
      duration: [1, 3],
      categories: ['Drinks', 'Cocktails'],
      yield: { amount: 5, unit: 'fluid ounce' },
      servings: 1,
      components: [
        {
          name: 'cocktail',
          ingredients: [
            {
              name: 'Peach',
              amount: 0.5,
              unit: 'count',
              prepState: 'Sliced',
            },
            {
              name: 'Brown Sugar',
              amount: 0.5,
              unit: 'teaspoon',
            },
            {
              name: 'Lemon Juice',
              amount: 0.5,
              unit: 'fluid ounce',
            },
            {
              name: 'Peach Liqueur',
              amount: 1,
              unit: 'fluid ounce',
            },
            {
              name: 'Bourbon',
              amount: 1.5,
              unit: 'fluid ounce',
            },
            {
              name: 'Sweet Peach Tea',
              amount: 4,
              unit: 'fluid ounce',
            },
          ],
          instructions: [
            'Add the peaches to a shaker (or a jar you can close) along with the brown sugar and lemon juice.',
            'Mash it into a pulp, then add in the peach liqueur, tea, and bourbon.',
            'Shake it or stir it as you like!',
          ],
        },
      ],
    },
  },
}

export const teaRecipes = {
  sweetTea: {
    name: 'Sweet Tea',
    duration: [5, 10],
    activeDuration: [6, 8],
    supplies: ['Saucepan', 'Gallon Container'],
    categories: ['Drinks'],
    byProducts: ['Brewed Black Sweet Tea'],
    yield: { amount: 1, unit: 'gallon' },
    components: [
      {
        name: 'Sweet tea',
        ingredients: [
          {
            name: 'Water',
            unit: 'quart',
            amount: 4,
          },
          {
            name: 'Black Tea',
            unit: 'tea bag',
            amount: 12,
          },
          {
            name: 'Sugar',
            amount: 1,
            unit: 'cup',
          },
        ],
        instructions: [
          'Bring some of the water to a boil (e.g. 4 cups), then remove it from heat.',
          'Add the sugar and the tea.',
          'Steep the tea for five minutes.',
          'Add the rest of the water and refrigerate.',
        ],
      },
    ],
  },
  icedTea: {
    name: 'Iced Tea',
    duration: [5, 10],
    activeDuration: [6, 8],
    supplies: ['Saucepan', 'Gallon Container'],
    categories: ['Drinks'],
    byProducts: ['Brewed Black Tea'],
    yield: { amount: 1, unit: 'gallon' },
    components: [
      {
        name: 'tea',
        ingredients: [
          {
            name: 'Water',
            unit: 'quart',
            amount: 4,
          },
          {
            name: 'Black Tea',
            unit: 'tea bag',
            amount: 12,
          },
        ],
        instructions: [
          'Bring some of the water to a boil (e.g. 4 cups), then remove it from heat.',
          'Add the tea bags.',
          'Steep the tea for five minutes.',
          'Add the rest of the water and refrigerate.',
        ],
      },
    ],
  },
  sweetPeachTea: {
    'Sweet Peach Tea': {
      yield: { amount: 5, unit: 'cup' },
      byProducts: ['Sweet Cooked Peach', 'Sweet Peach Tea'],
      duration: [25, 30],
      activeDuration: [3, 5],
      supplies: ['Strainer', 'Stovetop', 'Saucepan'],
      components: [
        {
          name: 'Tea',
          ingredients: [
            {
              name: 'Simple Syrup',
              unit: 'cup',
              amount: 1,
            },
            {
              name: 'Peach',
              unit: 'count',
              prepState: 'Sliced',
            },
            {
              name: 'Water',
              unit: 'cup',
              amount: 4,
            },
            {
              name: 'Black Tea Leaves',
              unit: 'tablespoon',
              amount: 1,
            },
          ],
          instructions: [
            'Bring the simple syrup to a boil in a saucepan., lower the heat, then crush and mash the peaches in the water.',
            'Let the mixture of simple syrup and peaches steep for about a half hour.',
            'Towards the last few minutes, brew your tea. The tea only needs to steep for about 5 minutes.',
            'Strain  the simple syrup with the peaches to remove the pulpy fruit.',
            'Mix the tea and your peach-infused simple syrup together.',
          ],
        },
      ],
    },
  },
  peachTea: {
    'Peach Tea': {
      yield: { amount: 5, unit: 'cup' },
      byProducts: ['Cooked Peach', 'Peach Tea'],
      duration: [25, 30],
      activeDuration: [3, 5],
      supplies: ['Strainer', 'Stovetop', 'Saucepan'],
      components: [
        {
          name: 'Tea',
          ingredients: [
            {
              name: 'Peach',
              unit: 'count',
              prepState: 'Sliced',
            },
            {
              name: 'Water',
              unit: 'cup',
              amount: 5,
            },
            {
              name: 'Black Tea Leaves',
              unit: 'tablespoon',
              amount: 1,
            },
          ],
          instructions: [
            'Bring the simple syrup to a boil in a saucepan., lower the heat, then crush and mash the peaches in the water.',
            'Let the mixture of simple syrup and peaches steep for about a half hour.',
            'Towards the last few minutes, brew your tea. The tea only needs to steep for about 5 minutes.',
            'Strain  the simple syrup with the peaches to remove the pulpy fruit.',
            'Mix the tea and your peach-infused simple syrup together.',
          ],
        },
      ],
    },
  },
}

export const fruitAdeRecipes = {
  cherryLimeade: {
    name: 'Cherry Limeade',
    activeDuration: [5, 5],
    duration: [15, 20],
    categories: ['Drinks'],
    supplies: ['Saucepan'],
    byProducts: ['Cherry Limeade'],
    components: [
      {
        name: 'drink',
        ingredients: [
          {
            name: 'Sugar',
            amount: 1.25,
            unit: 'cup',
          },
          {
            name: 'Lime Juice',
            amount: 1.25,
            unit: 'cup',
          },
          {
            name: 'Maraschino Cherry',
            amount: 16,
            unit: 'ounce',
            note: 'With the juice! The whole jar.',
          },
          {
            name: 'Lemon-Lime Soda',
            amount: 2,
            unit: 'liter',
            note: 'e.g. Sprite or 7-Up',
          },
          {
            name: 'Cherry Juice',
            amount: 0.5,
            unit: 'cup',
            note: 'Tart or regular.',
          },
        ],
        instructions: [
          'Add limejuice and sugar to a saucepan on low heat.',
          'Stir until the sugar has melted.',
          'Let the mixture cool down, about 15 minutes.',
          'Mix into a container with the other ingredients.',
        ],
      },
    ],
  },
}

export const cansOfSodaRecipes = {
  creamSoda: {
    name: 'Cream Soda',
    activeDuration: [0, 0],
    categories: ['Drinks'],
    yield: { amount: 12, unit: 'fluid ounce' },
    servings: 1,
    components: [
      {
        name: 'Cream Soda',
        ingredients: [{ name: 'Cream Soda', unit: 'fluid ounce', amount: 12 }],
        instructions: ['Crack open a can.'],
      },
    ],
  },
  drPepper: {
    name: 'Dr Pepper',
    activeDuration: [0, 0],
    categories: ['Drinks'],
    yield: { amount: 12, unit: 'fluid ounce' },
    servings: 1,
    components: [
      {
        name: 'Dr Pepper',
        ingredients: [{ name: 'Dr Pepper', unit: 'fluid ounce', amount: 12 }],
        instructions: ['Crack open a can.'],
      },
    ],
  },
}

export const byProductRecipes = {
  peachJam: {
    name: 'Peach Jam',
    duration: [5, 10],
    activeDuration: [10, 25],
    yield: { amount: 3, unit: 'cup' },
    components: [
      {
        name: 'jam',
        ingredients: [
          {
            name: 'Peach',
            amount: 4,
            unit: 'count',
          },
          {
            name: 'Sugar',
            amount: 2,
            unit: 'cup',
          },
          {
            name: 'Lemon Juice',
            amount: 2,
            unit: 'tablespoon',
          },
        ],
        instructions: [
          'Add the peaches and lemon juice together and bring it to a boil. Keep moving and mushing them.',
          "Reduce the heat to medium, then add in the sugar. Keep stirring so it doesn't burn while you turn the heat back up.",
          'Continue to boil and stir until you like the consistency. With fresh peaches it should take just shy of a half hour.',
        ],
      },
    ],
  },
}

export const breakfastRecipes = {
  'Jam On Toast': {
    yield: { servings: 1 },
    activeDuration: [5, 10],
    supplies: ['Toaster'],
    components: [
      {
        name: 'meal',
        ingredients: [
          { name: 'Bread', amount: 1, unit: 'slice' },
          { name: 'Butter', amount: 1, unit: 'teaspoon' },
          { name: 'Jam', amount: 1, unit: 'tablespoon' },
        ],
        instructions: ['Toast your bread.', 'Add your butter and jam!'],
      },
    ],
  },
}
