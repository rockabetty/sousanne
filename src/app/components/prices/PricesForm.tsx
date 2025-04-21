import React, { useState } from 'react'
import {
  TextInput,
  DropdownSelect,
  Badge,
  FieldGroup,
  Button,
  Modal,
} from 'el-cuc-ui'
import NewStoreForm from '@components/stores/NewStoreForm'
import { StorePrice, Store } from '@components/stores/stores.types'
import axios from 'axios'
import NewBrandForm from '@components/brands/NewBrandForm'
import { Brand } from '@components/brands/brands.types'

interface PricesSectionProps {
  prices: StorePrice[]
  setPrices: React.Dispatch<React.SetStateAction<StorePrice[]>>
  stores: Store[]
  brands: Brand[]
  setStores: React.Dispatch<React.SetStateAction<Store[]>>
  fetchStores: () => Promise<void>
  fetchBrands: () => Promise<void>
}

const PricesSection: React.FC<PricesSectionProps> = ({
  prices,
  setPrices,
  stores,
  brands,
  setStores,
  fetchBrands,
  fetchStores,
}) => {
  const [addBrand, setAddBrand] = useState<boolean>(false)
  const [addStore, setAddStore] = useState<boolean>(false)
  const [newBrand, setNewBrand] = useState<Brand>({
    name: '',
  })
  const [newStore, setNewStore] = useState<Store>({
    name: '',
    zipcode: '',
    street: '',
    city: 'Berkeley',
    state: 'CA',
  })

  const toggleAddNewBrand = () => {
    setAddBrand(!addBrand)
  }
  const toggleAddNewStore = () => {
    setAddStore(!addStore)
  }

  const addPrice = () => {
    setPrices([...prices, { storeId: '', price: 0.0, currencyId: 1 }])
  }

  const removePrice = (index: number) => {
    const updatedPrices = [...prices]
    updatedPrices.splice(index, 1)
    setPrices(updatedPrices)
  }

  const handlePriceInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target
    const updatedPrices = [...prices]
    updatedPrices[index].price = value
    setPrices(updatedPrices)
  }

  const handleStoreSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target

    if (value == '-1') {
      setAddStore(true)
    } else {
      setAddStore(false)
      const updatedPrices = [...prices]
      updatedPrices[index].storeId = value
      setPrices(updatedPrices)
    }
  }

  const handleBrandSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target
    if (value == '-1') {
      setAddBrand(true)
    } else {
      setAddBrand(false)
      const updatedPrices = [...prices]
      updatedPrices[index].brandId = value.split('^')[0]
      console.log(value)
      updatedPrices[index].brandName = value.split('^')[1]
      console.log(updatedPrices)
      setPrices(updatedPrices)
    }
  }

  const submitNewStore = async () => {
    // Since we don't have POST routes yet, this is just a placeholder
    try {
      const postRequest = await axios.post('/api/stores', newStore)
      setAddStore(false)
      setNewStore({
        name: '',
        zipcode: '',
        street: '',
        city: 'Berkeley',
        state: 'CA',
      })
      fetchStores()
      toggleAddNewStore()
    } catch (error) {
      console.log(error)
    }
  }

  const submitNewBrand = async () => {
    // Since we don't have POST routes yet, this is just a placeholder
    try {
      const postRequest = await axios.post('/api/brands')
      setAddBrand(false)
      setNewBrand({
        name: '',
      })
      fetchBrands()
      toggleAddNewBrand()
    } catch (error) {
      console.log('Error creating a new brand.')
    }
    console.log('New brand should be created:', newStore)
  }

  return (
    <div className="prices-section">
      <h3>Product Pricing</h3>

      {prices.map((price, idx) => (
        <div key={`price-row-${idx}`} className="price-row">
          <FieldGroup inline={true}>
            <TextInput
              labelText="Price"
              id={`product_price_${idx}`}
              name="price"
              type="number"
              min={0}
              value={price.price}
              size="sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handlePriceInput(e, idx)
              }
            />
            <FieldGroup inline={true}>
              <DropdownSelect
                name="store"
                id={`price_store_${idx}`}
                labelText="Store"
                value={price.storeId}
                size="lg"
                options={stores}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleStoreSelection(e, idx)
                }
              />

              <DropdownSelect
                name="brand"
                id={`price_brand_${idx}`}
                labelText="Brand"
                value={`${price.brandId}^${price.brandName}`}
                size="lg"
                options={brands}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleBrandSelection(e, idx)
                }
              />

              <Badge
                labelText="Remove"
                icon="close"
                id={`remove_price_${idx}`}
                onClick={() => removePrice(idx)}
              />
            </FieldGroup>
          </FieldGroup>
        </div>
      ))}

      <Button
        inline="true"
        id="button-prices-add"
        type="button"
        onClick={addPrice}
      >
        Add price
      </Button>

      <Modal
        actionButtonLabel="Add store"
        ariaLabel="Add a new store to your price book"
        closeButtonLabel="Cancel"
        heading="Add a store"
        id="modal_add-store"
        isOpen={addStore}
        onClose={toggleAddNewStore}
        onAction={submitNewStore}
        size="lg"
      >
        <NewStoreForm newStore={newStore} setNewStore={setNewStore} />
      </Modal>

      <Modal
        actionButtonLabel="Add brand"
        ariaLabel="Add a new brand to your price book"
        closeButtonLabel="Cancel"
        heading="Add a brand"
        id="modal_add-brand"
        isOpen={addBrand}
        onClose={toggleAddNewBrand}
        onAction={submitNewBrand}
        size="lg"
      >
        <NewBrandForm newBrand={newBrand} setNewBrand={setNewBrand} />
      </Modal>
    </div>
  )
}

export default PricesSection
