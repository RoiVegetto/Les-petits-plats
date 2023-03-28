import { recipes } from '/recipes.js';
import { RecipeCardFactory } from '../factories/index.js';
const mainSearchInput = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('section-meal');

// Nouvelle fonction pour filtrer les ingrédients sélectionnés
function filterSelectedIngredients(recipe, selectedIngredients) {
  // Si aucun ingrédient n'est sélectionné, retournez true pour inclure toutes les recettes
  if (selectedIngredients.length === 0) {
    return true;
  }

  return selectedIngredients.every((selectedIngredient) => {
    return recipe.ingredients.some((ingredient) => {
      const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
      return lowerCaseIngredient.includes(selectedIngredient);
    });
  });
}

// Filtrer les recettes en fonction de la recherche de l'utilisateur
export function filterRecipes(searchValue, selectedIngredients) {
  // Si aucune valeur de recherche et aucun ingrédient sélectionné, retourner toutes les recettes
  if (!searchValue && selectedIngredients.length === 0) {
    return recipes;
  }

  // Vérifie si tous les ingrédients sélectionnés sont présents dans la recette
  return recipes.filter((recipe) => {
    const lowerCaseRecipeName = recipe.name.toLowerCase();

    if (searchValue && !lowerCaseRecipeName.includes(searchValue)) {
      return false;
    }

    // Utiliser la nouvelle fonction de filtrage
    return filterSelectedIngredients(recipe, selectedIngredients);
  });
}

// Rendu des recettes
export function renderRecipes(recipeList) {
  console.log('renderRecipes', recipeList);
  recipesContainer.innerHTML = '';

  // Trier les recettes par ordre alphabétique en fonction du nom
  recipeList.sort((a, b) => a.name.localeCompare(b.name));

  recipeList.forEach((recipe) => {
    const recipeCard = RecipeCardFactory.create(recipe);
    recipesContainer.appendChild(recipeCard);
  });
}

renderRecipes(recipes);

// Ajouter un écouteur d'événement pour détecter les modifications de l'entrée de recherche principale
mainSearchInput.addEventListener('input', () => {
  const searchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(searchValue, []);
  renderRecipes(filteredRecipes);
});
