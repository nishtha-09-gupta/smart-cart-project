const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipes = async (query, dietParams = '') => {
  try {
   
    const searchResponse = await fetch(
      `${BASE_URL}/complexSearch?query=${encodeURIComponent(query)}&diet=${dietParams}&number=12&apiKey=${API_KEY}`
    );

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const searchData = await searchResponse.json();
    

    const detailedRecipes = await Promise.all(
      searchData.results.map(async (recipe) => {
        const detailResponse = await fetch(
          `${BASE_URL}/${recipe.id}/information?apiKey=${API_KEY}`
        );
        
        if (!detailResponse.ok) {
          throw new Error('Failed to fetch recipe details');
        }
        
        return detailResponse.json();
      })
    );

    return detailedRecipes.map(recipe => ({
      id: recipe.id,
      name: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      ingredients: recipe.extendedIngredients.map(ing => ing.original),
      instructions: recipe.instructions ? recipe.instructions.split('\n').filter(step => step.trim()) : ['No instructions available'],
      summary: recipe.summary
    }));
  } catch (error) {
    console.error('Error in recipe service:', error);
    throw error;
  }
}; 