// Importation des dépendances et des fonctions depuis d'autres fichiers
import { recipes } from '/recipes.js';

// Récupération des éléments du DOM
let ingredientContainer = document.getElementById('ingredientContainer');
let ingredientTitle = document.getElementById('ingredientTitle');
let searchBox = document.getElementById('ingredientSearchBox');
let searchInput = document.getElementById('ingredientSearch');
let arrowIcon = document.getElementById('ingredientArrow');

export let selectedIngredients = [];
let ingredientDiv = document.createElement('div');
ingredientDiv.classList.add('listBtn');
ingredientDiv.id = 'listIngredients';
searchBox.appendChild(ingredientDiv);

/**
 * Fonction pour obtenir les ingrédients uniques (non sélectionnés) des recettes filtrées
 * @param {*} selectedIngredients
 * @param {*} filterRecipes
 * @returns
 */
function getUniqueIngredients(selectedIngredients, filterRecipes) {
  let ingredientList = [];
  const uniqueIngredients = new Set();

  for (let i = 0; i < filterRecipes.length; i++) {
    const recipe = filterRecipes[i];

    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j];
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

/**
 * Fonction pour créer un élément d'ingrédient
 * @param {*} ingredient
 * @returns
 */
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

/**
 * Fonction pour créer la liste d'ingrédients
 * @param {*} searchValue
 * @param {*} filterRecipes
 */
export function createIngredientList(searchValue = '', filterRecipes) {
  ingredientDiv.innerHTML = '';

  filterRecipes = filterRecipes ? filterRecipes : recipes;

  const selectedIngredients = Array.from(
    document.querySelectorAll('.selected-ingredient')
  ).map((element) => element.textContent.slice(0, -1).toLowerCase());

  const uniqueIngredients = getUniqueIngredients(
    selectedIngredients,
    filterRecipes
  );
  uniqueIngredients.sort((a, b) => a.localeCompare(b));

  const filteredIngredientList = [];

  for (let i = 0; i < uniqueIngredients.length; i++) {
    const ingredient = uniqueIngredients[i];
    if (ingredient.toLowerCase().includes(searchValue.toLowerCase())) {
      filteredIngredientList.push(ingredient);
    }
  }

  for (let i = 0; i < filteredIngredientList.length; i++) {
    const ingredient = filteredIngredientList[i];
    const ingredientElement = createIngredientElement(
      ingredient,
      selectedIngredients
    );
    ingredientDiv.appendChild(ingredientElement);
  }
}

// Écouteur d'événement pour mettre à jour la liste d'ingrédients lors de la saisie de la recherche
searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value;
  const mainSearchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(
    mainSearchValue,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils
  );
  ingredientDiv.innerHTML = '';
  createIngredientList(searchValue, filteredRecipes);
});

/**
 * Fonction pour afficher ou masquer la liste d'ingrédients
 */
function toggleIngredientList() {
  if (ingredientDiv.style.display === 'none' || !ingredientDiv.style.display) {
    createIngredientList();
    ingredientDiv.style.display = 'grid';
  } else {
    ingredientDiv.style.display = 'none';
  }
}

// Plusieurs autres écouteurs d'événements pour gérer l'interaction avec les éléments de la liste d'ingrédients
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

/**
 * Fonction pour créer un élément d'ingrédient sélectionné
 * @param {*} ingredient
 * @returns
 */
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

/**
 * Fonction pour mettre à jour la liste des ingrédients sélectionnés et mettre à jour les recettes filtrées
 * @param {*} ingredient
 * @param {*} action
 */
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

  const mainSearchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(
    mainSearchValue,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils
  );

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

export let selectedAppliances = [];
let applianceDiv = document.createElement('div');
applianceDiv.classList.add('listBtn');
applianceDiv.id = 'listAppliances';
applianceSearchBox.appendChild(applianceDiv);

function getUniqueAppliances(selectedAppliances, filterRecipes) {
  let applianceList = [];
  const uniqueAppliances = new Set();

  for (let recipe of filterRecipes) {
    const lowerCaseAppliance = recipe.appliance.toLowerCase();

    if (
      !uniqueAppliances.has(lowerCaseAppliance) &&
      selectedAppliances.indexOf(lowerCaseAppliance) === -1
    ) {
      uniqueAppliances.add(lowerCaseAppliance);
      applianceList.push(recipe.appliance);
    }
  }
  return applianceList;
}

