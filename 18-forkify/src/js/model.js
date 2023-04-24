import { async } from "regenerator-runtime";

import { FORKIFY_API_URL, PAGE_SIZE } from "./config.js";
import { getJSON } from "./views/utils.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: PAGE_SIZE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${FORKIFY_API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (
      state.bookmarks.some(bookmark => {
        return bookmark.id === id;
      })
    ) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
  } catch (error) {
    console.error(error, " 💥💥💥");
    throw error;
  }

  return state.recipe;
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJSON(`${FORKIFY_API_URL}?search=${query}`);

    state.search.query = query;
    state.search.page = 1;
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.error(error, " 💥💥💥");
    throw error;
  }
};

// loadSearchResults("pizza");
export const getSearchResultsPage = function (page = state.search.page) {
  if (page < 1) {
    return state.search.results.slice(0, state.search.resultsPerPage - 1);
  }
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  console.log("aaaaaaa", start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (newServings / state.recipe.servings) * ingredient.quantity;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
};

export const deleteBookmark = function (id) {
  // Delete recipe from bookmarks
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmark
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
};
