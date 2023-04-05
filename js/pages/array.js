// Importation des dépendances et des fonctions depuis d'autres fichiers
import { recipes } from '/recipes.js';
import { RecipeCardFactory } from '../factories/index.js';
import {
  selectedIngredients,
  selectedAppliances,
  selectedUstensils,
  createIngredientList,
  createApplianceList,
  createUstensilList,
} from './selector.js';

// Récupération des éléments du DOM
export const mainSearchInput = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('section-meal');
const recipesNone = document.getElementById('no-recipes');

/**
 * Fonction pour filtrer les recettes en fonction des ingrédients, appareils et ustensiles sélectionnés
 * @param {*} recipe
 * @param {*} selectedIngredients
 * @param {*} selectedAppliances
 * @param {*} selectedUstensils
 * @returns
 */
function filterSelectedItems(
  recipe,
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
) {
  if (
    selectedIngredients.length === 0 &&
    selectedAppliances.length === 0 &&
    selectedUstensils.length === 0
  ) {
    return true;
  }

  const ingredientsFilter =
    selectedIngredients.length === 0
      ? true
      : selectedIngredients.every((selectedIngredient) => {
          return recipe.ingredients.some((ingredient) => {
            const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
            return lowerCaseIngredient.includes(selectedIngredient);
          });
        });

  const appliancesFilter =
    selectedAppliances.length === 0
      ? true
      : selectedAppliances.includes(recipe.appliance.toLowerCase());

  const ustensilsFilter =
    selectedUstensils.length === 0
      ? true
      : selectedUstensils.every((selectedUstensil) => {
          return recipe.ustensils.some((ustensil) => {
            const lowerCaseUstensil = ustensil.toLowerCase();
            return lowerCaseUstensil.includes(selectedUstensil);
          });
        });

  return ingredientsFilter && appliancesFilter && ustensilsFilter;
}

/**
 * Fonction pour filtrer les recettes en fonction de la valeur de recherche et des éléments sélectionnés
 * @param {*} searchValue
 * @param {*} selectedIngredients
 * @param {*} selectedAppliances
 * @param {*} selectedUstensils
 * @returns
 */
export function filterRecipes(
  searchValue,
  selectedIngredients,
  selectedAppliances,
  selectedUstensils
) {
  if (
    (searchValue.length < 3 &&
      selectedIngredients.length === 0 &&
      selectedAppliances.length === 0 &&
      selectedUstensils.length === 0) ||
    (!searchValue &&
      selectedIngredients.length === 0 &&
      selectedAppliances.length === 0 &&
      selectedUstensils.length === 0)
  ) {
    return recipes;
  }

  return recipes.filter((recipe) => {
    const lowerCaseRecipeName = recipe.name.toLowerCase();

    if (
      searchValue &&
      searchValue.length >= 3 &&
      !lowerCaseRecipeName.includes(searchValue)
    ) {
      return false;
    }

    return filterSelectedItems(
      recipe,
      selectedIngredients,
      selectedAppliances,
      selectedUstensils
    );
  });
}

/**
 * Fonction pour afficher les recettes filtrées
 * @param {*} recipeList
 */
export function renderRecipes(recipeList) {
  console.log('renderRecipes', recipeList);
  recipesContainer.innerHTML = '';
  recipesNone.innerHTML = '';

  createIngredientList('', recipeList);
  createApplianceList('', recipeList);
  createUstensilList('', recipeList);

  recipeList.sort((a, b) => a.name.localeCompare(b.name));

  if (recipeList.length === 0) {
    const noRecipeMessage = document.createElement('p');
    noRecipeMessage.textContent = 'Aucune recette disponible';
    noRecipeMessage.classList.add('no-recipe-message');
    recipesNone.appendChild(noRecipeMessage);
  } else {
    recipeList.forEach((recipe) => {
      const recipeCard = RecipeCardFactory.create(recipe);
      recipesContainer.appendChild(recipeCard);
    });
  }
}

// Appel initial pour afficher toutes les recettes
renderRecipes(recipes);

// Écouteur d'événement pour mettre à jour les recettes filtrées lors de la saisie de la recherche
mainSearchInput.addEventListener('input', () => {
  const searchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(
    searchValue,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils
  );
  renderRecipes(filteredRecipes);
});
