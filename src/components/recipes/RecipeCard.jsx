import React from 'react';


const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <h3 className="recipe-title">{recipe.title}</h3>
      <div className="recipe-content">
        <div className="recipe-ingredients">
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-instructions">
          <h4>Instructions:</h4>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
