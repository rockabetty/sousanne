import { useEffect, useState } from 'react';
import axios from 'axios';

const NewRecipeForm = () => {

	const defaultState = {
		name: "",
		servingSize: 1,
		components: [],
		steps: [],
		ingredients: []
	}

	useEffect(() => {
		const getUnits = () => {
			const units = axios.get(`/api/units`)
		}
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

			<label htmlFor="recipe_name">Name</label>
			<input
			  type="text"
			  name="name"
			  onChange={handleInput}
			  value={recipe.name}
			/>

			<label
			  htmlFore="recipe_serving-size"
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
			     <option value="ounces">ounces</option>
			   </select>

			   <label htmlFor="igredient_x_name">Ingredient</label>
			   <input id="ingredeint_x_name" type="text" />
			  
			 </fieldset>
			<button type="submit">Save</button>	
		</form>
		)
}

export default NewRecipeForm