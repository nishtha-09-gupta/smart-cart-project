import React, { useState } from 'react';

const RecipeSearch = ({ onRecipesFound, setLoading }) => {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=5&apiKey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const recipes = await response.json();
      const detailedRecipes = await Promise.all(
        recipes.map(async (recipe) => {
          const detailResponse = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
          );
          if (!detailResponse.ok) {
            throw new Error('Failed to fetch recipe details');
          }
          return detailResponse.json();
        })
      );

      // Transform the data to match our application's format
      const formattedRecipes = detailedRecipes.map(recipe => ({
        id: recipe.id,
        name: recipe.title,
        ingredients: recipe.extendedIngredients.map(ing => ing.original),
        instructions: recipe.instructions ? recipe.instructions.split('\n').filter(step => step.trim()) : ['No instructions available']
      }));

      onRecipesFound(formattedRecipes);
    } catch (error) {
      console.error('Error searching recipes:', error);
      onRecipesFound([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-search">
      <h3>Find Recipes by Ingredients</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ingredients">Enter ingredients (comma-separated):</label>
          <textarea
            id="ingredients"
            className="form-textarea"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, rice, vegetables"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Find Recipes
        </button>
      </form>
    </div>
  );
};

export default RecipeSearch;
