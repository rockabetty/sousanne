// 5 strobs in 1 cup
// I chopped it, it's 3/4 cup.

const ingredientHierarchy = {
  paths: {
    /*
         Buckwheat (for soba)
         Dried egg noodles
         Spaetzle noodles
         Panko breadcrumbs
         Regular breadcrumbs
         Dried chilies (ancho, guajillo, árbol, etc.)
         Dried mushrooms (see detailed section below)
      */

    produce: {
      starches: {
        potatoes_yams: {
          potatoes: {
            Potato: { variants: ['Russet Potato'] },
          },
          sweet_or_yam: {
            'Sweet Potatoes': {
              variants: ['Sweet Potato'],
            },
            Yams: {
              variants: [
                'Yam',
                { name: 'White Yam', alii: ['Ghana Yam', 'African Yam'] },
                { name: 'Purple Yam', alii: ['Ube'] },
                { name: 'Chinese Yam', alii: ['Cinnamon Vine'] },
              ],
            },
          },
        },
      },
      vegetables: {
        amaryllidaceae: {
          allium: {
            Onion: {
              cup_weight: 6.3,
              variants: [
                'Yellow Onion',
                'White Onion',
                'Vidalia Onion',
                'Pearl Onion',
                { name: 'Scallion', alii: ['Green Onion'] },
                { name: 'Shallot', cup_weight: 7 },
              ],
            },
            Garlic: { variants: ['Garlic'] },
            Leek: { variants: ['Leek'] },
          },
        },
        brassicaceae: {
          eutrema: {
            Horseradish: { variants: ['Wasabi', 'Horseradish'] },
          },
          brassica: {
            Cabbage: {
              variants: ['Green Cabbage', 'Red Cabbage', 'Napa Cabbage'],
            },
          },
        },
        zingiberaceae: {
          zingiber: {
            Ginger: { variants: ['Ginger'] },
          },
        },
        apiaceae: {
          daucus: {
            Carrot: { cup_weight: 3.8, variants: ['Carrot'] },
            apium: {
              cup_weight: 4.2,
              Celery: { variants: ['Celery'] },
            },
          },
        },
        solanaceae: {
          capsicum: {
            'Sweet Pepper': {
              cup_weight: 6.3,
              variants: [
                'Green Bell Pepper',
                'Yellow Bell Pepper',
                'Red Bell Pepper',
                'Orange Bell Pepper',
              ],
            },
            'Hot Pepper': {
              Mild: { variants: ['Jalapeño Pepper', 'Poblano Pepper'] },
            },
          },
          solanum: {
            Tomato: {
              cup_weight: 6.3,
              variants: [
                'Roma Tomato',
                'Cherry Tomato',
                'Canned Tomato',
                'Sun-dried Tomatoes',
              ],
            },
          },

          physalis: {
            Tomatillo: { variants: ['Tomatillo'] },
          },
        },
        seaweed: {
          sargassaceae: {
            sargassum: {
              Seaweed: { variants: ['Hijiki'] },
            },
          },
          phaeophyceae: {
            laminariaceae: {
              Kombu: { variants: ['Kombu'] },
            },
          },
          alariaceae: {
            undaria: {
              Wakame: { variants: ['Wakame'] },
            },
          },
          bangiaceae: {
            pyropia: {
              Nori: { variants: ['Nori'] },
            },
          },
        },
        fabaceae: {
          vicia: {
            'Soft Lentils': {
              variants: ['Red Lentils', 'Yellow Lentils'],
            },
            'Firm Lentils': {
              variants: [
                'Black Lentils',
                'Brown Lentils',
                'French Lentils',
                'Green Lentils',
                'Puy Lentils',
              ],
            },
            'Petite Lentils': {
              variants: [
                'Crimson Lentils',
                'Golden Lentils',
                'Green Petite Lentils',
              ],
            },
          },
          vigna: {
            'Asian Beans': {
              variants: [
                'Adzuki Beans',
                'Mung Beans',
                { name: 'Black Gram Beans', alii: ['Urad Beans'] },
              ],
            },
            Cowpeas: {
              variants: ['Black-eyed Peas'],
            },
          },
          phaseolus: {
            Beans: {
              variants: [
                'Anasazi Beans',
                'Appaloosa Beans',
                'Black Turtle Beans',
                'Bolita Beans',
                {
                  name: 'Calypso Beans',
                  alii: ['Panda Beans', 'Yin Yang Beans'],
                },
                'Cranberry Beans',
                'Dragon Tongue Beans',
                'Flageolet Beans',
                'Great Northern Beans',
                { name: 'Kidney Beans', alii: ['Red Beans'] },
                "Jacob's Cattle Beans",
                'Mocha With Cherry Beans',
                'North Holland Brown Beans',
                'Pea Beans',
                { name: 'Pink Beans', alii: ['Habichuelas Rosadas'] },
                'Pinto Beans',
                'Polish Eagle Beans',
                'Rattlesnake Beans',
                'Chinese Yellow Beans',
                "Tiger's Eye Beans",
                { name: 'Navy Beans', alii: ['White Beans'] },
                {
                  name: 'Yellow Beans',
                  variants: [
                    'Sinaloa Azufraddo Beans',
                    'Mayacoba Beans',
                    'Peruano Beans',
                  ],
                },
                { name: 'Yellow Eye Beans', alii: ['Maine Yellow Eye Beans'] },
                'Lima Beans',
                { name: 'Edamame', alii: ['Soy Beans'] },
                'Fava Beans',
              ],
            },
          },
        },
      },
      fruits: {
        rutaceae: {
          citrus: {
            //"Lime" in the array refer to Persian Limes.
            Lime: { variants: ['Lime', 'Key Lime'] },
            //"Lemon" in the array is a Lisbon Lemon.
            Lemon: { variants: ['Lemon', 'Meyer Lemon'] },
            Sudachi: { variants: ['Sudachi'] },
          },
        },
        rosaceae: {
          prunus: {
            Plum: { variants: ['Plum'] },
          },
        },
      },
    },

    protein_sources: {
      meat_alternatives: {
        soy: {
          tofu: { variants: ['Firm Tofu', 'Soft Tofu'] },
          tempeh: { variants: ['Tempeh'] },
        },
      },

      dairy: {
        'Sour Cream': { variants: ['Sour Cream'] },
        Kefir: { variants: ['Kefir'] },
        Buttermilk: { variants: ['Buttermilk'] },
        'Heavy Cream': { variants: ['Heavy Cream'] },
        cheeses: {
          fresh_and_creamy: {
            soft_fresh: {
              variants: [
                'Ricotta',
                'Mascarpone',
                'Cottage Cheese',
                'Quark',
                'Queso Fresco',
                'Unaged Cotija',
                'Queso Blanco',
              ],
            },
            moist_melty: {
              variants: [
                'Mozzarella',
                'Burrata',
                'Stracciatella',
                'Halloumi',
                'Oaxaca',
                'Asadero',
              ],
            },
            spreadable: {
              variants: [
                'Cream Cheese',
                'Neufchâtel',
                'Boursin',
                'Fromage Blanc',
              ],
            },
          },
          soft_and_rind_ripened: {
            bloomy_rind: {
              variants: [
                'Brie',
                'Camembert',
                'Triple Cream Cheese',
                'Coulommiers',
              ],
            },
            washed_rind: {
              variants: [
                'Muenster (French)',
                'Taleggio',
                'Limburger',
                'Epoisses',
              ],
            },
          },
          semi_soft_and_meltable: {
            buttery_melters: {
              variants: [
                'Havarti',
                'Fontina',
                'Monterey Jack',
                'Muenster (American)',
              ],
            },
            stinky_and_pungent: {
              variants: [
                'Reblochon',
                'Raclette',
                'Morbier',
                'Munster (Alsatian)',
              ],
            },
          },
          semi_firm_and_sliceable: {
            mild_and_nutty: {
              variants: [
                'Gouda',
                'Edam',
                'Emmentaler',
                'Jarlsberg',
                'Swiss',
                'Butterkäse',
              ],
            },
            sharp_and_tangy: {
              variants: ['Cheddar', 'Colby', 'Provolone', 'Cantal'],
            },
          },
          hard_aged_and_grating: {
            dry_and_savory: {
              variants: [
                { name: 'Parmigiano Reggiano', alii: ['Parmesan'] },
                'Grana Padano',
                'Pecorino Romano',
                'Asiago',
              ],
            },
            crumbly_and_salting: {
              variants: ['Cotija (Aged)', 'Feta', 'Blue Stilton', 'Gorgonzola'],
            },
          },
          bold_and_funky: {
            blue_veined: {
              variants: ['Roquefort', 'Gorgonzola', 'Danish Blue', 'Cambozola'],
            },
            smoked_and_intense: {
              variants: [
                'Smoked Gouda',
                'Smoked Cheddar',
                'Scamorza Affumicata',
              ],
            },
          },
        },
      },
    },

    drinks: {
      fruit_juices: {
        citrus: {
          Lime: { variants: ['Lime Juice'] },
          Lemon: { variants: ['Lemon Juice'] },
          Orange: { variants: ['Orange Juice'] },
          Calamansi: { variants: ['Calamansi Juice'] },
          Yuzu: { variants: ['Yuzu Juice'] },
        },
      },
    },

    pickled_foods: {
      produce: {
        cucurbitaceae: {
          cucumis: {
            Cucumber: ['Dill Pickle', 'Bread & Butter Pickle'],
          },
        },
        rosaceae: {
          prunus: {
            Plum: ['Umeboshi'],
          },
        },
      },
      brassicaceae: {
        brassica: {
          Cabbage: { variants: ['Sauerkraut'] },
        },
      },
    },
  },

  fats_and_oils: {
    cooking_fats: {
      low_smoke_point: { variants: ['Bacon Fat', 'Butter'] },
      medium_smoke_point: {
        variants: ['Lard', 'Schmaltz', 'Duck Fat', 'Beef Tallow'],
      },
      high_smoke_point: {
        variants: ['Ghee'],
      },
    },
    cooking_oils: {
      low_smoke_point: { variants: ['Sesame Oil'] },
      medium_smoke_point: {
        variants: ['Peanut Oil', 'Vegetable Shortening'],
      },
      high_smoke_point: ['Safflower Oil', 'Grapeseed Oil'],
    },
    dressing_oils: {
      nut_oils: { variants: ['Walnut Oil', 'Hazelnut Oil', 'Macadamia Oil'] },
      seed_oils: {
        variants: ['Flaxseed Oil', 'Pumpkin Seed Oil', 'Hemp Seed Oil'],
      },
      infused_oils: {
        chili_oils: { variants: ['Chili Garlic Oil'] },
      },
    },
  },

  sauces_and_condiments: {
    vinegars: {
      mild_and_sweet: {
        variants: [
          'Rice Vinegar',
          'White Balsamic Vinegar',
          'Champagne Vinegar',
          'Coconut Vinegar',
        ],
      },
      rich_and_sweet: {
        variants: [
          'Balsamic Vinegar',
          'Aged Balsamic',
          'Mirin',
          'Sherry Vinegar',
        ],
      },
      bright_and_fruity: {
        variants: [
          'Apple Cider Vinegar',
          'White Wine Vinegar',
          'Red Wine Vinegar',
        ],
      },
      strong_and_pungent: {
        variants: ['Distilled White Vinegar', 'Malt Vinegar', 'Spirit Vinegar'],
      },
      umami_bomb: { variants: ['Chinese Black Vinegar'] },
    },
    sauces: {
      hot_sauces: {
        vinegar_forward: {
          variants: [
            'Tabasco',
            'Crystal',
            "Frank's RedHot",
            'Louisiana Hot Sauce',
          ],
        },
        chile_forward: {
          variants: ['Cholula', 'Valentina', 'Tapatio', 'Texas Pete'],
        },
        fruity_and_tropical: {
          variants: [
            'Sriracha',
            'Gochujang',
            'Sweet Chili Sauce',
            'Mango Habanero Sauce',
          ],
        },
        smoky_and_complex: {
          variants: ['Chipotle Hot Sauce', 'Adobo Sauce', 'Harissa'],
        },
        extra_hot: {
          variants: [
            'Ghost Pepper Sauce',
            'Carolina Reaper Sauce',
            'Habanero Sauce',
          ],
        },
        fermented: { variants: ['Gochujang', 'Sriracha', 'Sambal Oelek'] },
        umami_bomb: ['Worcestershire Sauce', 'Fish Sauce', 'Ponzu Sauce'],
      },
    },
    condiments: {
      sweet_and_tangy: {
        variants: ['Ketchup'],
      },
      sharp_and_kicking: {
        mustards: {
          Mustard: { variants: ['Yellow Mustard'] },
        },
        'Horseradish Sauce': {
          variants: ['Horseradish Sauce'],
        },
      },
    },
  },

  functional_ingredients: {
    thickeners: {
      vegan: {
        variants: [
          'Filé Powder',
          'Arrowroot',
          'Potato Starch',
          'Corn Starch',
          'Tapioca Starch',
        ],
      },
      vegetarian: { variants: ['Egg Yolk', 'Egg Whites'] },
      non_vegetarian: { variants: ["Pig's Blood", "Duck's Blood"] },
    },
    emulsifiers: {
      vegetarian: ['Egg Yolk'],
    },
  },

  flavor: {
    extracts: {
      vanilla: {
        variants: ['Vanilla Extract', 'Mexican Vanilla Extract'],
      },
    },
    herbs_and_spices: {
      sweet_and_floral: {
        vanillas: {
          variants: ['Vanilla Bean', 'Vanilla Powder', 'Vanilla Paste'],
        },
      },
      saltiness: {
        salts: {
          variants: ['Table Salt', 'Kosher Salt', 'Sea Salt'],
        },
        sodiums: {
          variants: ['Monosodium Glutamate'],
        },
        substitutes: { variants: ['Potassium Chloride'] },
      },
      peppers_and_heat: {
        peppercorns: {
          variants: ['Black Pepper', 'White Pepper', 'Sansho Pepper'],
        },
        spicy: {
          variants: ['Cayenne Pepper', 'Togarashi'],
        },
      },
      paprikas: {
        variants: ['Paprika', 'Smoked Paprika', 'Sweet Paprika', 'Hot Paprika'],
      },
      earthy_pungent: {
        nutty: {
          variants: [
            'Poppy Seeds',
            'Nutmeg',
            'Mace',
            'Cumin Seed',
            'Ground Cumin',
          ],
        },
        sweet: {
          variants: [
            'Cinnamon',
            'Whole Cloves',
            'Ground Cloves',
            'Allspice',
            'Anise Seed',
          ],
        },
        musky_aromatics: {
          variants: ['Coriander', 'Cardamom'],
        },
      },
      herbal_greens: {
        grassy_floral_notes: {
          variants: [
            'Thyme',
            'Rosemary',
            'Lavender',
            'Bay Leaf',
            'Dill Leaf',
            'Saffron',
          ],
        },
        sweet_anise_notes: {
          variants: [
            'Chervil',
            'Tarragon',
            'Shiso Leaf',
            'Caraway Seeds',
            'Dill Seed',
            'Fennel Seed',
            'Thai Basil',
            'Star Anise',
          ],
        },
        minty_and_peppery: {
          cup_weight: 0.5,
          average_weight: 2,
          variants: ['French Parsley', 'Minari', 'Basil'],
        },
        bright_and_citrusy: {
          variants: [
            'Cilantro',
            'Mexican Oregano',
            'Italian Parsley',
            'Mitsuba',
            'Lemon Thyme',
          ],
        },
        earthy_minty: {
          variants: ['Oregano', 'Marjoram'],
        },
      },
    },
  },
  spice_blends: {
    earthy_aromatic: {
      variants: ['Chili Powder'],
    },
    hot_n_spicy: {
      variants: ['Shichimi Togarashi'],
    },
  },
}

