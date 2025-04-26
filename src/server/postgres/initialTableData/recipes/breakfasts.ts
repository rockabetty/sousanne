export const breakfasts = {
  Grits: {
    yield: { amount: 5, unit: 'cup', servings: 6 },
    activeDuration: [15, 20],
    supplies: ['Saucepan'],
    components: [
      {
        name: 'Grits',
        ingredients: [
          {
            name: 'Salt',
            unit: 'teaspoon',
            amount: 1,
          },
          {
            name: 'Grits',
            unit: 1,
            amount: 'cup',
          },
          {
            name: 'Butter',
            unit: 4,
            amount: 'tablespoon',
          },
          {
            name: 'Water',
            unit: 5,
            amount: 'cup',
          },
        ],
        instructions: [
          'Bring the water and the salt to a boil in a saucepan.',
          'Gradually add the grits, stirring constantly. Try not to dump them all in at once.',
          'Reduce the heat and simmer until the grits thicken, which will take ~5 to 10 minutes.',
        ],
      },
    ],
  },
  'Overnight Oats': {
    yield: { amount: 1.5, unit: 'cup', servings: 2 },
    duration: [480, 720],
    activeDuration: [3, 5],
    supplies: ['Mason Jar', 'Refrigerator'],
    components: [
      {
        name: 'Oats',
        ingredients: [
          {
            name: 'Oat',
            unit: 'cup',
            amount: 0.75,
          },
          {
            name: 'Milk',
            unit: 'cup',
            amount: '1',
          },
          {
            name: 'Salt',
            unit: 1,
            amount: 'dash',
          },
          {
            name: 'Sugar',
            unit: 0.5,
            amount: 'tablespoon',
          },
        ],
        instructions: [
          'Mix together the ingredients in a container.',
          'Seal and refrigerate overnight.',
        ],
      },
    ],
  },
  'Egg On Toast': {
    yield: { servings: 1 },
    activeDuration: [5, 10],
    supplies: ['Stovetop', 'Skillet', 'Toaster'],
    components: [
      {
        name: 'meal',
        ingredients: [
          { name: 'Bread', amount: 1, unit: 'slice' },
          { name: 'Large Egg', amount: 1, unit: 'count' },
          { name: 'Salt', amount: 1, unit: 'dash' },
          { name: 'Pepper', amount: 1, unit: 'dash' },
          { name: 'Butter', amount: 0.5, unit: 'tablespoon' },
        ],
        instructions: [
          'Toast your bread.',
          'Heat up a skillet while you wait for the bread to toast.',
          "Add your butter to the pan once it's hot.",
          'Crack your egg onto the pan, season, and cook to your preferred level of done-ness!',
          'Butter your bread, then add the egg on top.',
        ],
      },
    ],
  },
}