function createApplianceElement(appliance) {
  let p = document.createElement('p');
  p.textContent = appliance;
  p.classList.add('appliance');
  p.setAttribute('data-appliance', appliance);
  if (selectedAppliances.indexOf(appliance.toLowerCase()) !== -1) {
    p.classList.add('hidden');
  }
  p.addEventListener('click', () => {
    const applianceName = p.getAttribute('data-appliance');
    const selectedAppliancesContainer = document.getElementById(
      'selected-appliances'
    );
    const selectedApplianceElement =
      createSelectedApplianceElement(applianceName);
    selectedAppliancesContainer.appendChild(selectedApplianceElement);
    p.classList.add('hidden');
    const mainSearchValue = applianceSearchInput.value.toLowerCase().trim();
    updateSelectedAppliances(applianceName, 'add', mainSearchValue);
  });

  return p;
}

export function createApplianceList(searchValue = '', filterRecipes) {
  applianceDiv.innerHTML = '';

  filterRecipes = filterRecipes ? filterRecipes : recipes;

  const selectedAppliances = Array.from(
    document.querySelectorAll('.selected-appliance')
  ).map((element) => element.textContent.toLowerCase());

  const uniqueAppliances = getUniqueAppliances(
    selectedAppliances,
    filterRecipes
  );
  uniqueAppliances.sort((a, b) => a.localeCompare(b));
  console.log(uniqueAppliances);
  const filteredApplianceList = uniqueAppliances.filter((appliance) =>
    appliance.toLowerCase().includes(searchValue.toLowerCase())
  );

  filteredApplianceList.forEach((appliance) => {
    const applianceElement = createApplianceElement(
      appliance,
      selectedAppliances
    );
    applianceDiv.appendChild(applianceElement);
  });
}

applianceSearchInput.addEventListener('input', () => {
  const applianceSearchvValue = applianceSearchInput.value;
  const mainSearchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(
    mainSearchValue,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils
  );
  ingredientDiv.innerHTML = '';
  createApplianceList(applianceSearchvValue, filteredRecipes);
});

function toggleApplianceList() {
  if (applianceDiv.style.display === 'none' || !applianceDiv.style.display) {
    createApplianceList();
    applianceDiv.style.display = 'grid';
  } else {
    applianceDiv.style.display = 'none';
  }
}

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
  toggleApplianceList();
});

applianceArrowIcon.addEventListener('click', function () {
  toggleApplianceList();
});

document.addEventListener('click', function (event) {
  if (!applianceContainer.contains(event.target)) {
    applianceTitle.style.display = 'flex';
    applianceSearchBox.style.display = 'none';
    applianceSearchInput.value = 'Rechercher un appareil';
    applianceArrowIcon.classList.remove('rotate180');
    applianceDiv.style.display = 'none';
  }
});

function createSelectedApplianceElement(appliance) {
  const selectedAppliance = document.createElement('span');
  selectedAppliance.classList.add('selected-appliance');
  selectedAppliance.textContent = appliance;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-appliance');
  removeButton.textContent = 'x';

  removeButton.addEventListener('click', () => {
    selectedAppliance.remove();
    const applianceElement = document.querySelector(
      `.appliance[data-appliance="${appliance}"]`
    );

    if (applianceElement) {
      applianceElement.classList.remove('hidden');
    }

    updateSelectedAppliances(appliance, 'remove');
  });

  selectedAppliance.appendChild(removeButton);
  return selectedAppliance;
}

function updateSelectedAppliances(appliance, action) {
  if (action === 'add') {
    selectedAppliances.push(appliance.toLowerCase());
  } else if (action === 'remove') {
    const applianceIndex = selectedAppliances.indexOf(appliance.toLowerCase());
    if (applianceIndex > -1) {
      selectedAppliances.splice(applianceIndex, 1);
    }
  }

  const selectedIngredients = Array.from(
    document.querySelectorAll('.selected-ingredient')
  ).map((element) => element.textContent.slice(0, -1).toLowerCase());

  const mainSearchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(
    mainSearchValue,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils
  );
  renderRecipes(filteredRecipes);
}

/**
 * Ici nous avons la même structure qu'au dessus
 * Mais pour le selecteur Ustensiles
 */

let ustensilContainer = document.getElementById('ustensilContainer');
let ustensilTitle = document.getElementById('ustensilTitle');
let ustensilSearchBox = document.getElementById('ustensilSearchBox');
let ustensilSearchInput = document.getElementById('ustensilSearch');
let ustensilArrowIcon = document.getElementById('ustensilArrow');

export let selectedUstensils = [];
let ustensilDiv = document.createElement('div');
ustensilDiv.classList.add('listBtn');
ustensilDiv.id = 'listUstensils';
ustensilSearchBox.appendChild(ustensilDiv);

