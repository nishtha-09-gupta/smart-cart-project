import React, { useState, useEffect } from 'react';
import { searchRecipes } from '../../services/recipeService';
import RecipeCard from './RecipeCard';
import RecipeDetailModal from './RecipeDetailModal';
import './RecipeSearch.css';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    halal: false,
    kosher: false
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Convert dietary filters to Spoonacular API parameters
      const dietParams = Object.entries(dietaryFilters)
        .filter(([_, isActive]) => isActive)
        .map(([diet]) => diet.toLowerCase())
        .join(',');

      const results = await searchRecipes(query, dietParams);
      setRecipes(results);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setDietaryFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="recipe-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      <div className="dietary-filters">
        <h3>Dietary Preferences</h3>
        <div className="filters-grid">
          <label className="filter-item">
            <input
              type="checkbox"
              name="vegetarian"
              checked={dietaryFilters.vegetarian}
              onChange={handleFilterChange}
            />
            <span>Vegetarian</span>
          </label>
          <label className="filter-item">
            <input
              type="checkbox"
              name="vegan"
              checked={dietaryFilters.vegan}
              onChange={handleFilterChange}
            />
            <span>Vegan</span>
          </label>
          <label className="filter-item">
            <input
              type="checkbox"
              name="glutenFree"
              checked={dietaryFilters.glutenFree}
              onChange={handleFilterChange}
            />
            <span>Gluten-Free</span>
          </label>
          <label className="filter-item">
            <input
              type="checkbox"
              name="dairyFree"
              checked={dietaryFilters.dairyFree}
              onChange={handleFilterChange}
            />
            <span>Dairy-Free</span>
          </label>
          <label className="filter-item">
            <input
              type="checkbox"
              name="nutFree"
              checked={dietaryFilters.nutFree}
              onChange={handleFilterChange}
            />
            <span>Nut-Free</span>
          </label>
          <label className="filter-item">
            <input
              type="checkbox"
              name="halal"
              checked={dietaryFilters.halal}
              onChange={handleFilterChange}
            />
            <span>Halal</span>
          </label>
          <label className="filter-item">
            <input
              type="checkbox"
              name="kosher"
              checked={dietaryFilters.kosher}
              onChange={handleFilterChange}
            />
            <span>Kosher</span>
          </label>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => handleRecipeClick(recipe)}
          />
        ))}
      </div>

      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          isOpen={!!selectedRecipe}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default RecipeSearch;