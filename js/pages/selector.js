import { recipes } from '/recipes.js';
import { filterRecipes, renderRecipes } from './array.js';

let ingredientContainer = document.getElementById('ingredientContainer');
let ingredientTitle = document.getElementById('ingredientTitle');
let searchBox = document.getElementById('ingredientSearchBox');
let searchInput = document.getElementById('ingredientSearch');
let arrowIcon = document.getElementById('ingredientArrow');

let selectedIngredients = [];
let ingredientDiv = document.createElement('div');
ingredientDiv.classList.add('listBtn');
ingredientDiv.id = 'listIngredients';
searchBox.appendChild(ingredientDiv);

function getUniqueIngredients(selectedIngredients) {
  let ingredientList = [];
  const uniqueIngredients = new Set();

  for (let recipe of recipes) {
    for (let ingredient of recipe.ingredients) {
      const lowerCaseIngredient = ingredient.ingredient.toLowerCase();

      if (
        !uniqueIngredients.has(lowerCaseIngredient) &&
        !selectedIngredients.includes(lowerCaseIngredient)
      ) {
        uniqueIngredients.add(lowerCaseIngredient);
        ingredientList.push(ingredient.ingredient);
      }
    }
  }
  return ingredientList;
}

function createIngredientElement(ingredient) {
  let p = document.createElement('p');
  p.textContent = ingredient;
  p.classList.add('ingredient');
  p.setAttribute('data-ingredient', ingredient);
  p.addEventListener('click', () => {
    const ingredientName = ingredient;
    const selectedIngredientsContainer = document.getElementById(
      'selected-ingredients'
    );
    const selectedIngredientElement =
      createSelectedIngredientElement(ingredientName);
    selectedIngredientsContainer.appendChild(selectedIngredientElement);
    p.classList.add('hidden');

    updateSelectedIngredients(ingredientName, 'add');
  });

  return p;
}

function createIngredientList(searchValue = '') {
  ingredientDiv.innerHTML = '';

  const selectedIngredients = Array.from(
    document.querySelectorAll('.selected-ingredient')
  ).map((element) => element.textContent.slice(0, -1).toLowerCase());

  const uniqueIngredients = getUniqueIngredients(selectedIngredients);
  uniqueIngredients.sort((a, b) => a.localeCompare(b));

  const filteredIngredientList = uniqueIngredients.filter((ingredient) =>
    ingredient.toLowerCase().includes(searchValue.toLowerCase())
  );

  filteredIngredientList.forEach((ingredient) => {
    const ingredientElement = createIngredientElement(
      ingredient,
      selectedIngredients
    );
    ingredientDiv.appendChild(ingredientElement);
  });
}

searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value;
  ingredientDiv.innerHTML = '';
  createIngredientList(searchValue);
});

function toggleIngredientList() {
  if (ingredientDiv.style.display === 'none' || !ingredientDiv.style.display) {
    createIngredientList();
    ingredientDiv.style.display = 'grid';
  } else {
    ingredientDiv.style.display = 'none';
  }
}

searchInput.addEventListener('click', function () {
  if (searchInput.value === 'Rechercher un ingrédient') {
    searchInput.value = '';
  }
});

ingredientTitle.addEventListener('click', function () {
  ingredientTitle.style.display = 'none';
  searchBox.style.display = 'flex';
  searchInput.focus();
  searchInput.value = '';
  arrowIcon.classList.add('rotate180');
  ingredientDiv.innerHTML = '';
  createIngredientList();
  toggleIngredientList();
});

arrowIcon.addEventListener('click', function () {
  toggleIngredientList();
});

document.addEventListener('click', function (event) {
  if (!ingredientContainer.contains(event.target)) {
    ingredientTitle.style.display = 'flex';
    searchBox.style.display = 'none';
    searchInput.value = 'Rechercher un ingrédient';
    arrowIcon.classList.remove('rotate180');
    ingredientDiv.style.display = 'none';
  }
});

