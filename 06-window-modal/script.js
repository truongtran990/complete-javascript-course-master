"use strict";

// Select element on html page
const btnsOpenModal = document.querySelectorAll(".show-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// handle for all button click open modal
for (let index = 0; index < btnsOpenModal.length; index++) {
  btnsOpenModal[index].addEventListener("click", openModal);
}

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

/* 
Handle key press event
Key event for all document, not for spedific any element.
*/
// when user press keydown to keyboard -> js create a new event to track the action of the user do it. If you want to access to this variable -> pass the argument to the function handle of the addEventListener
document.addEventListener("keydown", function (event) {
  console.log(event);
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    // check if modal contain hidden class, if don't have -> add hidden class
    closeModal();
  }
});
