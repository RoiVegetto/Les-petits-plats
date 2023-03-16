import { recipes } from '/recipes.js';
import { RecipeCardFactory } from '../factories/index.js';
const mainSearchInput = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('section-meal');

// Filtrer les recettes en fonction de la recherche de l'utilisateur
function filterRecipes() {
  const searchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (
      searchValue.length < 3 ||
      matchInRecipe(recipe, 'name', searchValue) ||
      matchInRecipe(recipe, 'ingredients', searchValue, 'ingredient') ||
      matchInRecipe(recipe, 'description', searchValue)
    ) {
      filteredRecipes.push(recipe);
    }
  }

  renderRecipes(filteredRecipes);
}

// Rendu des recettes
function renderRecipes(recipeList) {
  recipesContainer.innerHTML = '';

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];
    const recipeCard = RecipeCardFactory.create(recipe);
    recipesContainer.appendChild(recipeCard);
  }
}

// Fonctions utilitaires
function matchInRecipe(recipe, field, searchValue, subfield) {
  if (subfield) {
    for (let i = 0; i < recipe[field].length; i++) {
      const item = recipe[field][i];
      if (item[subfield].toLowerCase().includes(searchValue)) {
        return true;
      }
    }
  } else {
    if (recipe[field].toLowerCase().includes(searchValue)) {
      return true;
    }
  }
  return false;
}

// Ajouter un écouteur d'événement pour détecter les modifications de l'entrée de recherche principale
mainSearchInput.addEventListener('input', filterRecipes);
