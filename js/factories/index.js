class RecipeCardFactory {
  static create(recipe) {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <div class="recipe-header"></div>
      <div class="recipe-information">
      <h2 class="recipe-name">${recipe.name}</h2>
      <p class="recipe-time"><img src="/images/time.png" class="time"> ${
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

const recipesContainer = document.querySelector('#section-meal');

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
