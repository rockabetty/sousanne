import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

const Ingredient = () => {

  const router = useRouter();
  const {ingredient_id} = router.query;
  const [ingredient, setIngredient] = useState()
  const [loading, setLoading] = useState<boolean>(true);
  const [options, setOptions] = useState()
  const [error, setError] = useState<string>("")
  
  useEffect(() => {

    const getIngredientData = async function () {
      try {
        const ingredient = await axios.get(`/api/ingredients/${ingredient_id}`);
        setIngredient(ingredient.data)
        const options = await axios.get(`/api/ingredients/${ingredient_id}/options`);
        setOptions(options.data)
        setLoading(false)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
            setError("Something went wrong!")
        }
      }
    }

    if (!!ingredient_id) {
      getIngredientData()
    }
  },[ingredient_id])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{ingredient.name}</h1>
      <pre>{ingredient.description}</pre>
      <p>
        {!!ingredient.average_weight ? <span>They usually weigh around {parseInt(ingredient.average_weight)} ounces!</span> : null}
        {!!ingredient.cup_weight ? <span>A cup of {ingredient.name.toLowerCase()} tends to weigh {parseInt(ingredient.cup_weight)} ounces!</span> : null}
      </p>
      <h2>Shelf Life</h2>
      {!!ingredient.shelf_life_room_temp_sealed
       ? <span>{ingredient.shelf_life_room_temp_sealed} days on the shelf</span>
       : null
      }
      {options?.length > 0 
        ? (
          <>
            <h2>Different types of {ingredient.name}</h2>
            <ul>
              {options.map((option) => (
                <li key={`ingredient-option-${option.id}`}>
                  <Link href={`/ingredients/${option.id}`}>{option.name}</Link>
                </li>)
              )}
            </ul>
          </>
        ) 
        : null
      }

    </div>
  )
};

export default Ingredient;