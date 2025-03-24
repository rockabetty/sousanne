import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Recipe: NextPage<RecipeProps> = ({ recipe }) => {
  const router = useRouter();
  const {slug} = router.query

  const [loading, setLoading] = useState<boolean>(true)

  const [recipeData, setRecipeData] = useState()

  useEffect(() => {
    if (slug) {
      axios.get(`/api/recipe/${slug}`)
      .then((response) => {
        const {data} = response
        console.log(data)
        setRecipeData(data)
        setLoading(false)
      })
    }
  },
  [slug]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{recipeData.name}</h1>
      <h2>Ingredients</h2>
      <p>Serves {recipeData.base_serving_size}</p>
      <ul>
      {recipeData.ingredients?.map((ingredient) => {
        return <li key={`recipe-ingredient-${ingredient.id}`}>{ingredient.amount} {ingredient.unit !== 'Whole' ? `${ingredient.unit} of` : null } {ingredient.name}</li>
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