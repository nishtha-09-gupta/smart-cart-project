import React from 'react';
import '../styles/components/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const { image, title, sourceUrl } = recipe;

  return (
    <div className="recipe-card">
      <img src={image} alt={title} className="recipe-image" />
      <h3 className="recipe-title">{title}</h3>
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="recipe-link">
        View Recipe
      </a>
    </div>
  );
};

export default RecipeCard; 