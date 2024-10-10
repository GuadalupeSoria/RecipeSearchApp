import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}

interface RecipeContextType {
  recipes: Recipe[];
  searchRecipes: (query: string, filters: SearchFilters) => Promise<void>;
  loading: boolean;
  error: string | null;
  favorites: Recipe[];
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (id: number) => void;
}

interface SearchFilters {
  cuisine?: string;
  diet?: string;
  intolerances?: string;
  maxReadyTime?: number;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const searchRecipes = async (query: string, filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
        params: {
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
          query,
          number: 10,
          addRecipeInformation: true,
          fillIngredients: true,
          ...filters,
        },
      });
      setRecipes(response.data.results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (recipe: Recipe) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, recipe];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const removeFromFavorites = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((recipe) => recipe.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <RecipeContext.Provider value={{ recipes, searchRecipes, loading, error, favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </RecipeContext.Provider>
  );
};