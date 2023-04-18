import { async } from "regenerator-runtime";

import { FORKIFY_API_URL } from "./config.js";
import { getJSON } from "./views/utils.js";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
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
