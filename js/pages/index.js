let ingredientsBtn = document.getElementById('ingredients-btn');
let ingredientsText = document.getElementById('ingredients-text');
let ingredientsSearch = document.getElementById('ingredients-search');
let ingredientsList = document.getElementById('ingredients-list');
let ingredientsArrow = document.querySelector('#ingredients-btn .arrow');

ingredientsText.addEventListener('click', function (event) {
  ingredientsText.style.display = 'none';
  ingredientsSearch.style.display = 'inline-block';
});

ingredientsArrow.addEventListener('click', function (event) {
  ingredientsList.classList.toggle('show');
});

document.addEventListener('click', function (event) {
  let target = event.target;
  if (target != ingredientsBtn && target != ingredientsSearch) {
    ingredientsText.style.display = 'inline-block';
    ingredientsSearch.style.display = 'none';
    ingredientsList.classList.remove('show');
  }
});

// appareils et ustensiles, à faire de la même façon

let appareilsBtn = document.getElementById('appareils-btn');
let appareilsText = document.getElementById('appareils-text');
let appareilsSearch = document.getElementById('appareils-search');
let appareilsList = document.getElementById('appareils-list');
let appareilsArrow = document.querySelector('#appareils-btn .arrow');

appareilsText.addEventListener('click', function () {
  appareilsText.style.display = 'none';
  appareilsSearch.style.display = 'inline-block';
});

appareilsArrow.addEventListener('click', function () {
  appareilsList.classList.toggle('show');
});

document.addEventListener('click', function (event) {
  let target = event.target;
  if (target != appareilsBtn && target != appareilsSearch) {
    appareilsText.style.display = 'inline-block';
    appareilsSearch.style.display = 'none';
    appareilsList.classList.remove('show');
  }
});

let ustensilesBtn = document.getElementById('ustensiles-btn');
let ustensilesText = document.getElementById('ustensiles-text');
let ustensilesSearch = document.getElementById('ustensiles-search');
let ustensilesList = document.getElementById('ustensiles-list');
let ustensilesArrow = document.querySelector('#ustensiles-btn .arrow');

ustensilesText.addEventListener('click', function () {
  ustensilesText.style.display = 'none';
  ustensilesSearch.style.display = 'inline-block';
});

ustensilesArrow.addEventListener('click', function () {
  ustensilesList.classList.toggle('show');
});

document.addEventListener('click', function (event) {
  let target = event.target;
  if (target != ustensilesBtn && target != ustensilesSearch) {
    ustensilesText.style.display = 'inline-block';
    ustensilesSearch.style.display = 'none';
    ustensilesList.classList.remove('show');
  }
});
