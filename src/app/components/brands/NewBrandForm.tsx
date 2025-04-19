import React from 'react'
import { TextInput, Badge, FieldGroup, Form } from 'el-cuc-ui'
import { Brand } from './brands.types'

interface NewBrandFormProps {
  newBrand: Brand
  setNewBrand: React.Dispatch<React.SetStateAction<Brand>>
}

const NewBrandForm: React.FC<NewBrandFormProps> = ({
  newBrand,
  setNewBrand,
}) => {
  const handleNewBrandInput = (event) => {
    const { name, value } = event.target
    setNewBrand({ ...newBrand, [name]: value })
  }

  return (
    <div>
      <TextInput
        labelText="Brand name"
        id="new-brand_name"
        name="name"
        value={newBrand.name}
        onChange={handleNewBrandInput}
      />
    </div>
  )
}

export default NewBrandForm
