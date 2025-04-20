import React from 'react'
import { TextInput, Badge, FieldGroup } from 'el-cuc-ui'
import { Store } from './stores.types'

interface NewStoreFormProps {
  newStore: Store
  setNewStore: React.Dispatch<React.SetStateAction<Store>>
}

const NewStoreForm: React.FC<NewStoreFormProps> = ({
  newStore,
  setNewStore,
}) => {
  const handleNewStoreInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setNewStore({ ...newStore, [name]: value })
  }

  return (
    <div>
      <TextInput
        labelText="Store name"
        id="new-store_name"
        name="name"
        value={newStore.name}
        onChange={handleNewStoreInput}
      />

      <FieldGroup inline={true}>
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
    </div>
  )
}

export default NewStoreForm
