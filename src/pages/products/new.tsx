import {useState} from 'react'
import { Form, TextInput, Radio, Checkbox, DropdownSelect, FieldGroup } from 'el-cuc-ui';
import IngredientSearchBar from '@components/ingredients/IngredientSearchBar';

const NewProductPage = () => {
	const defaults = {
		name: "",
		ingredient_id: "",
		packageType: "single",
		packageCount: undefined,
		packageAmount: undefined,
		unitType: "solid",
		unitName: "oz",
		price: 0.00
	}

	const [productData, setProductData] = useState(defaults)
	const [isLoading, setIsLoading] = useState(false);
	const [ingredientQuery, setIngredientQuery] = useState<string>("")

	const handleSelectIngredient = (event) => {
		console.log("onselect is running!")
		console.log(event.target)
		const {value} = event.target;
		console.log("I found " + value)
		setProductData({ ...productData, ingredient_id: value })
	}

	const togglePackaged = () => {
		const packaged = !productData.packaged
		setProductData({...productData, packaged })
	}

	const handleIngredientSearch = (event) => {
		const {value} = event.target
		setIngredientQuery(value)
	}

	const handleGeneralInput = (event) => {
		const {name, value} = event.target;
		const update = {...productData}
		update[name] =  value
		setProductData(update)
	}

	const unitNames = [
		{ labelText: "Ounce", value: "oz" },
		{ labelText: "Fluid ounce", value: "fl-oz" },
		{ labelText: "Gram", value: "g" },
		{ labelText: "Kilogram", value: "kg" },
		{ labelText: "Pound", value: "lb" },
		{ labelText: "Gallon", value: "gal" },
		{ labelText: "Liter", value: "l" },
		{ labelText: "Milliliter", value: "ml" },
		{ labelText: "Pint", value: "pt" },
		{ labelText: "Quart", value: "qt" }
	]

	return (
		<Form
			submitLabel="Save"
		>

		<IngredientSearchBar
		  selection={productData.ingredient_id}
		  onSelect={handleSelectIngredient}
		/>


		<Radio
		  onChange = {handleGeneralInput}
		  id="package_type_singleton"
		  name="packageType"
		  checked={productData?.packageType == "single"}
		  labelText = "Single, packaged item"
		  value="single"
		/>

		<Radio
		  onChange = {handleGeneralInput}
		  id="package_type_multipack"
		  name="packageType"
		  checked={productData?.packageType == "multiple"}
		  labelText = "Multi-pack"
		  value="multiple"
		/> 

		<Radio
		  onChange = {handleGeneralInput}
		  id="package_type_by_weight"
		  name="packageType"
		  checked={productData?.packageType == "weight"}
		  labelText = "Bulk item"
		  value="weight"
		/>

		<Radio
		  onChange = {handleGeneralInput}
		  id="package_type_apiece"
		  name="packageType"
		  checked={productData?.packageType == "apiece"}
		  labelText = "By item count"
		  value="apiece"
		/>
		<FieldGroup inline={true}>
		{productData.packageType != "apiece"
		? (<>
			{
			productData.packageType != "weight"
			? (<>
				{
				 	productData.packageType == "multiple"
				 	? (
						  <TextInput
						  	type="number"
						    labelText="Amount"
						    id="product_packaging_quantity"
						    value={productData?.packageCount}
						    onChange={handleGeneralInput}
						    name="packageCount"
						    placeholderText="3"
						    size="xs"
						  />
						)
				 	: null
				}

				<TextInput
				  type="number"
				  labelText="Size"
				  id="product_item_quantity"
				  value={productData?.packageAmount}
				  onChange={handleGeneralInput}
				  name="packageAmount"
				  placeholderText="5"
				  size="sm"
				/>
			</>)
			: null
		}
			<DropdownSelect
				name="unitName"
				id="unit_name_selector"
			    labelText="Unit"
				value={productData?.unitName}
				options={unitNames}
				onChange={handleGeneralInput}
				size="md"
			/>
		</>)
		: null
		}
		</FieldGroup>	

		<TextInput
		  labelText="Price"
		  id="product_price"
		  name="price"
		  type="number"
		  min={0}
		  value={productData.price}
		  size="sm"
		/>	
		
		</Form>
	)
}

/*
TODO: 
next, make a dropdown select that fetches available stores, so you can correspond prices to one or more stores.
And allow for store creation if not found.
*/

export default NewProductPage