// Importer les dépendances nécessaires
import { recipes } from '/recipes.js';
import { RecipeCardFactory } from '../factories/index.js';
import {
  selectedIngredients,
  selectedAppliances,
  selectedUstensils,
} from './selector.js';

// Sélectionner les éléments du DOM nécessaires
const mainSearchInput = document.getElementById('search-recipes');
const recipesContainer = document.getElementById('section-meal');

/**
 * Fonction pour filtrer les recettes en fonction de la valeur de recherche et des ingrédients sélectionnés
 * @param {*} searchValue
 * @param {*} selectedIngredients
 * @returns
 */
export function filterRecipes(
  searchValue,
  selectedIngredients = [],
  selectedAppliances = [],
  selectedUstensils = []
) {
  const filteredRecipes = [];

  // Parcourir toutes les recettes et vérifier si elles correspondent aux critères de recherche
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    let ingredientsMatch = true;
    for (let j = 0; j < selectedIngredients.length; j++) {
      const ingredient = selectedIngredients[j];
      if (!matchInRecipe(recipe, 'ingredients', ingredient, 'ingredient')) {
        ingredientsMatch = false;
        break;
      }
    }

    const searchValueMatch =
      searchValue.length < 3 ||
      matchInRecipe(recipe, 'name', searchValue) ||
      matchInRecipe(recipe, 'description', searchValue);

    // Si la recette correspond aux critères, l'ajouter à la liste des recettes filtrées
    if (ingredientsMatch && searchValueMatch) {
      filteredRecipes.push(recipe);
    }
  }
  // Mettre à jour la liste des ingrédients en fonction des ingrédients sélectionnés
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

/**
 * Fonction pour afficher les recettes filtrées
 * @param {*} recipeList
 */
export function renderRecipes(recipeList) {
  recipesContainer.innerHTML = '';

  // Trier les recettes par ordre alphabétique
  recipeList.sort((a, b) => a.name.localeCompare(b.name));

  // Générer les cartes de recettes pour chaque recette de la liste et les ajouter au conteneur
  for (let i = 0; i < recipeList.length; i++) {
    const recipe = recipeList[i];
    const recipeCard = RecipeCardFactory.create(recipe);
    recipesContainer.appendChild(recipeCard);
  }
}

/**
 * Fonction pour vérifier si une valeur de recherche est présente dans un champ de recette (ou sous-champ)
 * @param {*} recipe
 * @param {*} field
 * @param {*} searchValue
 * @param {*} subfield
 * @returns
 */
function matchInRecipe(recipe, field, searchValue, subfield) {
  if (subfield) {
    return recipe[field].some((item) =>
      item[subfield].toLowerCase().includes(searchValue)
    );
  }
  return recipe[field].toLowerCase().includes(searchValue);
}

// Obtenir la valeur de recherche initiale et filtrer les recettes
const searchValue = mainSearchInput.value.toLowerCase().trim();
const initialFilteredRecipes = filterRecipes(searchValue);
renderRecipes(initialFilteredRecipes);

// Ajouter un écouteur d'événement pour mettre à jour les recettes filtrées lors de la saisie de la recherche
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
