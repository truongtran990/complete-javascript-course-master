import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2
import {
  NOT_FOUND_RECIPE_BY_QUERY_MESSAGE,
  DEFAULT_MESSAGE,
} from "../config.js";

class ResultsView2 extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numberOfPages);

    // 1. Page 1 and there are other pages

    if (this._data.page === 1 && numberOfPages > 1) {
      console.log("page 1, and others");
    }
    // 2. Page 1 and there are NO page

    // 3. Last page

    // 4. Other page
  }
}

export default new ResultsView2();
