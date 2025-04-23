const commonSteps = {
  skimFat: { desc: 'Skim off all the fat that rises to the surface.' },
  strain: { desc: 'Pour through a strainer.', supplies: ['Strainer'] },
  addAllBoilSimmer: {
    desc: 'Bring water to a boil. Add all the ingredients, then lower to a simmer.',
  },
  freezeIfWant: {
    desc: "To freeze, use quart-sized containers to keep things manageable. Fill your container 3/4 full (3 cups is 3/4 of a quart).  The liquid will expand when it freezes, so DON'T put the lid on if it's a jar or tupperware!  Otherwise, the liquid might expand too much and crack your container! Put the lid on later. If it\'s a plastic bag, zip it closed, but don't forget: 3/4 full! Lay it flat so it's easier to manage space in your freezer.  When it's time to thaw, DON'T submerge in hot water if it's stored in glass: that will break the glass!",
  },
  refrigerate3Days: {
    desc: "Refrigerate for up to 3 days. Freeze what you don't use by then!",
  },
}

export const sauces = {
  'Béarnaise Sauce': {
    yield: { amount: 1.5, unit: 'cup' },
    supplies: ['Stovetop', 'Double Broiler'],
    duration: [20, 30],
    components: [
      {
        name: 'Sauce',
        ingredients: [
          {
            name: 'Egg Yolk',
            amount: 4,
            unit: 'count',
            prepState: 'Beaten',
          },
          {
            name: 'Lemon juice',
            amount: 3,
            unit: 'tablespoon',
          },
          {
            name: 'Dry Vermouth',
            amount: 2,
            unit: 'tablespoon',
          },
          {
            name: 'Tarragon',
            amount: 1,
            unit: 'teaspoon',
          },
          {
            name: 'Butter',
            amount: 1,
            unit: 'cup',
            prepState: 'melted',
          },
          { name: 'Salt', toTaste: true },
          { name: 'Pepper', toTaste: true },
        ],
        instructions: [
          'In the top of a double broiler, whisk the egg youlks, lemon juice, wine, and tarragon until the mixture is thick (~5 minutes).',
          'Remove the mixture from the heat.',
          'Add the melted butter slow and steady while whisking.',
          'Keep whisking until you have a smooth, fluffy sauce.',
          'Season with salt and pepper.',
        ],
      },
    ],
  },

  'Creole Sauce': {
    duration: [20, 30],
    yield: {
      amount: 1,
      unit: 'cup',
    },
    supplies: ['Stovetop', 'Sauce Pan'],
    components: [
      {
        name: 'Sauce',

        ingredients: [
          {
            name: 'Butter',
            amount: 4,
            unit: 'tablespoon',
          },
          {
            name: 'Green Bell Pepper',
            amount: 0.5,
            unit: 'cup',
            prepState: 'Chopped',
          },
          {
            name: 'Red Bell Pepper',
            amount: 0.5,
            unit: 'cup',
            prepState: 'Chopped',
          },
          {
            name: 'Onion',
            amount: 0.5,
            unit: 'cup',
            prepState: 'Chopped',
          },
          {
            name: 'Tomato',
            amount: 2,
            unit: 'cup',
            prepState: 'Diced',
          },
          {
            name: 'Tarragon',
            amount: 0.5,
            unit: 'teaspoon',
          },
          {
            name: 'Oregano',
            amount: 0.5,
            unit: 'teaspoon',
          },
          {
            name: 'Basil',
            amount: 0.5,
            unit: 'teaspoon',
          },
          {
            name: 'Thyme',
            amount: 0.5,
            unit: 'teaspoon',
          },
          {
            name: 'Creole Seasoning',
            amount: 1,
            unit: 'tablespoon',
          },
          {
            name: 'Garlic',
            amount: 2,
            unit: 'clove',
          },
          {
            name: 'Tabasco Sauce',
            amount: 1,
            unit: 'teaspoon',
          },
          {
            name: 'Salt',
            toTaste: true,
          },
          {
            name: 'Black Pepper',
            toTaste: true,
          },
        ],
        instructions: [
          'Melt the butter in a large pan over medium heat.',
          'Add together all the ingredients!',
          'Sauté for a minute or two.',
          'Simmer to reduce the liquid to half or one third of its volume.',
        ],
      },
    ],
  },

  Roux: {
    duration: [10, 25],
    yield: {
      amount: 1,
      unit: 'cup',
    },
    supplies: ['Stovetop', 'Skillet'],
    components: [
      {
        name: 'Roux',
        ingredients: [
          {
            name: 'Vegetable Oil',
            amount: 1,
            unit: 'cup',
          },
          {
            name: 'Flour',
            amount: 1,
            unit: 'cup',
          },
        ],
        instructions: [
          'Place oil in a large skillet over medium heat.',
          'Whisk the flour into the oil and cook slowly, constantly stirring until the roux reaches the desired color: 10 minutes for a light, tan roux, 15 for a medium-dark roux, and 20 for a deep, dark roux.',
        ],
      },
    ],
  },
}

