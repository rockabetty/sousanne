import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'el-cuc-ui'
import SousanneLayout from '@components/layout/SousannePage'
const IngredientList = () => {
  const [error, setError] = useState<string>('')
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    axios
      .get('/api/ingredients')
      .then((response) => {
        setIngredients(response.data)
      })
      .catch((error) => {})
  }, [])

  return (
    <SousanneLayout>
      <h1>Ingredients</h1>
      <ul>
        {ingredients.map((ingredient) => {
          return (
            <li key={`ingredient_id_${ingredient.id}`}>
              <Link href={`/ingredients/${ingredient.id}`}>
                {ingredient.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </SousanneLayout>
  )
}

export default IngredientList
