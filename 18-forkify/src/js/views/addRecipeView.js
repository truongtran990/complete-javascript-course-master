import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");

  _windowEl = document.querySelector(".add-recipe-window");
  _overlayEl = document.querySelector(".overlay");
  _btnOpenEl = document.querySelector(".nav__btn--add-recipe");
  _btnCloseEl = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleHidden() {
    this._overlayEl.classList.toggle("hidden");
    this._windowEl.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpenEl.addEventListener("click", this.toggleHidden.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnCloseEl.addEventListener("click", this.toggleHidden.bind(this));
    this._overlayEl.addEventListener("click", this.toggleHidden.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (event) {
      event.preventDefault();

      //   Browser API to get all data from specific form
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
