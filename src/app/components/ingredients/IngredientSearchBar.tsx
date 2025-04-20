import React from 'react'
import { TextInput, Radio } from 'el-cuc-ui'
import { useIngredientSearch } from './hooks/useIngredientSearch'

type IngredientSearchProps = {
  onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  selection?: number
}

const IngredientSearchBar = function (props: IngredientSearchProps) {
  const { onSelect, selection } = props
  const { query, setQuery, suggestions } = useIngredientSearch()

  const handleSearch = (event) => {
    const { value } = event.target
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

      {suggestions.length > 0 ? (
        <fieldset>
          <legend>Select an ingredient...</legend>

          {suggestions.map((suggestion) => {
            return (
              <Radio
                labelText={suggestion.name}
                onChange={onSelect}
                value={suggestion.id}
                name="selected_ingredient_search_result"
                id={`ingredient_id_${suggestion.id}`}
                checked={selection == suggestion.id}
                key={`ingredient_result_${suggestion.id}`}
              />
            )
          })}
        </fieldset>
      ) : null}
    </>
  )
}

export default IngredientSearchBar
