class SearchView {
  /*
    <form class="search">
        <input
        type="text"
        class="search__field"
        placeholder="Search over 1,000,000 recipes..."
        />
        <button class="btn search__btn">
        <svg class="search__icon">
            <use href="src/img/icons.svg#icon-search"></use>
        </svg>
        <span>Search</span>
        </button>
    </form> 
  */
  #parentEl = document.querySelector(".search");

  getQuery() {
    const queryString = this.#parentEl.querySelector(".search__field").value;
    this.#clearInput();
    return queryString;
  }

  #clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handler) {
    // Add eventlistener for url address is change
    this.#parentEl.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log(event);
      handler();
    });
  }
}

export default new SearchView();
