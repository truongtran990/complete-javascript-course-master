import icons from "url:../../img/icons.svg"; // Parcel 2

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;

    // Clear innerHTML before append new element
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;

    // Clear innerHTML before append new element
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    console.log(currentElements);
    console.log(newElements);

    newElements.forEach((newEl, index) => {
      const currentElement = currentElements[index];

      console.log("newEl", newEl.isEqualNode(currentElement));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(currentElement) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log("newEl111", newEl);
        currentElement.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(currentElement)) {
        console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attribute => {
          currentElement.setAttribute(attribute.name, attribute.value);
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
