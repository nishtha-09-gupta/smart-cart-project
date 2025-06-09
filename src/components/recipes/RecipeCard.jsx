import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-image-container">
        <img 
          src={recipe.image} 
          alt={recipe.name} 
          className="recipe-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image+Available';
          }}
        />
      </div>
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.name}</h3>
        <div className="recipe-meta">
          <span className="recipe-time">
            <i className="fas fa-clock"></i> {recipe.readyInMinutes || 'N/A'} mins
          </span>
          <span className="recipe-servings">
            <i className="fas fa-users"></i> {recipe.servings || 'N/A'} servings
          </span>
        </div>
        <div className="recipe-ingredients-preview">
          <h4>Key Ingredients:</h4>
          <ul>
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
            {recipe.ingredients.length > 3 && (
              <li className="more-ingredients">+{recipe.ingredients.length - 3} more</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;