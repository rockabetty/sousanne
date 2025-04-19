import { useState, useEffect } from 'react'
import { Form, Button } from 'el-cuc-ui'
import IngredientSearchBar from '@components/ingredients/IngredientSearchBar'
import ProductPackagingForm from '@components/products/ProductPackagingForm'
import PricesForm from '@components/prices/PricesForm'
import axios from 'axios'
import { Store, StorePrice } from '@components/stores/stores.types'
import { ProductData } from '@components/products/products.types'
import SousanneLayout from '@components/layout/SousannePage'
const NewProductPage = () => {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    ingredient_id: '',
    packageType: 'single',
    packageCount: undefined,
    packageAmount: undefined,
    unitName: 'oz',
    organic: false,
  })

  const [brands, setBrands] = useState<Brand[]>([])
  const [stores, setStores] = useState<Store[]>([])
  const [prices, setPrices] = useState<StorePrice[]>([
    { storeId: '', price: 0.0, currencyId: 1 },
  ])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ingredientQuery, setIngredientQuery] = useState<string>('')

  useEffect(() => {
    fetchStores()
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/api/brands')
      if (response.data) {
        const brandOptions = response.data.map((brand) => ({
          labelText: brand.name,
          value: brand.id,
        }))

        brandOptions.push({
          labelText: 'Add new brand',
          value: -1,
        })
        setBrands(brandOptions)
      }
    } catch (error) {
      console.error('No brands found due to error', error)
    }
  }

  const fetchStores = async () => {
    try {
      const response = await axios.get('/api/stores')
      if (response.data) {
        const storeOptions = response.data.map((store) => ({
          labelText: store.name,
          value: store.id,
        }))

        // Add option to create a new store
        storeOptions.push({
          labelText: 'Add new store',
          value: -1,
        })

        setStores(storeOptions)
      }
    } catch (error) {
      console.error('No stores available due to error', error)
    }
  }

  const handleSelectIngredient = (event) => {
    const { value } = event.target
    setProductData({ ...productData, ingredient_id: value })
  }

  const handleIngredientSearch = (event) => {
    const { value } = event.target
    setIngredientQuery(value)
  }

  const handleSubmit = async (event) => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/products/new', {
        product: productData,
        prices: prices,
      })
      setIsLoading(false)
      if (response.data) {
        console.log('successss')
      }
    } catch (error) {
      console.error('Issue submitting...')
    }
  }

  return (
    <SousanneLayout>
      <Form submitLabel="Save" onSubmit={handleSubmit}>
        <IngredientSearchBar
          selection={productData.ingredient_id}
          onSelect={handleSelectIngredient}
        />

        <ProductPackagingForm
          productData={productData}
          setProductData={setProductData}
        />

        <PricesForm
          prices={prices}
          setPrices={setPrices}
          stores={stores}
          brands={brands}
          setStores={setStores}
          fetchStores={fetchStores}
          fetchBrands={fetchBrands}
        />

        <Button
          inline="true"
          id="submit-product"
          type="submit"
          disabled={isLoading}
          Loading={isLoading}
        >
          Save
        </Button>
      </Form>
    </SousanneLayout>
  )
}

export default NewProductPage
