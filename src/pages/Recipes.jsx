import React, { useState } from 'react';
import PageLayout from "../components/layout/PageLayout.jsx";
import RecipeSearch from "../components/recipes/RecipeSearch.jsx";
import RecipeCard from "../components/recipes/RecipeCard.jsx";
import RecipeDetailModal from "../components/recipes/RecipeDetailModal.jsx";
import './Recipes.css';

const Recipes = ({ setCurrentPage }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipesFound = (foundRecipes) => {
    setRecipes(foundRecipes);
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="recipes-container">
          <div className="recipes-header">
            <h1 className="page-title">Find Recipes</h1>
            <p className="page-subtitle">
              Discover delicious recipes based on ingredients you have
            </p>
          </div>

          <RecipeSearch 
            onRecipesFound={handleRecipesFound}
            setLoading={setLoading}
          />

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Searching for recipes...</p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="recipes-grid">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          ) : (
            <div className="no-recipes">
              <p>No recipes found. Try searching with different ingredients!</p>
            </div>
          )}

          {selectedRecipe && (
            <RecipeDetailModal
              recipe={selectedRecipe}
              isOpen={!!selectedRecipe}
              onClose={() => setSelectedRecipe(null)}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Recipes;