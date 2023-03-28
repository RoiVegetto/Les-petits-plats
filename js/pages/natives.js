import { recipes } from '/recipes.js';
import { RecipeCardFactory } from '../factories/index.js';
const mainSearchInput = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('section-meal');

// Filtrer les recettes en fonction de la recherche de l'utilisateur
export function filterRecipes(searchValue, selectedIngredients = []) {
  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const ingredientsMatch = selectedIngredients.every((ingredient) =>
      matchInRecipe(recipe, 'ingredients', ingredient, 'ingredient')
    );
    const searchValueMatch =
      searchValue.length < 3 ||
      matchInRecipe(recipe, 'name', searchValue) ||
      matchInRecipe(recipe, 'description', searchValue);

    if (ingredientsMatch && searchValueMatch) {
      filteredRecipes.push(recipe);
    }
  }

  // Update the ingredient list by removing already selected ingredients
  const ingredientList = document.querySelectorAll('.ingredient');
  for (let i = 0; i < ingredientList.length; i++) {
    const ingredient = ingredientList[i].getAttribute('data-ingredient');
    if (selectedIngredients.includes(ingredient.toLowerCase())) {
      ingredientList[i].classList.add('hidden');
    } else {
      ingredientList[i].classList.remove('hidden');
    }
  }

  return filteredRecipes;
}

// Rendu des recettes
export function renderRecipes(recipeList) {
  recipesContainer.innerHTML = '';

  // Trier les recettes par ordre alphabétique en fonction du nom
  recipeList.sort((a, b) => a.name.localeCompare(b.name));

  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];
    const recipeCard = RecipeCardFactory.create(recipe);
    recipesContainer.appendChild(recipeCard);
  }
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
const searchValue = mainSearchInput.value.toLowerCase().trim();
const initialFilteredRecipes = filterRecipes(searchValue);
renderRecipes(initialFilteredRecipes);

// Ajouter un écouteur d'événement pour détecter les modifications de l'entrée de recherche principale
mainSearchInput.addEventListener('input', () => {
  const searchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(searchValue);
  renderRecipes(filteredRecipes);
});