function getUniqueUstensils(selectedUstensils, filterRecipes) {
  let ustensilList = [];
  const uniqueUstensils = new Set();

  for (let recipe of filterRecipes) {
    for (let ustensil of recipe.ustensils) {
      const lowerCaseUstensil = ustensil.toLowerCase();

      if (
        !uniqueUstensils.has(lowerCaseUstensil) &&
        selectedUstensils.indexOf(lowerCaseUstensil) === -1
      ) {
        uniqueUstensils.add(lowerCaseUstensil);
        ustensilList.push(ustensil);
      }
    }
  }
  return ustensilList;
}

function createUstensilElement(ustensil) {
  let p = document.createElement('p');
  p.textContent = ustensil;
  p.classList.add('ustensil');
  p.setAttribute('data-ustensil', ustensil);
  if (selectedUstensils.indexOf(ustensil.toLowerCase()) !== -1) {
    p.classList.add('hidden');
  }
  p.addEventListener('click', () => {
    const ustensilName = p.getAttribute('data-ustensil');
    const selectedUstensilsContainer =
      document.getElementById('selected-ustensils');
    const selectedUstensilElement = createSelectedUstensilElement(ustensilName);
    selectedUstensilsContainer.appendChild(selectedUstensilElement);
    p.classList.add('hidden');
    const mainSearchValue = ustensilSearchInput.value.toLowerCase().trim();
    updateSelectedUstensils(ustensilName, 'add', mainSearchValue);
  });

  return p;
}

export function createUstensilList(searchValue = '', filterRecipes) {
  ustensilDiv.innerHTML = '';

  filterRecipes = filterRecipes ? filterRecipes : recipes;

  const selectedUstensils = Array.from(
    document.querySelectorAll('.selected-ustensil')
  ).map((element) => element.textContent.toLowerCase());

  const uniqueUstensils = getUniqueUstensils(selectedUstensils, filterRecipes);
  uniqueUstensils.sort((a, b) => a.localeCompare(b));

  const filteredUstensilList = uniqueUstensils.filter((ustensil) =>
    ustensil.toLowerCase().includes(searchValue.toLowerCase())
  );

  filteredUstensilList.forEach((ustensil) => {
    const ustensilElement = createUstensilElement(ustensil, selectedUstensils);
    ustensilDiv.appendChild(ustensilElement);
  });
}

ustensilSearchInput.addEventListener('input', () => {
  const ustensilSearchValue = ustensilSearchInput.value;
  const mainSearchValue = mainSearchInput.value.toLowerCase().trim();

  const filteredRecipes = filterRecipes(
    mainSearchValue,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils
  );
  ingredientDiv.innerHTML = '';
  createUstensilList(ustensilSearchValue, filteredRecipes);
});

function toggleUstensilList() {
  if (ustensilDiv.style.display === 'none' || !ustensilDiv.style.display) {
    createUstensilList();
    ustensilDiv.style.display = 'grid';
  } else {
    ustensilDiv.style.display = 'none';
  }
}

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
  toggleUstensilList();
});

ustensilArrowIcon.addEventListener('click', function () {
  toggleUstensilList();
});

document.addEventListener('click', function (event) {
  if (!ustensilContainer.contains(event.target)) {
    ustensilTitle.style.display = 'flex';
    ustensilSearchBox.style.display = 'none';
    ustensilSearchInput.value = 'Rechercher un ustensile';
    ustensilArrowIcon.classList.remove('rotate180');
    ustensilDiv.style.display = 'none';
  }
});

function createSelectedUstensilElement(ustensil) {
  const selectedUstensil = document.createElement('span');
  selectedUstensil.classList.add('selected-ustensil');
  selectedUstensil.textContent = ustensil;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-ustensil');
  removeButton.textContent = 'x';

  removeButton.addEventListener('click', () => {
    selectedUstensil.remove();
    const ustensilElement = document.querySelector(
      `.ustensil[data-ustensil="${ustensil}"]`
    );

    if (ustensilElement) {
      ustensilElement.classList.remove('hidden');
    }

    updateSelectedUstensils(ustensil, 'remove');
  });

  selectedUstensil.appendChild(removeButton);
  return selectedUstensil;
}

function updateSelectedUstensils(ustensil, action) {
  if (action === 'add') {
    selectedUstensils.push(ustensil.toLowerCase());
  } else if (action === 'remove') {
    const ustensilIndex = selectedUstensils.indexOf(ustensil.toLowerCase());
    if (ustensilIndex > -1) {
      selectedUstensils.splice(ustensilIndex, 1);
    }
  }

  const selectedIngredients = Array.from(
    document.querySelectorAll('.selected-ingredient')
  ).map((element) => element.textContent.slice(0, -1).toLowerCase());

  const mainSearchValue = mainSearchInput.value.toLowerCase().trim();
  const filteredRecipes = filterRecipes(
    mainSearchValue,
    selectedIngredients,
    selectedAppliances,
    selectedUstensils
  );
  renderRecipes(filteredRecipes);
}
