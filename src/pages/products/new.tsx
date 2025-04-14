import {useState} from 'react'
import { Form, TextInput, Radio, Checkbox, DropdownSelect, FieldGroup } from 'el-cuc-ui';


const NewProductPage = () => {
	const defaults = {
		name: "",
		packageType: "single",
		packageCount: undefined,
		packageAmount: undefined,
		unitType: "solid",
		unitName: "oz",
		price: 0.00
	}

	const [productData, setProductData] = useState(defaults)

	const togglePackaged = () => {
		const packaged = !productData.packaged
		setProductData({...productData, packaged })
	}

	const handleGeneralInput = (event) => {
		const {name, value} = event.target;
		const update = {...productData}
		update[name] =  value
		setProductData(update)
	}

	const unitNames = {
		"solid": [
			{ labelText: "Gram", value: "g" },
			{ labelText: "Kilogram", value: "kg" },
			{ labelText: "Ounce", value: "oz" },
			{ labelText: "Pound", value: "lb" }
			
		],
		"liquid": [
			{ labelText: "Fluid ounce", value: "fl-oz" },
			{ labelText: "Gallon", value: "gal" },
			{ labelText: "Liter", value: "l" },
			{ labelText: "Milliliter", value: "ml" },
			{ labelText: "Pint", value: "pt" },
			{ labelText: "Quart", value: "qt" }
		],
		"size": [
			{ labelText: "Foot", value: "ft"},
			{ labelText: "Meter", value: "m"},
			{ labelText: "Square foot", value: "sq-ft"},
			{ labelText: "Square meter", value: "sq-m"}
		],
	}

	return (
		<Form
			submitLabel="Save"
		>

		<TextInput
		  type="text"
		  id="product_name"
		  value={productData.name}
		  placeholderText="can of tuna"
		  labelText="Ingredient"
		  onChange={handleGeneralInput}
		  size="lg"
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

		<TextInput
		  labelText="Price"
		  id="product_price"
		  name="price"
		  type="number"
		  min={0}
		  value={productData.price}
		  size="sm"
		/>

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
				options={unitNames[productData.unitType]}
				onChange={handleGeneralInput}
				size="md"
			/>
		</>)
		: null
		}
		</FieldGroup>		
		<Radio
			  onChange = {handleGeneralInput}
			  id="unit_type_solid"
			  name="unitType"
			  checked={productData?.unitType == "solid"}
			  labelText = "By weight"
			  value="solid"
			/>
			<Radio
			  onChange = {handleGeneralInput}
			  id="unit_type_liquid"
			  name="unitType"
			  checked={productData?.unitType == "liquid"}
			  labelText = "By volume"
			  value="liquid"
			/>
			<Radio
			  onChange = {handleGeneralInput}
			  id="unit_type_size"
			  name="unitType"
			  checked={productData?.unitType == "size"}
			  labelText = "By size"
			  value="size"
			/>
		</Form>
	)
}

export default NewProductPage

/*
CREATE TABLE IF NOT EXISTS product_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ingredient_id INT REFERENCES ingredients(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- ounces, pounds, grams, millilitres, etc.
    unit_id INT REFERENCES units(id),
    -- for comparison purposes, the smallest amount this product can be divided into
    base_quantity INT DEFAULT 1,
    -- when false, the item is sold by the unit (e.g. per pound)
    packaged_item BOOLEAN default FALSE,
    -- the number of packages in the product.  The 4-pack of tuna cans would be '4', a half gallon of whole milk would be '1'
    package_count INT,
    -- the quantity of each package for displaying to the user; 4-pack of tuna cans would be '5', half gallon of milk would be '64' (ounces)
    display_quantity INT
);
*/