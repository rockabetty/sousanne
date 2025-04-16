import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'el-cuc-ui';
const IngredientList = () => {
    const [error, setError] = useState<string>("")
    const [ingredients, setIngredients] = useState([])
        
    useEffect(() => {
        axios.get('/api/ingredients')
        .then((response) => {
            setIngredients(response.data)
        }).catch((error) => {

        })
    }, [])

    return (
        <>
        <h1>Ingredients</h1>
        <ul>
        {ingredients.map((ingredient) => {
            return (
                <li key={`ingredient_id_${ingredient.id}`}>
                  <Link href={`/ingredient/${ingredient.id}`}>{ingredient.name}</Link>
                </li>
            )
        })}
        </ul>
        </>
    )
}

export default IngredientList