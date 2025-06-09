import React, { useState } from 'react';
import './RecipeSearch.css';

const RecipeSearch = ({ onRecipesFound, setLoading }) => {
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!ingredients.trim()) {
      setError('Please enter at least one ingredient');
      return;
    }

    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=12&apiKey=${apiKey}`
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
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        ingredients: recipe.extendedIngredients.map(ing => ing.original),
        instructions: recipe.instructions ? recipe.instructions.split('\n').filter(step => step.trim()) : ['No instructions available'],
        summary: recipe.summary
      }));

      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [ingredients, ...prev.filter(item => item !== ingredients)].slice(0, 5);
        return newHistory;
      });

      onRecipesFound(formattedRecipes);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setError('Failed to fetch recipes. Please try again later.');
      onRecipesFound([]);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (historyItem) => {
    setIngredients(historyItem);
  };

  return (
    <div className="recipe-search">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (e.g., chicken, rice, vegetables)"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>

      {searchHistory.length > 0 && (
        <div className="search-history">
          <h4>Recent Searches:</h4>
          <div className="history-tags">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                className="history-tag"
                onClick={() => handleHistoryClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;