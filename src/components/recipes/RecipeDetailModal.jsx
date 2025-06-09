import React from 'react';
import './RecipeDetailModal.css';

const RecipeDetailModal = ({ recipe, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2 className="modal-title">{recipe.name}</h2>
          <div className="modal-meta">
            <span className="meta-item">
              <i className="fas fa-clock"></i> {recipe.readyInMinutes || 'N/A'} mins
            </span>
            <span className="separator">•</span>
            <span className="meta-item">
              <i className="fas fa-users"></i> {recipe.servings || 'N/A'} servings
            </span>
          </div>
        </div>

        <div className="modal-body">
          <div className="recipe-detail-grid">
            <div className="recipe-image-container">
              <img
                src={recipe.image && recipe.image.trim() ? recipe.image : 'https://via.placeholder.com/600x400?text=No+Image+Available'}
                alt={recipe.name}
                className="recipe-detail-image"
                style={{ background: '#f3f4f6', minHeight: '200px', minWidth: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image+Available';
                }}
              />
            </div>

            <div className="recipe-ingredients">
              <h3 className="section-title">Ingredients</h3>
              <div className="ingredients-list">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="ingredient-check">•</span>
                    <span className="ingredient-text">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recipe-separator"></div>

          <div className="recipe-instructions">
            <h3 className="section-title">Instructions</h3>
            <div className="instructions-content">
              {recipe.instructions.map((instruction, index) => (
                <div key={index} className="instruction-step">
                  <span className="step-number">{index + 1}</span>
                  <p>{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {recipe.summary && (
            <>
              <div className="recipe-separator"></div>
              <div className="recipe-summary">
                <h3 className="section-title">About this Recipe</h3>
                <div
                  className="summary-content"
                  dangerouslySetInnerHTML={{ __html: recipe.summary }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
