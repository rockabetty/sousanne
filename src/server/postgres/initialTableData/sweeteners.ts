const SweetenersTableData = {
  node: 'sweeteners',
  children: [
    { node: 'honey' },
    { path: 'syrup' },
    {
      node: 'sugar',
      ingredients: [
        {
          name: 'Sugar',
          children: [
            { node: 'unrefined' },
            {
              node: 'refined',
              children: [
                {
                  node: 'white',
                  ingredients: [
                    { name: 'White Granulated Sugar', archetypeOf: 'Sugar' },
                  ],
                },
                {
                  node: 'brown',
                  ingredients: [{ name: 'Brown Granulated Sugar' }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

//     honey: {
//       'Raw Honey': {
//         variants: ['Raw Honey'],
//       },
//       Honey: {
//         variants: ['Honey'],
//       },
//     },
//     syrups: {
//       cane_sugar: {
//         'Simple Syrup': {
//           variants: ['Simple Syrup'],
//         },
//       },
//     },
//     sugars: {
//       unrefined_cane_sugar: {
//         Muscovado: {
//           variants: ['Muscovado'],
//         },
//         Piloncillo: {
//           variants: [{ node: 'Piloncillo', alii: ['Jaggery', 'Gur'] }],
//         },
//         'Raw Sugar': {
//           variants: ['Turbinado Sugar'],
//         },
//       },
//       refined_cane_sugar: {
//         'Pearl Sugar': {
//           variants: ['Pearl Sugar'],
//         },
//         'Granulated Sugar': {
//           variants: ['White Cane Sugar', 'Brown Sugar'],
//         },
//         'Powdered Sugar': {
//           variants: ['Powdered Sugar'],
//         },
//       },
//       'Coconut Sugar': {
//         variants: ['Coconut Sugar'],
//       },
//     },
//   },
// }

export default SweetenersTableData