function createSelectedIngredientElement(ingredient) {
  const selectedIngredient = document.createElement('span');
  selectedIngredient.classList.add('selected-ingredient');
  selectedIngredient.textContent = ingredient;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-ingredient');
  removeButton.textContent = 'x';

  removeButton.addEventListener('click', () => {
    selectedIngredient.remove();
    const ingredientElement = document.querySelector(
      `.ingredient[data-ingredient="${ingredient}"]`
    );

    if (ingredientElement) {
      ingredientElement.classList.remove('hidden');
    }

    updateSelectedIngredients(ingredient, 'remove');
  });

  selectedIngredient.appendChild(removeButton);
  return selectedIngredient;
}

function updateSelectedIngredients(ingredient, action) {
  if (action === 'add') {
    selectedIngredients.push(ingredient.toLowerCase());
  } else if (action === 'remove') {
    const ingredientIndex = selectedIngredients.indexOf(
      ingredient.toLowerCase()
    );
    if (ingredientIndex > -1) {
      selectedIngredients.splice(ingredientIndex, 1);
    }
  }

  const filteredRecipes = filterRecipes('', selectedIngredients);
  renderRecipes(filteredRecipes);
}

/**
 * Ici nous avons la même structure qu'au dessus
 * Mais pour le selecteur Appareils
 */

let applianceContainer = document.getElementById('applianceContainer');
let applianceTitle = document.getElementById('applianceTitle');
let applianceSearchBox = document.getElementById('applianceSearchBox');
let applianceSearchInput = document.getElementById('applianceSearch');
let applianceArrowIcon = document.getElementById('applianceArrow');

applianceSearchInput.addEventListener('click', function () {
  if (applianceSearchInput.value === 'Rechercher un appareil') {
    applianceSearchInput.value = '';
  }
});

applianceTitle.addEventListener('click', function () {
  applianceTitle.style.display = 'none';
  applianceSearchBox.style.display = 'flex';
  applianceSearchInput.focus();
  applianceSearchInput.value = '';
  applianceArrowIcon.classList.add('rotate180');

  // afficher la liste des appareils dans la barre de recherche
  let applianceList = [];
  let applianceDiv = document.createElement('div');
  applianceDiv.classList.add('listBtn');
  applianceDiv.id = 'listAppliances';
  applianceSearchBox.appendChild(applianceDiv);

  for (let recipe of recipes) {
    if (!applianceList.includes(recipe.appliance.toLowerCase())) {
      applianceList.push(recipe.appliance.toLowerCase());
      let p = document.createElement('p');
      p.textContent = recipe.appliance;
      applianceDiv.appendChild(p);
    }
  }
  applianceSearchBox.appendChild(applianceDiv);
});

applianceArrowIcon.addEventListener('click', function () {
  if (applianceSearchBox.style.display === 'none') {
    applianceTitle.style.display = 'none';
    applianceSearchBox.style.display = 'flex';
    applianceSearchInput.focus();
    applianceSearchInput.value = '';
    applianceArrowIcon.classList.add('rotate180');

    // afficher la liste des appareils dans la barre de recherche
    let applianceList = [];
    for (let recipe of recipes) {
      if (!applianceList.includes(recipe.appliance.toLowerCase())) {
        applianceList.push(recipe.appliance.toLowerCase());
        let applianceDiv = document.createElement('div');
        applianceDiv.textContent = recipe.appliance;
        applianceSearchBox.appendChild(applianceDiv);
      }
    }
  } else {
    applianceTitle.style.display = 'flex';
    applianceSearchBox.style.display = 'none';
    applianceSearchInput.value = 'Rechercher un appareil';
    applianceArrowIcon.classList.remove('rotate180');

    // enlever la liste des appareils de la barre de recherche
    let applianceDivs = applianceSearchBox.querySelectorAll('div');
    for (let div of applianceDivs) {
      applianceSearchBox.removeChild(div);
    }
  }
});

