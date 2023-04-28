import icons from "url:../../img/icons.svg"; // Parcel 2

export default class View {
  _data;
  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup strings is returned if render=false
   * @this {Object} View instance
   * @author Truong Tran
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;

    // Clear innerHTML before append new element
    const markup = this._generateMarkup();

    if (!render) {
      return markup;
    }

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;

    // Clear innerHTML before append new element
    const newMarkup = this._generateMarkup();

    // Create new DOM from newMarkup, but not render it to the real DOM;
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    // Get all element of the parrentElement
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    // Loop over the newElements to update the TEXT and ATTRIBUTE if it's differences and needed
    newElements.forEach((newEl, index) => {
      const currentElement = currentElements[index];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(currentElement) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        if (currentElement) currentElement.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(currentElement)) {
        Array.from(newEl.attributes).forEach(attribute => {
          if (currentElement) {
            currentElement.setAttribute(attribute.name, attribute.value);
          }
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
         <div class="spinner">
           <svg>
             <use href="${icons}#icon-loader"></use>
           </svg>
         </div>
       `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
