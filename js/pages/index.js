/**
 * Dans un premier temps je vais chercher les sélecteur correspondant
 * Ensuite les addEventListener vont écouter les clic de la souris aux différents endroit et rende ce qui est voulu
 * Selection pour Ingrédient
 */

let ingredientContainer = document.getElementById('ingredientContainer');
let ingredientTitle = document.getElementById('ingredientTitle');
let searchBox = document.getElementById('ingredientSearchBox');
let searchInput = document.getElementById('ingredientSearch');
let arrowIcon = document.getElementById('ingredientArrow');

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
});

arrowIcon.addEventListener('click', function () {
  if (searchBox.style.display === 'none') {
    ingredientTitle.style.display = 'none';
    searchBox.style.display = 'flex';
    searchInput.focus();
    searchInput.value = '';
    arrowIcon.classList.add('rotate180');
  } else {
    ingredientTitle.style.display = 'flex';
    searchBox.style.display = 'none';
    searchInput.value = 'Rechercher un ingrédient';
    arrowIcon.classList.remove('rotate180');
  }
});

document.addEventListener('click', function (event) {
  if (!ingredientContainer.contains(event.target)) {
    ingredientTitle.style.display = 'flex';
    searchBox.style.display = 'none';
    searchInput.value = 'Rechercher un ingrédient';
    arrowIcon.classList.remove('rotate180');
  }
});

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
});

applianceArrowIcon.addEventListener('click', function () {
  if (applianceSearchBox.style.display === 'none') {
    applianceTitle.style.display = 'none';
    applianceSearchBox.style.display = 'flex';
    applianceSearchInput.focus();
    applianceSearchInput.value = '';
    applianceArrowIcon.classList.add('rotate180');
  } else {
    applianceTitle.style.display = 'flex';
    applianceSearchBox.style.display = 'none';
    applianceSearchInput.value = 'Rechercher un appareil';
    applianceArrowIcon.classList.remove('rotate180');
  }
});

document.addEventListener('click', function (event) {
  if (!applianceContainer.contains(event.target)) {
    applianceTitle.style.display = 'flex';
    applianceSearchBox.style.display = 'none';
    applianceSearchInput.value = 'Rechercher un appareil';
    applianceArrowIcon.classList.remove('rotate180');
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
let ustensilArrowIcon = document.getElementById('usentsilArrow');

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
});

ustensilArrowIcon.addEventListener('click', function () {
  if (ustensilSearchBox.style.display === 'none') {
    ustensilTitle.style.display = 'none';
    ustensilSearchBox.style.display = 'flex';
    ustensilSearchInput.focus();
    ustensilSearchInput.value = '';
    ustensilArrowIcon.classList.add('rotate180');
  } else {
    ustensilTitle.style.display = 'flex';
    ustensilSearchBox.style.display = 'none';
    ustensilSearchInput.value = 'Rechercher un ustensile';
    ustensilArrowIcon.classList.remove('rotate180');
  }
});

document.addEventListener('click', function (event) {
  if (!ustensilContainer.contains(event.target)) {
    ustensilTitle.style.display = 'flex';
    ustensilSearchBox.style.display = 'none';
    ustensilSearchInput.value = 'Rechercher un ustensile';
    ustensilArrowIcon.classList.remove('rotate180');
  }
});
