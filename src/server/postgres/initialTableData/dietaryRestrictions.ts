export const UserFacingDietaryRestrictions = {
  lifestyle: [
    {
      name: 'Vegetarian',
      shortdesc:
        "For people who don't eat anything resulting from the death of an animal.  Pescetarians should click this option, then check 'include fish'.",
      description:
        'No meat or animal parts like bones and fat. Dairy, eggs, and alliums (e.g. onions) are included by default. Some vegetarians exclude alliums for cultural reasons.',
      optionalExcludes: ['Eggs', 'Dairy', 'Alliums'],
      optionalIncludes: ['Fish'],
    },
    {
      name: 'Vegan',
      shortdesc: 'For people on a strictly plant-based diet.',
      description:
        'Excludes any animal product whatsoever: no meat, no dairy, no eggs, no honey, and so on.',
      optionalIncludes: ['Honey'],
    },
    {
      name: 'Halal Diet',
      shortdesc: 'For following Islamic dietary law.',
      description:
        "No alcohol, blood, or pork. This app can't verify halal meat certification. If you don't have  access to halal meat, check 'Vegetarian' instead!",
      optionalExcludes: ['Shellfish'],
    },
    {
      name: 'Kosher Diet',
      shortdesc: 'For following Jewish dietary law.',
      description:
        'No pork or shellfish. No dairy with meat (dairy with fish is permitted by default).',
      note: 'This setting filters out common non-kosher ingredients, but does not verify full kosher certification or religious slaughter methods.',
      optionalExcludes: ['Dairy with Fish'],
    },
    {
      name: 'Jain Diet',
      shortdesc: 'For following Jain spirituality.',
      description:
        'No meat, no eggs, honey, root vegetables, alliums (e.g. onions, garlic), alcohol, or fermented foods.',
      note: 'This setting affects recipe suggestions only, as we cannot verify all individual sourcing practices.',
      optionalExcludes: ['Dairy'],
    },
  ],
  health: [
    {
      name: 'Low Glycemic',
      shortdesc: 'Eliminates foods that cause blood sugar spikes.',
      description:
        'Cuts out most high-glycemic foods by excluding sugar, starchy vegetables (e.g. potatoes), refined carbs (e.g. bread, pasta), fruit, alcohol, and dairy (due to lactose).',
    },
    {
      name: 'Gluten Free',
      shortdesc: 'For people with celiac disease or gluten sensitivity.',
      description:
        'Eliminates gluten, a protein found in wheat, barley, rye, and their derivatives.',
    },
    {
      name: 'Low-Sodium',
      shortdesc: 'To help people with certain heart-health concerns.',
      description:
        'Eliminates high-sodium foods like soy sauce, canned soups, and processed meats.',
    },
    {
      name: 'Low FODMAP Diet (Elimination Phase)',
      shortdesc:
        'A diet for people with IBS and other serious digestion issues. This setting excludes all major FODMAP groups to help you during the elimination phase. You can manually reintroduce foods over time in your settings.',
      description:
        "No wheat or rye, but not 'no gluten'. No sweeteners.  No beer, cider, sweet wines, or liqueurs. No apples, pears, watermelon, stone fruits (e.g. peaches), and dried fruit.  No alliums (e.g. onions), cauliflower, asparagus, mushrooms, broccoli, or snow peas. No legumes.",
      optionalExcludes: ['Dairy'],
      restrictionPaths: [
        'grains.flours.gluten.wheat',
        'grains.flours.gluten.rye',
        'sweeteners',
        'rosaceae.prunus',
        'rosaceae.malus',
      ],
    },
    {
      name: 'Pregnancy Safe',
      shortdesc:
        "We all know you shouldn't drink while pregnant, but there are other restrictions, too!",
      description:
        "No alcohol, no high-mercury fish, no soft cheeses, no raw eggs, no raw fish, no deli, and sometimes no fun, but we won\'t excldude the last one.",
    },
    {
      name: 'Anti-Inflammatory',
      shortdesc:
        'A diet for people with health concerns, eliminating foods known to trigger inflammation.',
      description:
        'No high-sugar or high-sodium items (e.g. no cookies, no soy sauce). No red meat, no processed meats (e.g. smoked or cured).  No heavily processed snacks (e.g. doritos). No refined grains (whole grains are okay).',
    },
  ],
}

export const userFacingAllergyList = [
  'Dairy',
  'Egg',
  'Peanut',
  'Soy',
  'Wheat',
  'Tree Nut',
  'Shellfish',
  'Fish',
  'Sesame',
  'Celery',
  'Mustard',
  'Sulphites',
]
