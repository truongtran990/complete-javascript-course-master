import View from "./View.js";
import previewView from "./previewView.js";

import icons from "url:../../img/icons.svg"; // Parcel 2
import { NOT_FOUND_BOOKMARKS, DEFAULT_MESSAGE } from "../config.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = NOT_FOUND_BOOKMARKS;
  _message = DEFAULT_MESSAGE;

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => {
        return previewView.render(bookmark, false);
      })
      .join("");
  }
}

export default new BookmarksView();
