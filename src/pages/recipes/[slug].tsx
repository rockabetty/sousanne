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
  const [selectedIngredients, setSelectedIngredients] = useState();
  // Water is always assumed to be on hand and is not in pantries
  const [displayOnlyIngredients, setDisplayOnlyIngredients] = useState([]);
  
  const deductFromPantry = async function() {
    let update = { action: "consume", itemList: [] }
    for (let ingredient of selectedIngredients.ingredients) {
        update.itemList.push({
          id: ingredient.id,
          unit: ingredient.unit,
          recipe_amount: ingredient.amount
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

        const {ingredients} = data;
        const updatedIngredients = []
      
        for (let i = 0; i < ingredients.length; i++) {
          if (ingredients[i].name !== 'Water') {
            let nextIngredient = ingredients[i];
            console.log(nextIngredient)
            const amount = nextIngredient.amount;
            const optionResponse = await axios.get(`/api/ingredients/${nextIngredient.id}/options`, {params: {pantry: 1, seasonal: true, amount }})
            if (optionResponse.data.length > 0) {
              nextIngredient.inPantry = true
              nextIngredient.options = optionResponse.data
            } else {
              const {data} = await axios.get(`/api/pantries/1/${nextIngredient.id}`)
              nextIngredient.inPantry = !!data
            }
            updatedIngredients.push(nextIngredient);
            if (nextIngredient.inPantry == false) {
              setCanMakeNow(false)
            }
          }
          else {
            const newList = [...displayOnlyIngredients];
            newList.push(ingredients[i])
            setDisplayOnlyIngredients(newList)
          }
        }
        
        setSelectedIngredients(updatedIngredients);
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
      {!loadingSecondaries && displayOnlyIngredients?.map((ingredient) => {
        return (
            <li key={`recipe-ingredient-${ingredient.id}`}>
              {ingredient.amount} {ingredient.unit !== 'self' ? `${ingredient.unit} of ` : null }
              {!loadingSecondaries && ingredient.options ? <OptionSelector options={ingredient.options} /> : ingredient.name}
            </li>
          )
      })}
      {selectedIngredients?.map((ingredient) => {
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