

const RecipeDetailModal = ({ recipe, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{recipe.title}</h2>
          <div className="modal-meta">
            <span>Ready in {recipe.readyInMinutes} mins</span>
            <span className="separator">•</span>
            <span>Serves {recipe.servings}</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="recipe-detail-grid">
            <div className="recipe-image-container">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-detail-image"
              />
            </div>

            <div className="recipe-ingredients">
              <h3 className="section-title">Ingredients</h3>
              <div className="ingredients-list">
                {recipe.usedIngredients.map((ingredient) => (
                  <div key={ingredient.id} className="ingredient-item used">
                    <span className="ingredient-check">✓</span>
                    <span className="ingredient-text">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </div>
                ))}

                {recipe.missedIngredients.map((ingredient) => (
                  <div key={ingredient.id} className="ingredient-item missing">
                    <span className="ingredient-plus">+</span>
                    <span className="ingredient-text">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recipe-separator"></div>

          <div className="recipe-instructions">
            <h3 className="section-title">Instructions</h3>
            <div
              className="instructions-content"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          </div>

          <div className="recipe-summary">
            <h3 className="section-title">Summary</h3>
            <div
              className="summary-content"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-primary">Close</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;
