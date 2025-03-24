import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Recipe: NextPage<RecipeProps> = ({ recipe }) => {
  const router = useRouter();
  const {slug} = router.query

  const [recipeData, setRecipeData] = useState()

  useEffect(() => {
    if (slug) {
      axios.get(`/api/recipe/${slug}`)
      .then((data) => {
        console.log(data)
      })
    }
  },
  [slug]);
  return (
    <div>
      <h1>Recipe {slug}</h1>
    </div>
  )
};

export default Recipe;