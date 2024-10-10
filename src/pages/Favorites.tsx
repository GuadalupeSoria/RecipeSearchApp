import React from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';

const Favorites: React.FC = () => {
  const { favorites } = useRecipeContext();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;