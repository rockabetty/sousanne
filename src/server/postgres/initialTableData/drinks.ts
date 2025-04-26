// const variants = {
//   tea: [
//     { node: 'Loose-Leaf $' },
//     { node: '$ Tea Bag' },
//     { node: 'Compressed $' },
//     { node: 'Instant $' },
//     { node: 'Pre-Made, Sweetened $' },
//     { node: 'Pre-Made, Plain $' },
//   ],
//   soda: [
//     {
//       node: 'Zero-Sugar $',
//     },
//     { node: 'Regular $' },
//     { node: 'Diet $' },
//   ],
// }

// export const drinkIngredients = {
//   node: 'drink',
//   children: [
//     {
//       node: 'alcoholic',
//       children: [
//         {
//           node: 'spirit',
//         },
//         {
//           node: 'beer_cider',
//           children: [
//             {
//               node: 'ale',
//               children: [
//                 { node: 'wheat_ale' },
//                 { node: 'india_pale_ale' },
//                 { node: 'blonde_ale' },
//                 { node: 'belgian_ale' },
//                 { node: 'stout' },
//                 { node: 'amber_or_red_ale' },
//                 { node: 'pale_ale' },
//                 { node: 'sour' },
//                 { node: 'porter' },
//                 { node: 'kolsch' },
//                 { node: 'brown_ale' },
//                 { node: 'saison' },
//               ],
//             },
//             { node: 'lager' },
//             { node: 'cider' },
//           ],
//         },
//         {
//           node: 'wine',
//           children: [
//             {
//               node: 'red',
//               children: [
//                 { node: 'cabernet_suavignon' },
//                 { node: 'pinot_noir' },
//                 { node: 'zinfandel' },
//                 { node: 'sangiovese' },
//                 { node: 'merlot' },
//                 { node: 'red_blend' },
//                 { node: 'syrah' },
//                 { node: 'malbec' },
//                 { node: 'bordeaux_blend' },
//                 { node: 'tempranillo' },
//                 { node: 'barbera' },
//                 { node: 'grenache' },
//               ],
//             },
//             {
//               node: 'white',
//               children: [
//                 { node: 'chardonnay' },
//                 { node: 'suavignon_blanc' },
//                 { node: 'pinot_grigio' },
//                 { node: 'chenin_blanc' },
//                 { node: 'viognier' },
//                 { node: 'vinho_verde' },
//                 { node: 'white_blend' },
//                 { node: 'riesling' },
//                 { node: 'muscat' },
//               ],
//             },

//             {
//               node: 'sparkling',
//               children: [
//                 { node: 'champagne_style' },
//                 { node: 'prosecco_style' },
//                 { node: 'cava_style' },
//               ],
//             },
//             {
//               node: 'rose',
//               ingredients: [{ name: 'Rosé' }],
//               children: [
//                 {
//                   node: 'sparkling_rose',
//                   ingredients: [{ name: 'Sparkling Rosé' }],
//                 },
//                 {
//                   node: 'white_zinfandel',
//                   ingredients: [{ name: 'White Zinfandel' }],
//                 },
//               ],
//             },
//             { node: 'rice_wine' },
//             { node: 'dessert_wine', children: [{ node: 'port' }] },
//             { node: 'fruit_wine' },
//           ],
//         },
//         {
//           node: 'mixer',
//         },
//       ],
//     },
//     {
//       node: 'boozeless_spirits',
//       children: [{ node: 'beer' }, { node: 'wine' }],
//     },
//     {
//       node: 'seltzer',
//       children: [
//         {
//           node: 'fruit',
//           children: [
//             {
//               node: 'citrus',
//               children: [
//                 {
//                   node: 'orange',
//                   children: [
//                     {
//                       node: 'alcoholic',
//                       ingredients: [
//                         {
//                           name: 'Hard Orange Seltzer',
//                           brands: ['Smirnoff'],
//                         },
//                       ],
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               node: 'raspberry',
//               children: [
//                 {
//                   node: 'alcoholic',
//                   ingredients: [
//                     {
//                       name: 'Hard Raspberry Selzter',
//                       brands: ['Smirnoff'],
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               node: 'tamarind',
//               children: [
//                 {
//                   node: 'alcoholic',
//                   ingredients: [
//                     { name: 'Hard Tamarind Seltzer', brands: ['Smirnoff'] },
//                   ],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       node: 'soda',
//       children: [
//         {
//           node: 'pepper',
//           ingredients: [
//             {
//               name: 'Pepper Soda',
//               brands: [
//                 'Dr Pepper',
//                 'Pibb Xtra',
//                 'Dublin Original',
//                 'Dr Thunder',
//               ],
//             },
//           ],
//         },
//         {
//           node: 'cola',
//           children: [
//             {
//               node: 'plain',
//               ingredients: [
//                 {
//                   name: 'Cola',
//                   brands: ['Coca-Cola', 'Pepsi', 'RC', 'Jarritos'],
//                 },
//               ],
//             },
//             {
//               node: 'flavored',
//               ingredients: [
//                 { name: 'Cherry Cola', brands: ['Pepsi'], contains: 'Cherry' },
//                 {
//                   node: 'Vanilla Cola',
//                   brands: ['Coca-Cola'],
//                   contains: 'Vanilla',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           node: 'fruit',
//           ingredients: [
//             { name: 'Fruit Punch Soda', brands: ['Jarritos', 'Crush'] },
//           ],

