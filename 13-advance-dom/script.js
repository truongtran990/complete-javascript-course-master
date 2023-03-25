"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
/* 
 
 There are 4 type of node: 
    + Element
    + Text
    + Comment
    + Document
 */

/* 
Select, delete, and creating element

*/
///////////////////////// select the entire document, document is not enough for all element, because it's not the real DOM
console.log(document.documentElement);

// select head and body
console.log(document.head);
console.log(document.body);

// select element with the class is header
const header = document.querySelector(".header");

// select all the elements have the class is `section`
const allSections = document.querySelectorAll(".section");

console.log(allSections); // return array of type: NodeList -> it's not realtime -> the result is just depend on the time when the select is execute, not update the value when the html page is changed

const allButtons = document.getElementsByTagName("button"); // get all elements button tag: type: HTMLColection, when the html page is changed the result is updated also.

console.log(allButtons);

///////////////////////// creating and inserting elements
// we can use the .insertAdjacentHTML method

// create div element and store into the message variable
const message = document.createElement("div");
message.classList.add("cookie-message");

// we can use the .textContent and .innerHTML to read and set content of an element.
// message.textContent =
//   "We use cookied for improved functionality and analytics.";

// but if you want to insert content and some style into new element, you whould use the innerHTML
message.innerHTML =
  "We use cookied for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";

// insert into the first of childs element in the header class element
// header.prepend(message);

// if you use the append like header.append(message) -> the message will be the last element of header class

// the message is the realtime, so it just insert into one place at the same time
// but if you want to insert two or multiple element of the same element?
// header.append(message.cloneNode(true));
header.append(message);

// insert before header element
// header.before(message);
// header.after(message);

////////////////////////////// Delete element
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove();
    // the old way to remove message element
    message.parentElement.removeChild(message);
  });

// styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// .style only work for inline style, if you try to adit another style attribute like height -> show nothing
document.documentElement.style.setProperty("background-color", "red");

// attribute
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Non-standar
console.log(logo.designer);

console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "FPT");

// data attribute
// the data atribute is set on the html with this format data-<part-of-name1>-<part-of-name2> -> convert to part-of-name1Part-of-name2 (camelcase)
console.log(logo.dataset.versionNumber);

// classes
logo.classList.add("c");
logo.classList.remove("c");
// switch add or remove
logo.classList.toggle("c");
logo.classList.contains("c");
