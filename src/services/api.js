const SPOONACULAR_API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

/**
 * @param {string[]} ingredients - Array of ingredient names
 * @returns {Promise<Object[]>} - Array of recipe objects
 */
export const searchRecipesByIngredients = async (ingredients) => {
  try {
    const ingredientsString = ingredients.join(',+');
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/findByIngredients?ingredients=${ingredientsString}&number=10&apiKey=${SPOONACULAR_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw error;
  }
};

/**
 * Get detailed recipe information
 * @param {number} recipeId - ID of the recipe
 * @returns {Promise<Object>} - Detailed recipe information
 */
export const getRecipeInformation = async (recipeId) => {
  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipe information');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe information:', error);
    throw error;
  }
};

/**
 * Get recipe instructions
 * @param {number} recipeId - ID of the recipe
 * @returns {Promise<Object>} - Recipe instructions
 */
export const getRecipeInstructions = async (recipeId) => {
  try {
    const response = await fetch(
      `${SPOONACULAR_BASE_URL}/${recipeId}/analyzedInstructions?apiKey=${SPOONACULAR_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch recipe instructions');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe instructions:', error);
    throw error;
  }
}; 