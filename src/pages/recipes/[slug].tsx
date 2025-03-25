import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Recipe: NextPage<RecipeProps> = ({ recipe }) => {
  const router = useRouter();
  const {slug} = router.query

  const [loading, setLoading] = useState<boolean>(true)

  const [recipeData, setRecipeData] = useState()

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipeResponse = await axios.get(`/api/recipe/${slug}`)
        let {data} = recipeResponse
        setRecipeData(data)
        setLoading(false)

        const updatedIngredients = [...data.ingredients]
      
        for (let i = 0; i < updatedIngredients.length; i++) {
          const optionResponse = await axios.get(`/api/ingredients/${updatedIngredients[i].id}/options`, {params: {pantry: true, seasonal: true}})
          if (optionResponse.data.length > 0) {
            updatedIngredients[i].options = optionResponse.data
          }
        }
        
        setRecipeData(prevData => ({
          ...prevData,
          ingredients: updatedIngredients
        }))
        
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
      <p>Serves {recipeData.base_serving_size}</p>
      <ul>
      {recipeData.ingredients?.map((ingredient) => {
        return (
            <li key={`recipe-ingredient-${ingredient.id}`}>
              {ingredient.amount} {ingredient.unit !== 'Whole' ? `${ingredient.unit} of ` : null }
              {ingredient.options ? <OptionSelector options={ingredient.options} /> : ingredient.name}
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
    </div>
  )
};

export default Recipe;