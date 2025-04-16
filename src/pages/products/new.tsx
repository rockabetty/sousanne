import {useState, useEffect} from 'react'
import { Form, TextInput, Radio, Checkbox, DropdownSelect, FieldGroup } from 'el-cuc-ui';
import IngredientSearchBar from '@components/ingredients/IngredientSearchBar';
import { Store } from '@domains/stores/stores.types';
import axios from 'axios'

type StorePrice = {
  storeId: number;
  price: number;
}

type ProductData = {
  name?: string;
  ingredient_id?: string;
  packageType: "single" | "multiple" | "weight" | "apiece";
  packageAmount?: number;
  unitName: string;
}

const NewProductPage = () => {
  const productDefaults = {
    name: "",
    ingredient_id: "",
    packageType: "single",
    packageCount: undefined,
    packageAmount: undefined,
    unitName: "oz",
  }

  const newStoreDefaults = {
  	name: "",
  	zipcode: "",
  	street: "",
  	city: "Berkeley",
  	state: "CA",
  }

  const priceDefaults = [
    { store_id: "", price: 0.00 },
  ]

  useEffect(() => {
    axios.get(`/api/stores`)
    .then((storeList) => {
      const storeOptions = []
      console.log(storeList)
      if (storeList.data) {
        for (let store of storeList.data) {
          console.log(store)
          storeOptions.push({
            labelText: store.name,
            value: store.id
          })
        }
        storeOptions.push({
            labelText: "Add new store",
            value: -1
          })
        setStores(storeOptions)  
      }
    }).catch((error) => {
      console.error("No stores available due to error")
    })
  },[])

  const [addStore, setAddStore] = useState<boolean>(false);
  const [newStore, setNewStore] = useState({newStoreDefaults})
  const [stores, setStores] = useState<Store[]>([])
  const [productData, setProductData] = useState(productDefaults)
  const [prices, setPrices] = useState<StorePrice[]>(priceDefaults)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ingredientQuery, setIngredientQuery] = useState<string>("")

  const handleSelectIngredient = (event) => {
    const {value} = event.target;
    setProductData({ ...productData, ingredient_id: value })
  }

  const handlePriceInput = (event) => {
  	const update = [...prices]
  	const {id, value} = event.target
  	const priceIndex = id.charAt(id.length - 1)
  	update[priceIndex].price = value
  	setPrices(update)
  }

  const handleStoreSelection = (event) => {
  	const {value} = event.target;
  	if (value == -1) {
  		setAddStore(true)
  	} else {
  		setAddStore(false)
  		const update = [...prices]
  		const {id, value} = event.target
  		const priceIndex = id.charAt(id.length - 1)
  		update[priceIndex].storeId = value
  		setPrices(update)
  	}
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

  const handleNewStoreInput = (event) => {
    const {name, value} = event.target;
    const update = {...newStore}
    update[name] =  value
    setNewStore(update)
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

    {prices.map((price, idx) => {
      return (
        <FieldGroup inline={true}>
          <TextInput
            labelText="Price"
            id={`product_price_${idx}`}
            name="price"
            type="number"
            min={0}
            value={price.price}
            size="sm"
            onChange={handlePriceInput}
          />

          <DropdownSelect
            name="store"
            id={`price_store_${idx}`}
            labelText="Store"
            value={price.storeId}
            size="xl"
            options={stores}
            onChange={handleStoreSelection}
          />
        </FieldGroup>
      )
    })}

    {}

    <FieldGroup inline={true}>

	    <TextInput
	      labelText="Store name"
	      id="new-store_name"
	      name="name"
	      value={newStore.name}
	      size="lg"
	      onChange={handleNewStoreInput}
	    />

	    <TextInput
	      labelText="Street Address"
	      id="new-store_street"
	      name="street"
	      value={newStore.street}
	      size="lg"
	      onChange={handleNewStoreInput}
	    />

	    <TextInput
	      labelText="Zipcode"
	      id="new-store_zipcode"
	      name="zipcode"
	      value={newStore.zipcode}
	      size="sm"
	      onChange={handleNewStoreInput}
	    />

	</FieldGroup>

    </Form>
  )
}

/*
TODO: 
next, make a dropdown select that fetches available stores, so you can correspond prices to one or more stores.
And allow for store creation if not found.
*/

export default NewProductPage