/*



Canned & Jarred Goods

Canned tomatoes
Canned green chilies
Chipotles in adobo
Enchilada sauce
Canned beans (various types)
Corn
Coconut milk
Seafood stock base
Chicken stock base
Beef stock base
Sauerkraut
Pickles (various types)
Olives

Condiments & Sauces

Soy sauce (shoyu)
Fish sauce
Mirin
Sake (for cooking)
Miso paste (white, red, mixed)
Honey
Maple syrup
Molasses
Piloncillo (Mexican brown sugar cone)
Shrimp paste
Salsa (various types)
Guacamole
Mexican crema
Kewpie mayonnaise
Regular mayonnaise
Mustard (various styles)
Horseradish sauce
Paprika paste
Ajvar (roasted red pepper spread)
Dill sauce
Goma dare (sesame sauce)
Tonkatsu sauce
Teriyaki sauce
Remoulade sauce
Cajun seasoning blend
Hot sauce (various regional styles)
BBQ sauce

Baking Supplies

Granulated sugar
Brown sugar
Powdered sugar
Baking powder
Baking soda
Active dry yeast
Cocoa powder
Chocolate (various types including Mexican chocolate)
Sweetened condensed milk
Evaporated milk
Nuts (walnuts, pecans, almonds, hazelnuts)
Marzipan/almond paste
Anko (sweet red bean paste)
Matcha powder
Agar-agar
Vanilla extract
Almond extract
Rum (for baking)

Dried Fruits & Mushrooms

Raisins
Dried apricots
Dried plums/prunes
Dried apples
Dried cherries
Dried pears
Dried figs
Dried cranberries
Dried mangoes
Tamarind (dried pods or paste)
Dried persimmon (hoshigaki)
Dried yuzu peel
Dried shiitake mushrooms
Dried porcini mushrooms
Dried morels
Dried chanterelles
Dried matsutake mushrooms
Dried maitake mushrooms
Dried enoki mushrooms
Dried cloud ear mushrooms
Mixed forest mushrooms

Cured Meats

Chorizo
Cecina (salt-cured beef)
Machaca (dried shredded beef)
Longaniza
Speck
Bacon
Krakowska (Polish sausage)
Kielbasa/klobása (various types)
Landjaeger
Hungarian salami
Black Forest ham
Andouille sausage
Tasso ham
Boudin
Chaurice (Creole hot sausage)
Country ham
Salt pork

Snack Ingredients

Corn tortillas
Flour tortillas
Avocados
Pumpkin seeds (pepitas)
Jicama
Chicharrones (fried pork rinds)
Cracklins
Furikake (rice seasoning)
Katsuobushi (bonito flakes)
Aonori (powdered seaweed)
Kinako (roasted soybean flour)
Nori sheets
Puffed rice
Dried squid
Rice crackers (senbei)
Wasabi peas
Edamame
Roasted soy beans (irimame)

Beverage Ingredients

Black tea
Green tea (various grades)
Hojicha (roasted green tea)
Genmaicha (green tea with roasted rice)
Mugicha (barley tea)
Hibiscus flowers (for jamaica)
Rice (for horchata)
Tamarind
Mexican chocolate tablets
Cinnamon sticks
Coffee (with chicory for Cajun)
Whiskey/bourbon
Rum
Tequila
Mezcal
Sake
Shochu
Vodka
Brandy
Absinthe
Wine (red, white)
Beer

Seasonal Produce Worth Mentioning

Watermelon
Berries
Peaches
Cucumbers
Apples
Pears
Cranberries
Blood oranges
Pomegranates
Chayote
Sweet potatoes
Dark leafy greens (collards, kale, spinach, etc.)
Okra
Chiles (various fresh types)

This consolidated list covers the essential ingredie
*/
