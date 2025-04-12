import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'el-cuc-ui';

const NewRecipeForm = () => {

  const defaultState = {
		name: "",
		servingSize: 1,
		sections: [],
		steps: [],
		ingredients: []
	}

  const [units, setUnits] = useState([])

  useEffect(() => {
    const getUnits = async () => {
      try {
        const units = await axios.get(`/api/units`)
        const {data} = units
        setUnits(data)
      } catch(error) {
        console.log(error)
      }
      
    }
    getUnits()
  },
  [])

  const [recipe, setRecipe] = useState(defaultState);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {target, value} = event;
    const {name} = target;
    const update = {...recipe}; 
    update[name] = value
    setRecipe(update)
  }

  const submitRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (  
    <form onSubmit={submitRecipe}>

			<label
			  htmlFor="recipe_serving-size"
			>
			  Serving Size
			</label>
			<input
			  min={1}
			  id="recipe_serving-size"
			  name="servingSize"
			  type="number"
			  value={recipe.servingSize}
			  onChange={handleInput}
			 />


      <label
        htmlFor="recipe_serving-size"
      >
        Serving Size
      </label>
      <input
        min={1}
        id="recipe_serving-size"
        name="servingSize"
        type="number"
        value={recipe.servingSize}
        onChange={handleInput}
       />

       <fieldset>
         <legend>Add an ingredient</legend>
         
         <label htmlFor="ingredient_x_count">Amount</label>
         <input id="ingredient_x_count" type="number" min="0" />

         <label htmlFor="ingredient_x_unit">Unit</label>
         <select id="ingredient_x_unit">
            {units.map((unit, idx) => {
            return (
              <option value="ounces">{unit.abbreviation}</option>
            )
            })}
         </select>

         <label htmlFor="igredient_x_name">Ingredient</label>
         <input id="ingredeint_x_name" type="text" />
        
       </fieldset>
      <Button type="submit">Save</Button>  
    </form>
    )
}

export default NewRecipeForm