//           children: [
//             {
//               node: 'tamarind',
//               ingredients: [{ name: 'Tamarind Soda', brands: ['Jarritos'] }],
//             },
//             {
//               node: 'peach',
//               ingredients: [
//                 {
//                   name: 'Peach Soda',
//                   brands: ['Mizuho', 'Heytea', 'Coca-Cola'],
//                 },
//               ],
//             },
//             {
//               node: 'lychee',
//               ingredients: [{ name: 'Lychee Soda', brands: ['Mizuho'] }],
//             },
//             {
//               node: 'citrus',
//               ingredients: [
//                 {
//                   name: 'Citrus Soda',
//                   brands: ['Mountain Dew', 'Mountain Lightning', 'Fresca'],
//                 },
//               ],
//               ingredients: [
//                 {
//                   name: 'Yuzu Soda',
//                   brands: ['Hatakosen'],
//                 },
//               ],
//               children: [
//                 {
//                   node: 'Lime',
//                   ingredients: [
//                     { name: 'Baja Lime Soda', brands: ['Mountain Dew'] },
//                     {
//                       name: 'Cherry Lime Soda',
//                       brands: ['Sprite'],
//                       contains: 'Cherry',
//                     },
//                   ],
//                 },
//                 {
//                   node: 'lemon-lime',
//                   ingredients: [
//                     {
//                       name: 'Lemon-Lime Soda',
//                       brands: ['7-Up', 'Sprite', 'Starry', 'Mizuho'],
//                     },
//                   ],
//                 },
//                 {
//                   node: 'lemon',
//                   ingredients: [
//                     {
//                       name: 'Berry Lemonade Soda',
//                       brands: ['Sunkist'],
//                       contains: 'Berry',
//                     },
//                   ],
//                 },
//                 {
//                   node: 'orange',
//                   ingredients: [
//                     {
//                       name: 'Orange Soda',
//                       brands: [
//                         'Sunkist',
//                         'Fanta',
//                         'Jarritos',
//                         'Mizuho',
//                         'Arctic Ocean',
//                       ],
//                     },
//                     {
//                       name: 'Strawberry-Orange Soda',
//                       brands: ['Sunkist'],
//                       contains: ['Strawberry'],
//                     },
//                     {
//                       name: 'Orange-Pineapple Soda',
//                       brands: ['Sunkist'],
//                       contains: ['Pineapple'],
//                     },
//                   ],
//                 },
//                 {
//                   node: 'grapefruit',
//                   ingredients: [
//                     { name: 'Grapefruit Soda', brands: ['Squirt', 'Heytea'] },
//                   ],
//                 },
//               ],
//             },
//             {
//               node: 'melon',
//               ingredients: [
//                 { name: 'Melon Soda', brands: ['Mizuho', 'LOTTE'] },
//               ],
//             },
//             {
//               node: 'apple',
//               ingredients: [
//                 {
//                   name: 'Apple Soda',
//                   brands: ['Sidral Mundet', 'Manzanita Sol'],
//                 },
//               ],
//             },
//             {
//               node: 'pineapple',
//               ingredients: [
//                 { name: 'Pineapple Soda', brands: ['Fanta', 'Jarritos'] },
//               ],
//             },
//             {
//               node: 'grape',
//               ingredients: [
//                 { name: 'Grape Soda', brands: ['Fanta', 'Shirakiku'] },
//               ],
//             },
//             {
//               node: 'strawberry',
//               ingredients: [
//                 { name: 'Strawberry Soda', brands: ['Fanta', 'Mizuho'] },
//               ],
//             },
//             {
//               node: 'raspberry',
//               ingredients: [{ name: 'Rasberry Soda' }],
//             },
//           ],
//         },
//         {
//           node: 'ginger_ale',
//           ingredients: [
//             { name: 'Ginger Ale', brands: ['Canada Dry', "Seagram's"] },
//           ],
//         },
//         {
//           node: 'root_beer',
//           ingredients: [{ name: 'Root Beer', brands: ['A&W', "Barq's"] }],
//         },
//         {
//           node: 'cream_soda',
//           ingredients: [
//             {
//               name: 'Cream Soda',
//               brands: ['Great Value', 'LOTTE Milkis'],
//             },
//             {
//               name: 'Grape Cream Soda',
//               contains: ['Grape'],
//               brands: ['LOTTE Milkis'],
//             },
//             {
//               name: 'Peach Cream Soda',
//               contains: ['Peach'],
//               brands: ['LOTTE Milkis'],
//             },

