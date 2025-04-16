import { Ingredient } from '@domains/ingredients/ingredients.types';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';


interface UseIngredientSearchOptions {
  debounceTime?: number;
  minChars?: number;
}

interface UseIngredientSearchHook {
  query: string;
  setQuery: (query: string) => void;
  suggestions: Ingredient[];
  loading: boolean;
  error: string | null;
  clearSuggestions: () => void;
}

/**
 * Custom hook for ingredient search, it debounces
 * 
 * @param options Configuration options for the hook
 * @returns Object containing search state and methods
 */
export function useIngredientSearch(
  options: UseIngredientSearchOptions = {}
): UseIngredientSearchHook {
  const { debounceTime = 300, minChars = 2 } = options;
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);
  
  useEffect(() => {
    if (!query.trim() || query.trim().length < minChars) {
      setSuggestions([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const debounceTimeout = setTimeout(() => {
      fetchIngredientSuggestions(query);
    }, debounceTime);
    
    return () => clearTimeout(debounceTimeout);
  }, [query, debounceTime, minChars]);
  
  const fetchIngredientSuggestions = async (
    searchQuery: string,
  ) => {
      axios.get(`/api/ingredients?query=${encodeURIComponent(searchQuery)}`)
      .then((response) => {
        const {data} = response;
      })
      .catch((error) => {
        setError(error.error || "Couldn't find ingredients!")
        setSuggestions([])
      })
      .finally(() => setLoading(false))
  };
  
  return {
    query,
    setQuery,
    suggestions,
    loading,
    error,
    clearSuggestions
  };
}
