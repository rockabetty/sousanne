import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Recipe: NextPage<RecipeProps> = ({ recipe }) => {
  const router = useRouter();
  const {slug} = router.query

  const [loading, setLoading] = useState<boolean>(true)
  const [loadingSecondaries, setLoadingSecondaries] = useState<boolean>(true)
  const [recipeData, setRecipeData] = useState()
  const [canMakeNow, setCanMakeNow] = useState<boolean>(true)

  const deductFromPantry = async function() {
    let update = { action: "consume", itemList: [] }
    for (let ingredient of recipeData.ingredients) {
        update.itemList.push({
          id: ingredient.id,
          unit: ingredient.unit,
          amount: 0 - ingredient.amount
        })
    }
    await axios.put(`/api/pantries/1`, update)
  }

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipeResponse = await axios.get(`/api/recipe/${slug}`)
        let {data} = recipeResponse
        setRecipeData(data)
        setLoading(false)

        const updatedIngredients = [...data.ingredients]
      
        for (let i = 0; i < updatedIngredients.length; i++) {
          const amount = updatedIngredients[i].amount;
          const optionResponse = await axios.get(`/api/ingredients/${updatedIngredients[i].id}/options`, {params: {pantry: 1, seasonal: true, amount }})
          if (optionResponse.data.length > 0) {
            updatedIngredients[i].inPantry = true
            updatedIngredients[i].options = optionResponse.data
          } else {
            const {data} = await axios.get(`/api/pantries/1/${updatedIngredients[i].id}`)
            updatedIngredients[i].inPantry = !!data
          }
          if (updatedIngredients[i].inPantry == false) {
            setCanMakeNow(false)
          }
        }
        
        setRecipeData(prevData => ({
          ...prevData,
          ingredients: updatedIngredients
        }))

        setLoadingSecondaries(false)
        
      } catch (error) {
        console.error(error)
      }
    }

    if (slug) {
      getRecipe()
    }
  },
  [slug]);

  if (loading) {
    return <div>Loading...</div>
  }

  const OptionSelector = function ({defaultValue, options}) {
    if (options.length == 1) {
      return <span>{options[0].name}</span>
    }

    return (
      <select>
        {options?.map((option, idx) => <option key={`option-${idx}`}>{option.name}</option>)}
      </select>
    )
  }

  return (
    <div>
      <h1>{recipeData.name}</h1>
      <h2>Ingredients</h2>
      {!loadingSecondaries && !!canMakeNow ? <p>You have everything to make this!</p>: null}
      <p>Serves {recipeData.base_serving_size}</p>
      <ul>
      {recipeData.ingredients?.map((ingredient) => {
        return (
            <li key={`recipe-ingredient-${ingredient.id}`}>
              {ingredient.amount} {ingredient.unit !== 'self' ? `${ingredient.unit} of ` : null }
              {!loadingSecondaries && ingredient.options ? <OptionSelector options={ingredient.options} /> : ingredient.name}
              {!loadingSecondaries && !ingredient.inPantry ? <span>(not in pantry)</span> : null}
            </li>
          )
      })}

      </ul>
      <h2>Instructions</h2>
      <ol>
      {recipeData.instructions?.map((instruction, idx) => {
        return <li key ={`recipe-instruction-${idx}`} >{instruction}</li>
      })}
      </ol>

      <button type="button" onClick={deductFromPantry}>I cooked this</button>
    </div>
  )
};

export default Recipe;