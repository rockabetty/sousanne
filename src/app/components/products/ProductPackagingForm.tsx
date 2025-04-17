import React from 'react';
import { Radio, TextInput, DropdownSelect, FieldGroup } from 'el-cuc-ui';
import { ProductData } from './products.types';

interface ProductPackagingFormProps {
  productData: ProductData;
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
}

const ProductPackagingForm: React.FC<ProductPackagingFormProps> = ({ 
  productData, 
  setProductData 
}) => {
  const handleGeneralInput = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  // Unit options for dropdown
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
  ];

  return (
    <div className="product-packaging-section">
      <h3>Product Packaging</h3>
      
      {/* Package Type Selection */}
      <div className="package-type-selection">
        <Radio
          onChange={handleGeneralInput}
          id="package_type_singleton"
          name="packageType"
          checked={productData?.packageType === "single"}
          labelText="Single, packaged item"
          value="single"
        />

        <Radio
          onChange={handleGeneralInput}
          id="package_type_multipack"
          name="packageType"
          checked={productData?.packageType === "multiple"}
          labelText="Multi-pack"
          value="multiple"
        />

        <Radio
          onChange={handleGeneralInput}
          id="package_type_by_weight"
          name="packageType"
          checked={productData?.packageType === "weight"}
          labelText="Bulk item"
          value="weight"
        />

        <Radio
          onChange={handleGeneralInput}
          id="package_type_apiece"
          name="packageType"
          checked={productData?.packageType === "apiece"}
          labelText="By item count"
          value="apiece"
        />
      </div>

      {/* Product Size Configuration */}
      {productData.packageType !== "apiece" && (
        <FieldGroup inline={true}>
          {productData.packageType !== "weight" && (
            <>
              {productData.packageType === "multiple" && (
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
              )}

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
            </>
          )}
          
          <DropdownSelect
            name="unitName"
            id="unit_name_selector"
            labelText="Unit"
            value={productData?.unitName}
            options={unitNames}
            onChange={handleGeneralInput}
            size="md"
          />
        </FieldGroup>
      )}
    </div>
  );
};

export default ProductPackagingForm;