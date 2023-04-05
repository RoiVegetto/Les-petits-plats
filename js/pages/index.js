// Importer les dépendances nécessaires
import { RecipeCardFactory } from '../factories/index.js';
import { recipes } from '/recipes.js';

// Sélectionner le conteneur de recettes dans le DOM
const recipesContainer = document.querySelector('#section-meal');

/**
 * Fonction pour initialiser la page et générer les cartes de recettes
 */
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

// Appeler la fonction init pour initialiser la page
init();
