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

interface PricesSectionProps {
  prices: StorePrice[]
  setPrices: React.Dispatch<React.SetStateAction<StorePrice[]>>
  stores: Store[]
  setStores: React.Dispatch<React.SetStateAction<Store[]>>
  fetchStores: () => Promise<void>
}

const PricesSection: React.FC<PricesSectionProps> = ({
  prices,
  setPrices,
  stores,
  setStores,
  fetchStores,
}) => {
  const [addStore, setAddStore] = useState<boolean>(false)
  const [newStore, setNewStore] = useState<Store>({
    name: '',
    zipcode: '',
    street: '',
    city: 'Berkeley',
    state: 'CA',
  })

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

  const handlePriceInput = (event, index: number) => {
    const { value } = event.target
    const updatedPrices = [...prices]
    updatedPrices[index].price = value
    setPrices(updatedPrices)
  }

  const handleStoreSelection = (event, index: number) => {
    const { value } = event.target

    if (value == -1) {
      setAddStore(true)
    } else {
      setAddStore(false)
      const updatedPrices = [...prices]
      updatedPrices[index].storeId = value
      setPrices(updatedPrices)
    }
  }

  const submitNewStore = async () => {
    // Since we don't have POST routes yet, this is just a placeholder
    console.log('New store should be created:', newStore)
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
              onChange={(e) => handlePriceInput(e, idx)}
            />
            <div className="store-selection">
              <DropdownSelect
                name="store"
                id={`price_store_${idx}`}
                labelText="Store"
                value={price.storeId}
                size="xl"
                options={stores}
                onChange={(e) => handleStoreSelection(e, idx)}
              />

              <Badge
                labelText="Remove"
                icon="close"
                id={`remove_price_${idx}`}
                onClick={() => removePrice(idx)}
              />
            </div>
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
        <NewStoreForm
          newStore={newStore}
          setNewStore={setNewStore}
          onCancel={toggleAddNewStore}
          onSubmit={submitNewStore}
        />
      </Modal>
    </div>
  )
}

export default PricesSection