export const stocks = {
  'Cajun-Creole Fish Stock': {
    description:
      'Perfect for Louisiana-style seafood stews and light gumbos. Fast and clean.',
    duration: [20, 25],
    yield: { amount: 4, unit: 'quart' },
    supplies: ['Stock pot', 'Strainer'],
    components: [
      {
        name: 'Stock',
        ingredients: [
          { name: 'Fish Bone', amount: 2, unit: 'pound' },
          { name: 'Shallot', amount: 1, unit: 'cup', prepState: 'Chopped' },
          { name: 'Leek', amount: 1, unit: 'count', prepState: 'Chopped' },
          { name: 'Celery', amount: 1, unit: 'cup', prepState: 'Chopped' },
          {
            name: 'Fresh Parsley',
            amount: 1,
            unit: 'cup',
            prepState: 'Chopped',
          },
          {
            name: 'Thyme',
            amount: 1,
            unit: 'teaspoon',
          },
          {
            name: 'Bay Leaf',
            unit: 'count',
            amount: 2,
          },
          {
            name: 'Black Peppercorn',
            amount: 6,
            unit: 'count',
          },
          {
            name: 'White Wine',
            amount: 1,
            unit: 'cup',
          },
          {
            name: 'Water',
            amount: 4,
            unit: 'quart',
          },
        ],
        instructions: [
          commonSteps.addAllBoilSimmer.desc,
          'Let simmer for 15 minutes.',
          'Remove from heat.',
          commonSteps.skimFat.desc,
          commonSteps.strain.desc,
          commonSteps.refrigerate3Days.desc,
          commonSteps.freezeIfWant.desc,
        ],
      },
    ],
  },

  'Chicken Stock': {
    supplies: ['Stock pot'],
    yield: { amount: 4, unit: 'quart' },
    description:
      "A multi-purpose chicken stock that doesn't lean too far in any culinary direction so you can fold it into many cuisines.  She's nothing fancy, but she's a kitchen workhorse.",
    duration: [65, 90],
    components: [
      {
        name: 'Stock',
        ingredients: [
          { name: 'Chicken Bone', amount: 2, unit: 'pound' },
          { name: 'Carrot', amount: 1, unit: 'cup', prepState: 'Chopped' },
          { name: 'Onion', amount: 0.5, unit: 'cup', prepState: 'Chopped' },
          { name: 'Celery', amount: 0.5, unit: 'cup', prepState: 'Chopped' },
          {
            name: 'Fresh Parsley',
            amount: 0.5,
            unit: 'cup',
            prepState: 'Chopped',
          },
          { name: 'Fresh Thyme', amount: 1, unit: 'pinch' },
          { name: 'Bay Leaf', amount: 1, unit: 'count' },
          { name: 'Water', amount: 8, unit: 'quart' },
        ],
        instructions: [
          commonSteps.addAllBoilSimmer.desc,
          'Simmer uncovered until the water level comes down by half (about 1 hour).',
          commonSteps.skimFat.desc,
          commonSteps.refrigerate3Days.desc,
          commonSteps.freezeIfWant.desc,
        ],
      },
    ],
  },

  'Roasted Turkey Stock': {
    duration: [150, 180],
    supplies: ['Stock pot', 'Strainer'],
    yield: { amount: 4, unit: 'quart' },
    ovenPreheat: 350,
    components: [
      {
        name: 'Turkey Bone',
        amount: 3,
        unit: 'pound',
      },
      {
        name: 'Carrot',
        amount: 1.5,
        unit: 'count',
        prepState: 'Chopped',
      },
      {
        name: 'Celery',
        amount: 2,
        unit: 'stalk',
        prepState: 'Chopped',
      },
      { name: 'Large Onion', amount: 1, unit: 'count', prepState: 'Chopped' },
      { name: 'Garlic', amount: 2, unit: 'clove', prepState: 'Halved' },
      { name: 'Bay Leaf', amount: 2, unit: 'count' },
      { name: 'Fresh Parsley', amount: 4, unit: 'sprig' },
      { name: 'Sage', amount: 1, unit: 'teaspoon' },
      { name: 'Thyme', amount: 1, unit: 'teaspoon' },
      { name: 'Black Peppercorn', amount: 1.5, unit: 'teaspoon' },
      { name: 'Water', amount: 8, unit: 'quart' },
    ],
    instructions: [
      'Roast the turkey bones for 30 minutes.',
      commonSteps.addAllBoilSimmer.desc,
      'Keep that low simmer going for 2 hours, uncovered.',
      commonSteps.skimFat.desc,
      commonSteps.strain.desc,
      commonSteps.refrigerate3Days.desc,
      commonSteps.freezeIfWant.desc,
    ],
  },

  'Turkey Stock': {
    duration: [150, 180],
    supplies: ['Stock pot', 'Strainer'],
    yield: { amount: 3, unit: 'quart' },
    ovenPreheat: 350,
    components: [
      {
        name: 'Turkey Neck',
        amount: 1,
        unit: 'count',
      },
      {
        name: 'Carrot',
        amount: 1,
        unit: 'count',
        prepState: 'Chopped',
      },
      {
        name: 'Celery',
        amount: 1,
        unit: 'stalk',
        prepState: 'Chopped',
      },
      { name: 'Large Onion', amount: 0.5, unit: 'count', prepState: 'Chopped' },
      { name: 'Garlic', amount: 2, unit: 'clove', prepState: 'Halved' },
      { name: 'Bay Leaf', amount: 2, unit: 'count' },
      { name: 'Fresh Parsley', amount: 2, unit: 'sprig' },
      { name: 'Thyme', amount: 0.5, unit: 'teaspoon' },
      { name: 'Sage', amount: 0.5, unit: 'teaspoon' },
      { name: 'Black Peppercorn', amount: 1, unit: 'teaspoon' },
      { name: 'Water', amount: 6, unit: 'quart' },
    ],
    instructions: [
      commonSteps.addAllBoilSimmer.desc,
      'Keep that low simmer going for 2 hours, uncovered.',
      commonSteps.skimFat.desc,
      commonSteps.strain.desc,
      commonSteps.refrigerate3Days.desc,
      commonSteps.freezeIfWant.desc,
    ],
  },

  'Southern Beef Stock': {
    duration: [480, 600],
    yield: { amount: 4, unit: 'quart' },
    byProducts: [{ name: 'Roasted Bone Marrow', type: 'Ingredient' }],
    supplies: ['Stock pot', 'Oven'],
    ovenPreheat: 400,
    components: [
      {
        name: 'Stock',
        ingredients: [
          { name: 'Beef Bone', amount: 3.5, unit: 'pound' },
          {
            name: 'Large Onion',
            amount: 0.5,
            unit: 'count',
            prepState: 'Chopped',
          },
          { name: 'Celery', amount: 1, unit: 'stalk', prepState: 'Chopped' },
          { name: 'Carrot', amount: 1.5, unit: 'count', prepState: 'Chopped' },
          { name: 'Garlic', amount: 4, unit: 'clove' },
          { name: 'Black Peppercorn', amount: 1.5, unit: 'teaspoon' },
          { name: 'Fresh Parsley', amount: 4, unit: 'sprig' },
          { name: 'Bay Leaf', amount: 2, unit: 'count' },
          { name: 'Water', amount: 7, unit: 'quart' },
        ],
        instructions: [
          'Roast the bones in the oven for about 2 hours.',
          'When 15 minutes are left, add the vegetables.',
          'Scrape out and reserve the marrow for other tasty things.',
          commonSteps.addAllBoilSimmer.desc,
          'Leave it on low, uncovered, for 8 hours (6 hours minimum). You heard me! Low and slow.',
          commonSteps.skimFat.desc,
          commonSteps.strain.desc,
          commonSteps.refrigerate3Days.desc,
          commonSteps.freezeIfWant.desc,
        ],
      },
    ],
  },

  'French Beef Stock': {
    supplies: ['Stock pot', 'Oven', 'Strainer'],
    ovenPreheat: 450,
    yield: { amount: 4, unit: 'quart' },
    duration: [210, 270],
    components: [
      {
        name: 'Stock',
        ingredients: [
          { name: 'Beef Bone', amount: 2, unit: 'pound' },
          { name: 'Carrot', amount: 2, unit: 'cup', prepState: 'Chopped' },
          { name: 'Leek', amount: 1, unit: 'cup', prepState: 'Chopped' },
          { name: 'Onion', amount: 2.5, unit: 'cup', prepState: 'Chopped' },
          { name: 'Celery', amount: 1.5, unit: 'cup', prepState: 'Chopped' },

          {
            name: 'Fresh Parsley',
            amount: 1,
            unit: 'cup',
            prepState: 'Chopped',
          },
          { name: 'Thyme', amount: 1, unit: 'teaspoon' },
          { name: 'Garlic', amount: 0.5, unit: 'head', prepState: 'Peeled' },
          { name: 'Tomato Paste', amount: 0.5, unit: 'cup' },
          {
            name: 'Black Peppercorn',
            amount: 5,
            unit: 'count',
          },
          { name: 'Water', amount: 8, unit: 'quart' },
        ],
        instructions: [
          'Roast the bones until brown (~30 minutes).',
          'While the bones are roasting, chop up all your veggies.',
          'Remove the bones from the oven and put them in the pot.',
          commonSteps.addAllBoilSimmer.desc,
          commonSteps.skimFat.desc,
          commonSteps.strain.desc,
          'Boil the stock again, uncovered, for another hour. It needs to evaporate and reduce.',
          commonSteps.refrigerate3Days.desc,
          commonSteps.freezeIfWant.desc,
        ],
      },
    ],
  },
}
