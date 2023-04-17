import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');
const BASE_BACKEND_FORKIFY =
  'https://forkify-api.herokuapp.com/api/v2/recipes/';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const controllRecipes = async function () {
  try {
    const id = window.location.hash?.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    const { recipe } = model.state;

    console.log(recipe);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};
// Because the controllRecipes is created with the async keyword -> so it will run in the background, and not block the main execution context
controllRecipes();

// Add eventlistener for url address is change
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controllRecipes)
);
