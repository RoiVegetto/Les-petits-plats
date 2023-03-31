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

export const mainSearchInput = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('section-meal');

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

export function renderRecipes(recipeList) {
  console.log('renderRecipes', recipeList);
  recipesContainer.innerHTML = '';

  createIngredientList('', recipeList);
  createApplianceList('', recipeList);
  createUstensilList('', recipeList);

  recipeList.sort((a, b) => a.name.localeCompare(b.name));

  if (recipeList.length === 0) {
    const noRecipeMessage = document.createElement('p');
    noRecipeMessage.textContent = 'Aucune recette disponible';
    recipesContainer.appendChild(noRecipeMessage);
  } else {
    recipeList.forEach((recipe) => {
      const recipeCard = RecipeCardFactory.create(recipe);
      recipesContainer.appendChild(recipeCard);
    });
  }
}

renderRecipes(recipes);

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
