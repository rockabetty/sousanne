const ShoppingListTemplate = function (family) {
  const dailyCupsOfFruit = {
    feminine: {
      TODDLER: [0.5, 0.5, 1, 1],
      'YOUNG CHILD': [1, 1, 1.5, 1.5],
      CHILD: [1, 1, 1.5, 2],
      'PRE-TEEN': [1.5, 1.5, 1.75, 2],
      TEENAGER: [1.5, 1.5, 1.75, 2],
      'YOUNG ADULT': [1.5, 1.5, 1.75, 2],
      ADULT: [1.5, 1.5, 1.75, 2],
      SENIOR: [1.5, 1.5, 1.75, 2],
    },
    masculine: {
      TODDLER: [0.5, 0.5, 1, 1],
      'YOUNG CHILD': [1, 1, 1.5, 1.5],
      CHILD: [1, 1, 1.5, 2],
      'PRE-TEEN': [1.5, 1.5, 1.75, 2],
      TEENAGER: [1.5, 1.5, 1.75, 2],
      'YOUNG ADULT': [2, 2, 2.25, 2.5],
      ADULT: [2, 2, 2.25, 2.5],
      SENIOR: [2, 2, 2, 2],
    },
  }

  const dailyCupsOfVegetables = {
    feminine: {
      TODDLER: [0.66, 0.66, 1, 1],
      'YOUNG CHILD': [1, 1, 1.5, 1.5],
      CHILD: [1.5, 1.5, 2, 2.5],
      'PRE-TEEN': [1.5, 2, 2.5, 3],
      TEENAGER: [2.5, 2.5, 2.75, 3],
      'YOUNG ADULT': [2.5, 2.5, 2.75, 3],
      ADULT: [2, 2.5, 2.75, 3],
      SENIOR: [2, 2.5, 2.75, 3],
    },
    masculine: {
      TODDLER: [0.66, 0.66, 1, 1],
      'YOUNG CHILD': [1, 1, 1.5, 1.5],
      CHILD: [1.5, 1.5, 2, 2.5],
      'PRE-TEEN': [2, 2.5, 2.75, 3.5],
      TEENAGER: [2.5, 3, 3.5, 4],
      'YOUNG ADULT': [3, 3.25, 3.5, 4],
      ADULT: [3, 3.25, 3.5, 4],
      SENIOR: [2.5, 2.75, 3, 3.5],
    },
  }

  const dailyOuncesOfProtein = {
    feminine: {
      TODDLER: 2,
      'YOUNG CHILD': 4,
      CHILD: 5.5,
      'PRE-TEEN': 6,
      TEENAGER: 6.5,
      'YOUNG ADULT': 6.5,
      ADULT: 6,
      SENIOR: 6,
    },
    masculine: {
      TODDLER: 2,
      'YOUNG CHILD': 4,
      CHILD: 5.5,
      'PRE-TEEN': 6.5,
      TEENAGER: 7,
      'YOUNG ADULT': 7,
      ADULT: 7,
      SENIOR: 6.5,
    },
  }

  const dailyOuncesOfGrains = {
    feminine: {
      TODDLER: 2,
      'YOUNG CHILD': 3.5,
      CHILD: 5,
      'PRE-TEEN': 6,
      TEENAGER: 7,
      'YOUNG ADULT': 7,
      ADULT: 6,
      SENIOR: 6,
    },
    masculine: {
      TODDLER: 2,
      'YOUNG CHILD': 3.5,
      CHILD: 5,
      'PRE-TEEN': 6,
      TEENAGER: 8,
      'YOUNG ADULT': 9,
      ADULT: 8,
      SENIOR: 7,
    },
  }

  const dailyCupsOfCalciumSc = {
    TODDLER: 1,
    'YOUNG CHILD': 1,
    CHILD: 1.5,
    'PRE-TEEN': 1.75,
    TEENAGER: 2,
    ADULT: 2,
    SENIOR: 2,
  }

  const getBodySizeMultiplier = function (member) {
    const weightRanges = {
      masculine: {
        TODDLER: { small: 0, average: 25, large: 30 },
        'YOUNG CHILD': { small: 25, average: 35, large: 45 },
        CHILD: { small: 35, average: 50, large: 65 },
        'PRE-TEEN': { small: 65, average: 85, large: 105 },
        TEENAGER: { small: 105, average: 140, large: 170 },
        'YOUNG ADULT': { small: 135, average: 175, large: 215 },
        ADULT: { small: 145, average: 185, large: 225 },
        SENIOR: { small: 140, average: 175, large: 210 },
      },
      feminine: {
        TODDLER: { small: 0, average: 24, large: 28 },
        'YOUNG CHILD': { small: 25, average: 33, large: 40 },
        CHILD: { small: 33, average: 45, large: 60 },
        'PRE-TEEN': { small: 60, average: 80, large: 100 },
        TEENAGER: { small: 95, average: 125, large: 155 },
        'YOUNG ADULT': { small: 115, average: 145, large: 185 },
        ADULT: { small: 120, average: 155, large: 195 },
        SENIOR: { small: 115, average: 150, large: 190 },
      },
    }
    const thresholds = weightRanges[member.gender][member.ageRange]

    if (member.weight < thresholds.average) {
      return 0.85
    } else if (member.weight > thresholds.large) {
      return 1.15
    } else {
      return 1.0
    }
  }

  const calculateProteinNeed = function (member) {
    const baseline = dailyOuncesOfProtein[member.gender][member.ageRange]
    const activityMultiplier = activityLevels[member.activityLevel].multiplier
    const BodySizeMultiplier = getBodySizeMultiplier(member)

    return (baseline * activityMultiplier * BodySizeMultiplier).toFixed(1)
  }

  const calculateGrainsNeed = function (member) {
    const baseline = dailyOuncesOfGrains[member.gender][member.ageRange]
    const activityMultiplier = activityLevels[member.activityLevel].multiplier
    const BodySizeMultiplier = getBodySizeMultiplier(member)
    return (baseline * BodySizeMultiplier).toFixed(1)
  }

  const calculateCalciumNeed = function (member) {
    return dailyCupsOfCalciumSc[member.ageRange]
  }

  const calculateFruitNeed = function (member) {
    return dailyCupsOfFruit[member.gender][member.ageRange][
      member.activityLevel
    ]
  }

  const calculateVegetableNeed = function (member) {
    const BodySizeMultiplier = getBodySizeMultiplier(member)
    const veggieBrackets = dailyCupsOfVegetables[member.gender][member.ageRange]
    const baseAmount = veggieBrackets[member.activityLevel]
    return (baseAmount * BodySizeMultiplier).toFixed(1)
  }

  return (
    <table>
      <caption>Rough Shopping List Estimate</caption>
      <thead>
        <tr>
          <th scope="col">Person</th>
          <th scope="col">Fruits</th>
          <th scope="col">Grains</th>
          <th scope="col">Protein Sources</th>
          <th scope="col">Calcium Sources</th>
          <th scope="col">Vegetables</th>
        </tr>
      </thead>
      <tbody>
        {family.map((member, idx) => {
          return (
            <tr>
              <th scope="row">{member.name}</th>
              <td>{calculateFruitNeed(member)} cups</td>
              <td>{calculateGrainsNeed(member)} ounces</td>
              <td>{calculateProteinNeed(member)} ounces</td>
              <td>{calculateCalciumNeed(member)} cups</td>
              <td>{calculateVegetableNeed(member)} cups</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
