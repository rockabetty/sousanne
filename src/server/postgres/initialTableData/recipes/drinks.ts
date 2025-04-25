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

export const drinks = {
  // lemonade
  // arnold palmer
  // kool aid
  'Sweet Peach Tea': {
    yield: { amount: 5, unit: 'cup' },
    byProducts: ['Sweet Boiled Peaches'],
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
}