//             {
//               name: 'Apple Cream Soda',
//               contains: ['Apple'],
//               brands: ['LOTTE Milkis'],
//             },
//             {
//               name: 'Strawberry Cream Soda',
//               contains: ['Strawberry'],
//               brands: ['Dr Pepper', 'LOTTE Milkis'],
//             },
//             {
//               name: 'Elderberry Cream Soda',
//               contains: ['Elderberry'],
//               brands: ['Shonen'],
//             },
//             {
//               name: 'Orange Cream Soda',
//               contains: ['Orange'],
//               brands: ['Shonen'],
//             },
//             {
//               name: 'Banana Cream Soda',
//               contains: ['Banana'],
//               brands: ['Shonen'],
//             },
//           ],
//         },
//         {
//           node: 'champagne_soda',
//         },
//       ],
//     },
//     {
//       node: 'probiotic',
//       children: [
//         { node: 'kombucha' },
//         { node: 'dairy_based' },
//         { node: 'fruit_based' },
//       ],
//     },
//     {
//       node: 'water',
//       children: [
//         {
//           node: 'still',
//           children: [{ node: 'unflavored' }, { node: 'flavored' }],
//         },
//         {
//           node: 'sparkling',
//           children: [{ node: 'unflavored' }, { node: 'flavored' }],
//         },
//       ],
//     },
//     { node: 'juice', children: [{ node: 'fruit' }, { node: 'vegetable' }] },
//     {
//       node: 'punch',
//       children: [
//         { node: 'compote_aguafresca' },
//         { node: 'fruitade' },
//         { node: 'flavored_water' },
//       ],
//     },
//     {
//       node: 'tea',
//       children: [
//         { node: 'white' },
//         { node: 'yellow' },
//         { node: 'green' },
//         // START BLACK TEA
//         {
//           node: 'black',
//           children: [
//             {
//               node: 'blend',
//               ingredients: [
//                 {
//                   name: 'Lipton Yellow Label',
//                 },
//                 {
//                   name: 'English Breakfast',
//                 },
//                 {
//                   name: 'Irish Breakfast',
//                 },
//                 {
//                   name: 'Earl Grey',
//                 },
//               ],
//             },
//             {
//               node: 'chinese',
//               ingredients: [
//                 { name: 'Congou', variants: variants.tea },
//                 { name: 'Lapsang Souchong', variants: variants.tea },
//                 { name: 'Keemun', variants: variants.tea },
//                 { name: 'Dianhong', variants: variants.tea },
//                 { name: 'Yingdehong', variants: variants.tea },
//                 { name: 'Jiu Qu Hong Mei', variants: variants.tea },
//               ],
//             },
//             {
//               node: 'taiwanese',
//               ingredients: [
//                 {
//                   name: 'Jinxuan',
//                   alii: ['Taicha No. 12'],
//                 },
//                 {
//                   name: 'Rudy Black Tea',
//                   alii: ['Taicha No. 18'],
//                 },
//                 {
//                   name: 'Sun Moon Lake',
//                 },
//               ],
//             },
//             {
//               node: 'indian',
//               ingredients: [
//                 { name: 'Assam' },
//                 { name: 'Darjeeling' },
//                 { name: 'Kangra' },
//                 { name: 'Munnar' },
//                 { name: 'Nilgiri' },
//               ],
//             },
//           ],
//         },
//         // END BLACK TEA
//       ],
//     },
//   ],
// }
