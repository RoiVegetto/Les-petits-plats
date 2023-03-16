import { recipes } from '/recipes.js';
import { RecipeCardFactory } from '../factories/index.js';
const mainSearchInput = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('section-meal');

// Filtrer les recettes en fonction de la recherche de l'utilisateur
function filterRecipes() {
  const searchValue = mainSearchInput.value.toLowerCase().trim();

  const filteredRecipes =
    searchValue.length >= 3
      ? recipes.filter(
          (recipe) =>
            ['name', 'description'].some((field) =>
              matchInRecipe(recipe, field, searchValue)
            ) || matchInRecipe(recipe, 'ingredients', searchValue, 'ingredient')
        )
      : recipes;

  renderRecipes(filteredRecipes);
}

// Rendu des recettes
function renderRecipes(recipeList) {
  recipesContainer.innerHTML = '';

  recipeList.forEach((recipe) => {
    const recipeCard = RecipeCardFactory.create(recipe);
    recipesContainer.appendChild(recipeCard);
  });
}

// Fonctions utilitaires
function matchInRecipe(recipe, field, searchValue, subfield) {
  if (subfield) {
    return recipe[field].some((item) =>
      item[subfield].toLowerCase().includes(searchValue)
    );
  }
  return recipe[field].toLowerCase().includes(searchValue);
}

// Ajouter un écouteur d'événement pour détecter les modifications de l'entrée de recherche principale
mainSearchInput.addEventListener('input', filterRecipes);
