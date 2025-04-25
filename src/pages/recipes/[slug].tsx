import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import convert from 'convert-units'
import {
  volumeSet,
  massSet,
  itemSet,
} from '@domains/pantries/core/conversionService'

const Recipe: NextPage<RecipeProps> = ({ recipe }) => {
  const router = useRouter()
  const { slug } = router.query

  const [costPerMeal, setCostPerMeal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingSecondaries, setLoadingSecondaries] = useState<boolean>(true)
  const [recipeData, setRecipeData] = useState()
  const [canMakeNow, setCanMakeNow] = useState<boolean>(true)
  const [selectedIngredients, setSelectedIngredients] = useState()
  // Water is always assumed to be on hand and is not in pantries
  const [displayOnlyIngredients, setDisplayOnlyIngredients] = useState([])

  const deductFromPantry = async function () {
    let update = { action: 'consume', itemList: [] }
    for (let ingredient of selectedIngredients.ingredients) {
      update.itemList.push({
        id: ingredient.id,
        unit: ingredient.unit,
        recipe_amount: ingredient.amount,
      })
    }
    await axios.put(`/api/pantries/1`, update)
  }

  const getRecipeIngredientCosts = async (slug: string) => {
    const pricePerUnitResponse = await axios.get(`/api/recipe/${slug}/prices`)
    let { data } = pricePerUnitResponse
    let runningTotal = 0
    if (recipeData) {
      recipeData.ingredients.map((ingredient) => {
        let { id, abbreviation, amount } = ingredient
        const pricingInfo = data[id]

        switch (abbreviation) {
          case 'clove':
            abbreviation = 'oz'
            amount = amount * 0.2 // A clove is ~0.2 ounces.
            break
          case 'dash':
            abbreviation = 'oz'
            amount = amount * 0.035
            break
          case 'drop':
            abbreviation = 'fl-oz'
            amount = amount * 0.035
            break
          case 'bread slice':
            abbreviation = 'oz'
            amount = amount * 1.33
            break
          default:
            break
        }
        if (abbreviation !== 'count') {
          amount = convert(amount).from(abbreviation).to(pricingInfo.unit)
        }
        console.log(
          `We have ${abbreviation} as ${amount} ${pricingInfo.unit} worth `
        )
        runningTotal += amount * pricingInfo.cost

        /*convert(ing.recipe_amount)
            .from(unitMap[recipeUnit])
            .to(unitMap[pantryUnit])*/
      })

      setCostPerMeal(
        Math.ceil(runningTotal) / recipeData.base_serving_size / 100
      )
    }
  }

  useEffect(() => {
    if (!!slug) {
      getRecipeIngredientCosts(slug)
    }
  }, [slug, recipeData])

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipeResponse = await axios.get(`/api/recipe/${slug}`)
        let { data } = recipeResponse
        setRecipeData(data)
        setLoading(false)

        const { ingredients } = data
        const updatedIngredients = []

        for (let i = 0; i < ingredients.length; i++) {
          if (ingredients[i].name !== 'Water') {
            let nextIngredient = ingredients[i]
            const amount = nextIngredient.amount
            const optionResponse = await axios.get(
              `/api/ingredients/${nextIngredient.id}/options`,
              { params: { pantry: 1, seasonal: true, amount } }
            )
            if (optionResponse.data.length > 0) {
              nextIngredient.inPantry = true
              nextIngredient.options = optionResponse.data
            } else {
              const { data } = await axios.get(
                `/api/pantries/1/${nextIngredient.id}`
              )
              nextIngredient.inPantry = !!data
            }
            updatedIngredients.push(nextIngredient)
            if (nextIngredient.inPantry == false) {
              setCanMakeNow(false)
            }
          } else {
            const newList = [...displayOnlyIngredients]
            newList.push(ingredients[i])
            setDisplayOnlyIngredients(newList)
          }
        }

        setSelectedIngredients(updatedIngredients)
        setLoadingSecondaries(false)
      } catch (error) {
        console.error(error)
      }
    }

    if (slug) {
      getRecipe()
    }
  }, [slug])

  if (loading) {
    return <div>Loading...</div>
  }

  const OptionSelector = function ({ defaultValue, options }) {
    if (options.length == 1) {
      return <span>{options[0].name}</span>
    }

    return (
      <select>
        {options?.map((option, idx) => (
          <option key={`option-${idx}`}>{option.name}</option>
        ))}
      </select>
    )
  }

  return (
    <div>
      <h1>{recipeData.name}</h1>
      <h2>Ingredients</h2>
      {!loadingSecondaries && !!canMakeNow ? (
        <p>You have everything to make this!</p>
      ) : null}
      <p>Serves {recipeData.base_serving_size}</p>
      <ul>
        {!loadingSecondaries &&
          displayOnlyIngredients?.map((ingredient, idx) => {
            return (
              <li key={`display-recipe-ingredient-${ingredient.id}-${idx}`}>
                {ingredient.amount}{' '}
                {ingredient.unit !== 'self' ? `${ingredient.unit} of ` : null}
                {!loadingSecondaries && ingredient.options ? (
                  <OptionSelector options={ingredient.options} />
                ) : (
                  ingredient.name
                )}
              </li>
            )
          })}
        {selectedIngredients?.map((ingredient, idx) => {
          return (
            <li key={`recipe-ingredient-${ingredient.id}-${idx}`}>
              {ingredient.amount}{' '}
              {ingredient.unit !== 'self' ? `${ingredient.unit} of ` : null}
              {!loadingSecondaries && ingredient.options ? (
                <OptionSelector options={ingredient.options} />
              ) : (
                ingredient.name
              )}
              {!loadingSecondaries && !ingredient.inPantry ? (
                <span>(not in pantry)</span>
              ) : null}
            </li>
          )
        })}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {recipeData.instructions?.map((instruction, idx) => {
          return <li key={`recipe-instruction-${idx}`}>{instruction}</li>
        })}
      </ol>
      <div>
        Average cost per meal per person: ${costPerMeal}
        <p>
          Based on the average prices of ingredients sold at stores around you.
        </p>
      </div>

      <button type="button" onClick={deductFromPantry}>
        I cooked this
      </button>
    </div>
  )
}

export default Recipe
