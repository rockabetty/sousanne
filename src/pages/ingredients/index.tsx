import { useEffect, useState } from 'react';
import axios from 'axios';

const IngredientList = () => {
    const [error, setError] = useState<string>("")
        
    useEffect(() => {
        axios.get('/api/ingredients')
        .then((data) => {
            console.log(data)
        }).catch((error) => {

        })
    }, [])

    return (
        <>
        <h1>Ingredients</h1>
        </>
    )
}

export default IngredientList