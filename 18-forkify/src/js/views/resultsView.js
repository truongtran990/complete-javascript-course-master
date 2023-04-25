import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg"; // Parcel 2
import {
  NOT_FOUND_RECIPE_BY_QUERY_MESSAGE,
  DEFAULT_MESSAGE,
} from "../config.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = NOT_FOUND_RECIPE_BY_QUERY_MESSAGE;
  _message = DEFAULT_MESSAGE;

  _generateMarkup() {
    return this._data
      .map(recipe => {
        return previewView.render(recipe, false);
      })
      .join("");
  }
}

export default new ResultsView();
