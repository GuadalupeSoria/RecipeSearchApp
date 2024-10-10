import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useRecipeContext } from '../context/RecipeContext';

interface Recipe {
  id: number;
  title: string;
  image: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useRecipeContext();
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <div className="flex justify-between items-center">
          <Link to={`/recipe/${recipe.id}`} className="text-blue-500 hover:underline">
            View Details
          </Link>
          <button onClick={toggleFavorite} className="text-red-500 hover:text-red-600">
            <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;