document.addEventListener('click', function (event) {
  if (!applianceContainer.contains(event.target)) {
    applianceTitle.style.display = 'flex';
    applianceSearchBox.style.display = 'none';
    applianceSearchInput.value = 'Rechercher un appareil';
    applianceArrowIcon.classList.remove('rotate180');

    // enlever la liste des appareils de la barre de recherche
    let applianceDivs = applianceSearchBox.querySelectorAll('div');
    for (let div of applianceDivs) {
      applianceSearchBox.removeChild(div);
    }
  }
});

/**
 * Ici nous avons la même structure qu'au dessus
 * Mais pour le selecteur Ustensiles
 */

let ustensilContainer = document.getElementById('ustensilContainer');
let ustensilTitle = document.getElementById('ustensilTitle');
let ustensilSearchBox = document.getElementById('ustensilSearchBox');
let ustensilSearchInput = document.getElementById('ustensilSearch');
let ustensilArrowIcon = document.getElementById('ustensilArrow');

ustensilSearchInput.addEventListener('click', function () {
  if (ustensilSearchInput.value === 'Rechercher un ustensile') {
    ustensilSearchInput.value = '';
  }
});

ustensilTitle.addEventListener('click', function () {
  ustensilTitle.style.display = 'none';
  ustensilSearchBox.style.display = 'flex';
  ustensilSearchInput.focus();
  ustensilSearchInput.value = '';
  ustensilArrowIcon.classList.add('rotate180');

  // afficher la liste des ustensiles dans la barre de recherche
  let ustensilList = [];
  let ustensilDiv = document.createElement('div');
  ustensilDiv.classList.add('listBtn');
  ustensilDiv.id = 'listUstensils';
  ustensilSearchBox.appendChild(ustensilDiv);

  for (let recipe of recipes) {
    for (let ustensil of recipe.ustensils) {
      if (!ustensilList.includes(ustensil.toLowerCase())) {
        ustensilList.push(ustensil.toLowerCase());
        let p = document.createElement('p');
        p.textContent = ustensil;
        ustensilDiv.appendChild(p);
      }
    }
  }
  ustensilSearchBox.appendChild(ustensilDiv);
});

ustensilArrowIcon.addEventListener('click', function () {
  if (ustensilSearchBox.style.display === 'none') {
    ustensilTitle.style.display = 'none';
    ustensilSearchBox.style.display = 'flex';
    ustensilSearchInput.focus();
    ustensilSearchInput.value = '';
    ustensilArrowIcon.classList.add('rotate180');

    // afficher la liste des ustensiles dans la barre de recherche
    let ustensilList = [];
    for (let recipe of recipes) {
      for (let ustensil of recipe.ustensils) {
        if (!ustensilList.includes(ustensil.toLowerCase())) {
          ustensilList.push(ustensil.toLowerCase());
          let ustensilDiv = document.createElement('div');
          ustensilDiv.textContent = ustensil;
          ustensilSearchBox.appendChild(ustensilDiv);
        }
      }
    }
  } else {
    ustensilTitle.style.display = 'flex';
    ustensilSearchBox.style.display = 'none';
    ustensilSearchInput.value = 'Rechercher un ustensile';
    ustensilArrowIcon.classList.remove('rotate180');

    // enlever la liste des ustensiles de la barre de recherche
    let ustensilDivs = ustensilSearchBox.querySelectorAll('div');
    for (let div of ustensilDivs) {
      ustensilSearchBox.removeChild(div);
    }
  }
});

document.addEventListener('click', function (event) {
  if (!ustensilContainer.contains(event.target)) {
    ustensilTitle.style.display = 'flex';
    ustensilSearchBox.style.display = 'none';
    ustensilSearchInput.value = 'Rechercher un ustensile';
    ustensilArrowIcon.classList.remove('rotate180');
    // enlever la liste des ustensiles de la barre de recherche
    let ustensilDivs = ustensilSearchBox.querySelectorAll('div');
    for (let div of ustensilDivs) {
      ustensilSearchBox.removeChild(div);
    }
  }
});
