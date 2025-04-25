const variants = {
  tea: [
    { name: 'Loose-Leaf $' },
    { name: '$ Tea Bag' },
    { name: 'Compressed $' },
    { name: 'Instant $' },
    { name: 'Pre-Made, Sweetened $' },
    { name: 'Pre-Made, Plain $' },
  ],
  soda: [
    {
      name: 'Zero-Sugar $',
    },
    { name: 'Regular $' },
    { name: 'Diet $' },
  ],
}

export const drinkIngredients = {
  name: 'drink',
  children: [
    {
      name: 'soda',
      children: [
        {
          name: 'pepper',
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
          name: 'cola',
          children: [
            {
              name: 'plain',
              ingredients: [
                {
                  name: 'Cola',
                  brands: ['Coca-Cola', 'Pepsi', 'RC', 'Jarritos'],
                },
              ],
            },
            {
              name: 'flavored',
              ingredients: [
                { name: 'Cherry Cola', brands: ['Pepsi'], contains: 'Cherry' },
                {
                  name: 'Vanilla Cola',
                  brands: ['Coca-Cola'],
                  contains: 'Vanilla',
                },
              ],
            },
          ],
        },
        {
          name: 'fruit',
          ingredients: [
            { name: 'Fruit Punch Soda', brands: ['Jarritos', 'Crush'] },
          ],
          children: [
            {
              name: 'tamarind',
              ingredients: [{ name: 'Tamarind Soda', brands: ['Jarritos'] }],
            },
            {
              name: 'peach',
              ingredients: [
                {
                  name: 'Peach Soda',
                  brands: ['Mizuho', 'Heytea', 'Coca-Cola'],
                },
              ],
            },
            {
              name: 'lychee',
              ingredients: [{ name: 'Lychee Soda', brands: ['Mizuho'] }],
            },
            {
              name: 'citrus',
              ingredients: [
                {
                  name: 'Citrus Soda',
                  brands: ['Mountain Dew', 'Mountain Lightning', 'Fresca'],
                },
              ],
              ingredients: [
                {
                  name: 'Yuzu Soda',
                  brands: ['Hatakosen'],
                },
              ],
              children: [
                {
                  name: 'Lime',
                  ingredients: [
                    { name: 'Baja Lime Soda', brands: ['Mountain Dew'] },
                    {
                      name: 'Cherry Lime Soda',
                      brands: ['Sprite'],
                      contains: 'Cherry',
                    },
                  ],
                },
                {
                  name: 'lemon-lime',
                  ingredients: [
                    {
                      name: 'Lemon-Lime Soda',
                      brands: ['7-Up', 'Sprite', 'Starry', 'Mizuho'],
                    },
                  ],
                },
                {
                  name: 'lemon',
                  ingredients: [
                    {
                      name: 'Berry Lemonade Soda',
                      brands: ['Sunkist'],
                      contains: 'Berry',
                    },
                  ],
                },
                {
                  name: 'orange',
                  ingredients: [
                    {
                      name: 'Orange Soda',
                      brands: [
                        'Sunkist',
                        'Fanta',
                        'Jarritos',
                        'Mizuho',
                        'Arctic Ocean',
                      ],
                    },
                    {
                      name: 'Strawberry-Orange Soda',
                      brands: ['Sunkist'],
                      contains: ['Strawberry'],
                    },
                    {
                      name: 'Orange-Pineapple Soda',
                      brands: ['Sunkist'],
                      contains: ['Pineapple'],
                    },
                  ],
                },
                {
                  name: 'grapefruit',
                  ingredients: [
                    { name: 'Grapefruit Soda', brands: ['Squirt', 'Heytea'] },
                  ],
                },
              ],
            },
            {
              name: 'melon',
              ingredients: [
                { name: 'Melon Soda', brands: ['Mizuho', 'LOTTE'] },
              ],
            },
            {
              name: 'apple',
              ingredients: [
                {
                  name: 'Apple Soda',
                  brands: ['Sidral Mundet', 'Manzanita Sol'],
                },
              ],
            },
            {
              name: 'pineapple',
              ingredients: [
                { name: 'Pineapple Soda', brands: ['Fanta', 'Jarritos'] },
              ],
            },
            {
              name: 'grape',
              ingredients: [
                { name: 'Grape Soda', brands: ['Fanta', 'Shirakiku'] },
              ],
            },
            {
              name: 'strawberry',
              ingredients: [
                { name: 'Strawberry Soda', brands: ['Fanta', 'Mizuho'] },
              ],
            },
          ],
        },
        {
          name: 'ginger_ale',
          ingredients: [
            { name: 'Ginger Ale', brands: ['Canada Dry', "Seagram's"] },
          ],
        },
        {
          name: 'root_beer',
          ingredients: [{ name: 'Root Beer', brands: ['A&W', "Barq's"] }],
        },
        {
          name: 'cream_soda',
          ingredients: [
            {
              name: 'Cream Soda',
              brands: ['Great Value', 'LOTTE Milkis'],
            },
            {
              name: 'Grape Cream Soda',
              contains: ['Grape'],
              brands: ['LOTTE Milkis'],
            },
            {
              name: 'Peach Cream Soda',
              contains: ['Peach'],
              brands: ['LOTTE Milkis'],
            },

            {
              name: 'Apple Cream Soda',
              contains: ['Apple'],
              brands: ['LOTTE Milkis'],
            },
            {
              name: 'Strawberry Cream Soda',
              contains: ['Strawberry'],
              brands: ['Dr Pepper', 'LOTTE Milkis'],
            },
            {
              name: 'Elderberry Cream Soda',
              contains: ['Elderberry'],
              brands: ['Shonen'],
            },
            {
              name: 'Orange Cream Soda',
              contains: ['Orange'],
              brands: ['Shonen'],
            },
            {
              name: 'Banana Cream Soda',
              contains: ['Banana'],
              brands: ['Shonen'],
            },
          ],
        },
        {
          name: 'champagne_soda',
        },
      ],
    },
    {
      name: 'probiotic',
      children: [
        { name: 'kombucha' },
        { name: 'dairy_based' },
        { name: 'fruit_based' },
      ],
    },
    {
      name: 'water',
      children: [
        {
          name: 'still',
          children: [{ name: 'unflavored' }, { name: 'flavored' }],
        },
        {
          name: 'sparkling',
          children: [{ name: 'unflavored' }, { name: 'flavored' }],
        },
      ],
    },
    { name: 'juice', children: [{ name: 'fruit' }, { name: 'vegetable' }] },
    {
      name: 'punch',
      children: [
        { name: 'compote_aguafresca' },
        { name: 'fruitade' },
        { name: 'flavored_water' },
      ],
    },
    {
      name: 'tea',
      children: [
        { name: 'white' },
        { name: 'yellow' },
        { name: 'green' },
        // START BLACK TEA
        {
          name: 'black',
          children: [
            {
              name: 'blend',
              ingredients: [
                {
                  name: 'Lipton Yellow Label',
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
            {
              name: 'chinese',
              ingredients: [
                { name: 'Congou', variants: variants.tea },
                { name: 'Lapsang Souchong', variants: variants.tea },
                { name: 'Keemun', variants: variants.tea },
                { name: 'Dianhong', variants: variants.tea },
                { name: 'Yingdehong', variants: variants.tea },
                { name: 'Jiu Qu Hong Mei', variants: variants.tea },
              ],
            },
            {
              name: 'taiwanese',
              ingredients: [
                {
                  name: 'Jinxuan',
                  alii: ['Taicha No. 12'],
                },
                {
                  name: 'Rudy Black Tea',
                  alii: ['Taicha No. 18'],
                },
                {
                  name: 'Sun Moon Lake',
                },
              ],
            },
            {
              name: 'indian',
              ingredients: [
                { name: 'Assam' },
                { name: 'Darjeeling' },
                { name: 'Kangra' },
                { name: 'Munnar' },
                { name: 'Nilgiri' },
              ],
            },
          ],
        },
        // END BLACK TEA
      ],
    },
  ],
}
