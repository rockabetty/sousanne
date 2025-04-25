import SousanneLayout from '@components/layout/SousannePage'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  FieldGroup,
  TextInput,
  DropdownSelect,
  Radio,
  Accordion,
  Checkbox,
} from 'el-cuc-ui'

const UserSettings = function () {
  const timeFrames = [
    { value: 3, labelText: 'Twice a week' },
    { value: 7, labelText: 'Once a week' },
    { value: 14, labelText: 'Every other week' },
    { value: 30, labelText: 'Once a month' },
  ]

  const activityLevels = [
    {
      value: '0',
      labelText: 'Sedentary: desk job and seated hobbies.',
      multiplier: 1,
    },
    {
      value: '1',
      labelText: 'Typical: desk job, chores & active hobbies.',
      multiplier: 1.3,
    },
    {
      value: '2',
      labelText: 'Active: On feet at work or exercise 3x week.',
      multiplier: 1.6,
    },
    {
      value: '3',
      labelText: 'Very Active: Frequent intense labor/exercise.',
      multiplier: 2,
    },
  ]

  const ageRanges = [
    { value: 'TODDLER', labelText: 'Toddler (12 - 23 months)' },
    { value: 'YOUNG CHILD', labelText: 'Young Child (2 - 3 years)' },
    { value: 'CHILD', labelText: 'Child (4 - 8)' },
    { value: 'PRE-TEEN', labelText: 'Pre-teen (9 to 13)' },
    { value: 'TEENAGER', labelText: 'Teenager (14 to 18)' },
    { value: 'YOUNG ADULT', labelText: 'Young Adult (19 to 30)' },
    { value: 'ADULT', labelText: 'Adult (31 to 59)' },
    { value: 'SENIOR', labelText: 'Adult Above 60 (60+)' },
  ]

  const defaultFamily = [
    {
      name: 'Mom',
      gender: 'feminine',
      ageRange: 'ADULT',
      activityLevel: 2,
      weight: 110,
      healthSelection: [10],
    },
    {
      name: 'Dad',
      gender: 'masculine',
      ageRange: 'ADULT',
      activityLevel: 2,
      weight: 210,
      healthSelection: [],
    },
    {
      name: 'Child',
      gender: 'masculine',
      ageRange: 'CHILD',
      activityLevel: 1,
      weight: 40,
      healthSelection: [],
    },
  ]

  useEffect(() => {
    axios
      .get('/api/restrictions?category=LIFESTYLE')
      .then((response) => {
        const options = []
        for (let item of response.data) {
          options.push({
            value: item.id,
            labelText: item.name,
          })
        }
        setLifestyleOptions(options)
      })
      .catch((error) => {
        console.error('fuckin whoops')
      })

    axios
      .get('/api/restrictions?category=AVERSION')
      .then((response) => {
        setAllergyOptions(response.data)
      })
      .catch((error) => {
        console.error('fuckin whoops')
      })

    axios
      .get('/api/restrictions?category=HEALTH')
      .then((response) => {
        setHealthOptions(response.data)
      })
      .catch((error) => {
        console.error('fuckin whoops')
      })
  }, [])

  const [lifestyleSelection, setLifestyleSelection] = useState<Set<number>>(
    new Set()
  )
  const [healthSelection, setHealthSelection] = useState<number[]>([])
  const [allergySelection, setAllergySelection] = useState<number[]>([])
  const [family, setFamily] = useState(defaultFamily)
  const [lifestyleOptions, setLifestyleOptions] = useState([])
  const [allergyOptions, setAllergyOptions] = useState([])
  const [healthOptions, setHealthOptions] = useState([])

  // const handleLifestyleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selection = new Set(lifestyleSelection)
  //   const { value, id } = event.target
  //   if (selection.has(value)) {
  //     selection.delete(value)
  //   } else {
  //     selection.add(value)
  //   }
  //   setLifestyleSelection(selection)
  //   console.log(lifestyleSelection)
  // }

  const handleLifestyleSelection = (selection: Set<string>) => {
    console.log(selection)
    setLifestyleSelection(selection)
  }

  return (
    <SousanneLayout>
      <h1>Settings</h1>

      <h2>My Budget</h2>
      <FieldGroup inline={true}>
        <TextInput
          labelText="Monthly food budget"
          type="number"
          min={0}
          size="lg"
          helperText="If you don't know, try 1/4 of your monthly pay. We'll shave it down!"
        />

        <DropdownSelect
          size="xl"
          options={timeFrames}
          labelText="How often do you want to shop?"
          helperText="When we build grocery lists together, this setting influences what I recommend."
        />

        <Checkbox
          labelText="Only suggest EBT eligible ingredients"
          helperText="If you check this, we won't recommend alcohol and 'hot foods'."
          id="budget_ebt_boolean"
        />
      </FieldGroup>

      <h2>Diets And Foods To Exclude</h2>
      <p>Are there any rules that apply to the whole family?</p>
      <p>
        Selecting one or more of these diets will filter out food groups
        according to the corresponding dietary guidelines. Please note that our
        app will assume you have access to appropriately certified ingredients.
        You can eliminate ingredients manually in the next section if you need
        to (e.g. maybe you can find halal chicken but not beef).
      </p>
      <DropdownSelect
        options={lifestyleOptions}
        multiple={true}
        value={lifestyleSelection}
        onMultiChange={handleLifestyleSelection}
      />
      <Accordion title="Allergies/Intolerances">
        {/* TODO: This needs to be a dropdown select but with multiselect*/}
        <p>
          Often only one person in a household has an allergy/intolerance but
          excluding it from everyone's diet makes life and cooking much less
          stressful. Selecting any of these options will alter our
          recommendations. If we are aware that a recipe or ingredient has a
          certain allergen in it, we will remove it from your recommendations!
        </p>
        {allergyOptions.map((item, idx) => {
          return (
            <Checkbox
              key={`household-allergy-option-${item.id}`}
              labelText={item.name}
              id={`household-allergy-option-${item.id}`}
              checked={allergySelection.includes(item.id)}
              helperText={item.description ? item.description : null}
            />
          )
        })}
      </Accordion>

      <h2>My Household</h2>
      <ul>
        {family.map((member, idx) => {
          return (
            <li key={`family-member-${idx}`}>
              <FieldGroup inline={true}>
                <Radio
                  checked={member.gender == 'feminine'}
                  labelText="Feminine"
                  name={`nutritional_gender-${idx}`}
                  id={`nutritional_gender_feminine-${idx}`}
                  value="feminine"
                />
                <Radio
                  checked={member.gender == 'masculine'}
                  labelText="Masculine"
                  name={`nutritional_gender-${idx}`}
                  id={`nutritional_gender_masculine-${idx}`}
                  value="masculine"
                />

                <DropdownSelect
                  size="lg"
                  labelText="Age range"
                  options={ageRanges}
                  value={member.ageRange}
                />
                <DropdownSelect
                  size="xl"
                  labelText="Activity Levels"
                  options={activityLevels}
                  value={member.activityLevel}
                />
                <TextInput
                  labelText="Weight (pounds)"
                  size="md"
                  helperText="Doesn't have to be exact!"
                  type="number"
                  min="0"
                  value={member.weight}
                />
              </FieldGroup>

              <Accordion title="Individual Diet Concerns?">
                {healthOptions.map((item, idx) => {
                  return (
                    <Checkbox
                      key={`individual-health-option-${item.id}`}
                      labelText={item.name}
                      id={`individual-health-option-${item.id}`}
                      checked={member.healthSelection.includes(item.id)}
                      helperText={item.description ? item.description : null}
                    />
                  )
                })}
              </Accordion>
            </li>
          )
        })}
      </ul>
    </SousanneLayout>
  )
}

export default UserSettings
