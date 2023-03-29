import { recipes } from '/recipes.js';
import { RecipeCardFactory } from '../factories/index.js';
const mainSearchInput = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('section-meal');

function filterSelectedItems(recipe, selectedIngredients, selectedAppliances, selectedUstensils) {
  if (selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0) {
    return true;
  }

  const ingredientsFilter = selectedIngredients.length === 0 ? true : selectedIngredients.every((selectedIngredient) => {
    return recipe.ingredients.some((ingredient) => {
      const lowerCaseIngredient = ingredient.ingredient.toLowerCase();
      return lowerCaseIngredient.includes(selectedIngredient);
    });
  });

  const appliancesFilter = selectedAppliances.length === 0 ? true : selectedAppliances.includes(recipe.appliance.toLowerCase());

  const ustensilsFilter = selectedUstensils.length === 0 ? true : selectedUstensils.every((selectedUstensil) => {
    return recipe.ustensils.some((ustensil) => {
      const lowerCaseUstensil = ustensil.toLowerCase();
      return lowerCaseUstensil.includes(selectedUstensil);
    });
  });

  return ingredientsFilter && appliancesFilter && ustensilsFilter;
}

export function filterRecipes(searchValue, selectedIngredients, selectedAppliances, selectedUstensils) {
  if (!searchValue && selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0) {
    return recipes;
  }

  return recipes.filter((recipe) => {
    const lowerCaseRecipeName = recipe.name.toLowerCase();

    if (searchValue && !lowerCaseRecipeName.includes(searchValue)) {
      return false;
    }

    return filterSelectedItems(recipe, selectedIngredients, selectedAppliances, selectedUstensils);
  });
}

export function renderRecipes(recipeList) {
  console.log('renderRecipes', recipeList);
  recipesContainer.innerHTML = '';

  recipeList.sort((a, b) => a.name.localeCompare(b.name));

  recipeList.forEach((recipe) => {
    const recipeCard = RecipeCardFactory.create(recipe);
    recipesContainer.appendChild(recipeCard);
  });
}

renderRecipes(recipes);

mainSearchInput.addEventListener('input', () => {
  const searchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(searchValue, [], [], []);
  renderRecipes(filteredRecipes);
});
