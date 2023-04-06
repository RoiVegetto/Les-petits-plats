/**
 *  Classe RecipeCardFactory pour créer des cartes de recettes
 */
export class RecipeCardFactory {
  // Méthode statique pour créer une carte de recette à partir d'un objet de recette
  static create(recipe) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    // Générer le contenu HTML de la carte de recette
    recipeCard.innerHTML = `
      <div class="recipe-header"></div>
      <div class="recipe-information">
      <h2 class="recipe-name">${recipe.name}</h2>
      <p class="recipe-time"><img src="/images/time.png" class="time" alt="time"> ${
        recipe.time
      } min</p>
      <ul class="recipe-ingredients">
        ${recipe.ingredients
          .map(
            (ingredient) =>
              `<li>${ingredient.ingredient}: ${ingredient.quantity} ${
                ingredient.unit || ''
              }</li>`
          )
          .join('')}
      </ul>
      <p class="recipe-description">${recipe.description}</p>
      </div>
    `;
    return recipeCard;
  }
}
