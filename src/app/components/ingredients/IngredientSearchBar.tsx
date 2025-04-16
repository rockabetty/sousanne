import React from 'react';
import { TextInput } from 'el-cuc-ui'
import { useIngredientSearch } from "./hooks/useIngredientSearch";

const IngredientSearchBar = function () {
  const {query, setQuery, suggestions} = useIngredientSearch();

  const handleSearch = (event) => {
    const {value} = event.target;
    setQuery(value)
  }

    return (
      <>
      <TextInput
        id="ingredients_search_bar"
        name="ingredient"
        labelText="Ingredient"
        helperText="'potato', 'strawberry', 'lime'..."
        value={query}
        onChange={handleSearch}
        size="lg"
      />

      <ul>
        {suggestions.map((suggestion) => {
          return (
            <li key={`ingredient_result_${suggestion.id}`}>{suggestion.name}</li>
            )
        })}
      </ul>
      </>
    )
}

export default IngredientSearchBar