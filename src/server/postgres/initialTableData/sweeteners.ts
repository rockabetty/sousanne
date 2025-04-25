const SweetenersTableData = {
  sweeteners: {
    honey: {
      'Raw Honey': {
        variants: ['Raw Honey'],
      },
      Honey: {
        variants: ['Honey'],
      },
    },
    syrups: {
      cane_sugar: {
        'Simple Syrup': {
          variants: ['Simple Syrup'],
        },
      },
    },
    sugars: {
      unrefined_cane_sugar: {
        Muscovado: {
          variants: ['Muscovado'],
        },
        Piloncillo: {
          variants: [{ name: 'Piloncillo', alii: ['Jaggery', 'Gur'] }],
        },
        'Raw Sugar': {
          variants: ['Turbinado Sugar'],
        },
      },
      refined_cane_sugar: {
        'Pearl Sugar': {
          variants: ['Pearl Sugar'],
        },
        'Granulated Sugar': {
          variants: ['White Cane Sugar', 'Brown Sugar'],
        },
        'Powdered Sugar': {
          variants: ['Powdered Sugar'],
        },
      },
      'Coconut Sugar': {
        variants: ['Coconut Sugar'],
      },
    },
  },
}

export default SweetenersTableData
