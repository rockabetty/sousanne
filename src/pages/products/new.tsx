import { useState, useEffect } from 'react';
import { Form, Button } from 'el-cuc-ui';
import IngredientSearchBar from '@components/ingredients/IngredientSearchBar';
import ProductPackagingForm from '@components/products/ProductPackagingForm';
import PricesForm from '@components/prices/PricesForm';
import axios from 'axios';
import { Store, ProductData, StorePrice } from './types';

const NewProductPage = () => {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    ingredient_id: "",
    packageType: "single",
    packageCount: undefined,
    packageAmount: undefined,
    unitName: "oz",
  });

  const [stores, setStores] = useState<Store[]>([]);
  const [prices, setPrices] = useState<StorePrice[]>([
    { storeId: "", price: 0.00 },
  ]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ingredientQuery, setIngredientQuery] = useState<string>("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get('/api/stores');
      if (response.data) {
        const storeOptions = response.data.map(store => ({
          labelText: store.name,
          value: store.id
        }));
        
        // Add option to create a new store
        storeOptions.push({
          labelText: "Add new store",
          value: -1
        });
        
        setStores(storeOptions);
      }
    } catch (error) {
      console.error("No stores available due to error", error);
    }
  };

  const handleSelectIngredient = (event) => {
    const { value } = event.target;
    setProductData({ ...productData, ingredient_id: value });
  };

  const handleIngredientSearch = (event) => {
    const { value } = event.target;
    setIngredientQuery(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    console.log("Form submitted with data:", {
      product: productData,
      prices: prices
    });
    
    setIsLoading(false);
  };

  return (
    <Form
      submitLabel="Save"
      onSubmit={handleSubmit}
    >
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
        setStores={setStores}
        fetchStores={fetchStores}
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
  );
};

export default NewProductPage;