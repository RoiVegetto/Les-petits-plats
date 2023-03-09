import { RecipeCardFactory } from '../factories/index.js';
import { recipes } from '/recipes.js';

const recipesContainer = document.querySelector('#section-meal');

function init() {
  if (recipesContainer) {
    // Générer les cartes de recettes avec le factory et les ajouter à la balise div
    recipes.forEach((recipe) => {
      const recipeCard = RecipeCardFactory.create(recipe);

      recipesContainer.appendChild(recipeCard);
    });
  } else {
    console.error(
      "La balise div avec l'ID 'section-meal' n'existe pas dans le document"
    );
  }
}

init();
