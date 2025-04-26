const variants = {
  tea: [
    { node: 'Loose-Leaf $' },
    { node: '$ Tea Bag' },
    { node: 'Compressed $' },
    { node: 'Instant $' },
    { node: 'Pre-Made, Sweetened $' },
    { node: 'Pre-Made, Plain $' },
  ],
  soda: [
    {
      node: 'Zero-Sugar $',
    },
    { node: 'Regular $' },
    { node: 'Diet $' },
  ],
}

export const drinkIngredients = {
  node: 'drink',
}

const variants = {
  tea: [
    { node: 'Loose-Leaf $' },
    { node: '$ Tea Bag' },
    { node: 'Compressed $' },
    { node: 'Instant $' },
    { node: 'Pre-Made, Sweetened $' },
    { node: 'Pre-Made, Plain $' },
  ],
  soda: [{ node: 'Zero-Sugar $' }, { node: 'Regular $' }, { node: 'Diet $' }],
}

export const cookingFats = {
  node: 'cooking_fats',
  children: [
    {
      node: 'low_smoke_point',
      children: [
        {
          node: 'dairy',
          ingredients: [
            {
              node: 'butter',
              name: 'Butter',
              ingredients: [{ name: 'Salted Butter', archetypeOf: 'Butter' }],
            },
          ],
        },
      ],
    },
  ],
}

export const grains = {
  node: 'baked_goods',
  children: [
    {
      node: 'bread',
      children: [
        {
          node: 'loaves',
          children: [{ node: 'light', ingredients: [{ name: 'White Bread' }] }],
        },
      ],
    },
  ],
}

export const saucesAndCondiments: {
  node: 'sauces_and_condiments'
  children: [
    {
      node: 'preserves'
      children: [
        {
          node: 'jams'
          ingredients: [{ name: 'Jam' }]
          children: [
            {
              node: 'rosaceae'
              children: [
                {
                  node: 'prunus'
                  children: [
                    { node: 'peach'; ingredients: [{ name: 'Peach Jam' }] },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ]
}

export const fruits = {
  node: 'fruit',
  children: [
    {
      node: 'rosaceae',
      children: [
        {
          node: 'prunus',
          children: [
            {
              node: 'peach',
              ingredients: [
                {
                  name: 'Peach',
                  children: [
                    {
                      node: 'freshproduce',
                      ingredients: [
                        { name: 'Fresh Peach', archetypeOf: 'Peach' },
                      ],
                    },
                    {
                      node: 'cannedproduce',
                      ingredients: [{ name: 'Canned Peach' }],
                    },
                    {
                      node: 'frozenproduce',
                      ingredients: [{ name: 'Frozen Peach' }],
                    },
                    {
                      node: 'precooked',
                      ingredients: [
                        { name: 'Cooked Peach' },
                        { name: 'Sweet Cooked Peach' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              node: 'cherry',
              cupWeight: 5,
              ingredients: [{ name: 'Maraschino Cherry' }],
            },
          ],
        },
      ],
    },
  ],
}

export const drinks = {
  node: 'drink',
  unit: 'fluid ounce',
  children: [
    {
      node: 'spirits',
      children: [
        {
          node: 'liqueur',
          children: [
            {
              node: 'rosaceae',
              children: [
                {
                  node: 'prunus',
                  ingredients: [{ name: 'Peach Liqueur', contains: ['Peach'] }],
                },
              ],
            },
          ],
        },
        {
          node: 'gin',
          ingredients: [{ name: 'Gin' }],
        },
        {
          node: 'whiskey',
          ingredients: [{ name: 'Whiskey' }],
          children: [
            {
              node: 'bourbon',
              ingredients: [{ name: 'Bourbon ' }],
            },
            {
              node: 'rye',
              ingredients: [{ name: 'Rye Whiskey' }],
            },
          ],
        },
      ],
    },
    {
      node: 'tonic_and_seltzer',
      children: [
        {
          node: 'tonic',
          ingredients: [{ name: 'Tonic Water' }],
        },
      ],
    },
    {
      node: 'soda',
      children: [
        {
          node: 'pepper',
          ingredients: [
            {
              name: 'Pepper Soda',
              brands: [
                'Dr Pepper',
                'Pibb Xtra',
                'Dublin Original',
                'Dr Thunder',
              ],
            },
          ],
        },
        {
          node: 'cream_soda',
          ingredients: [
            {
              name: 'Cream Soda',
              brands: ['Great Value', 'Big Red', 'LOTTE Milkis'],
            },
          ],
        },
      ],
    },

    {
      node: 'punch',
      children: [
        {
          node: 'shrub',
          contains: ['Vinegar'],
          children: [
            {
              node: 'rosaceae',
              children: [
                {
                  node: 'prunus',
                  children: [
                    {
                      node: 'peach',
                      ingredients: [{ name: 'Peach Shrub' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      node: 'juice',
      children: [
        {
          node: 'citrus',
          children: [{ node: 'lime', ingredients: [{ name: 'Lime Juice' }] }],
          children: [{ node: 'lemon', ingredients: [{ name: 'Lemon Juice' }] }],
        },
        {
          node: 'rosaceae',
          children: [
            {
              node: 'prunus',
              children: [
                {
                  node: 'cherry',
                  ingredients: [
                    { name: 'Cherry Juice' },
                    { name: 'Tart Cherry Juice' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      node: 'tea',
      children: [
        // START BLACK TEA
        {
          node: 'black',
          children: [
            {
              node: 'premade',
              ingredients: [
                {
                  name: 'Brewed Black Tea',
                },
                {
                  name: 'Brewed Black Sweet Tea',
                },
              ],
              children: [
                {
                  node: 'fruit',
                  ingredients: [
                    {
                      name: 'Sweet Peach Tea',
                      contains: ['Rosaceae', 'Prunus', 'Peach'],
                    },
                    {
                      name: 'Peach Tea',
                      contains: ['Rosaceae', 'Prunus', 'Peach'],
                    },
                  ],
                },
              ],
            },
            {
              node: 'leaf',
              ingredients: ['Black Tea Leaves'],
              children: [
                {
                  node: 'blend',
                  ingredients: [
                    {
                      name: 'Lipton Yellow Label',
                      archetypeOf: 'Black Tea Leaves',
                    },
                    {
                      name: 'English Breakfast',
                    },
                    {
                      name: 'Irish Breakfast',
                    },
                    {
                      name: 'Earl Grey',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const loneStarPantry = {
  fruits,
  drinks,
  grains,
  cookingFats,
  saucesAndCondiments,
}
