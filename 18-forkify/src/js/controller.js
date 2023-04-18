import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

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

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    recipeView.renderError();
  }
};

// Because the controllRecipes is created with the async keyword -> so it will run in the background, and not block the main execution context
// controllRecipes();

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    console.log("query string from seach input: ", query);
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    console.log(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
