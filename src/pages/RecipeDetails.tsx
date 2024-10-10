import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Clock, Users, Utensils } from 'lucide-react';

interface RecipeDetails {
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  instructions: string;
  extendedIngredients: { original: string }[];
  nutrition: {
    nutrients: { name: string; amount: number; unit: string }[];
  };
  sourceUrl: string;
}

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY,
            includeNutrition: true,
          },
        });
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p className="text-center">Loading recipe details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recipe) return <p className="text-center">Recipe not found.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      
      <div className="flex justify-between mb-6">
        <div className="flex items-center">
          <Clock size={20} className="mr-2" />
          <span>{recipe.readyInMinutes} minutes</span>
        </div>
        <div className="flex items-center">
          <Users size={20} className="mr-2" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc pl-5 mb-6">
        {recipe.extendedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <div className="mb-6" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

      <h2 className="text-2xl font-semibold mb-2">Nutrition Information</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {recipe.nutrition.nutrients.slice(0, 8).map((nutrient) => (
          <div key={nutrient.name} className="bg-gray-100 p-3 rounded-lg text-center">
            <p className="font-semibold">{nutrient.name}</p>
            <p>{nutrient.amount.toFixed(1)} {nutrient.unit}</p>
          </div>
        ))}
      </div>

      <a
        href={recipe.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 inline-block"
      >
        View Original Recipe
      </a>
    </div>
  );
};

export default RecipeDetails;