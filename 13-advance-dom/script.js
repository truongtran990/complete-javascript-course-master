"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
///////////////////////////////////////
// Modal window

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
///////////////////// ///////////////////// /////////////////////
///////////////////// PAGE NAVIGATION

// get all nav__link elements
// with below solution, if the NodeList have size is 10000 element, that is not good idea. because we attached 10000 function handler event to each element inside the NodeList. So, how to improve this problem. Yeahhh, the event delegation come and solve this. Let's do it

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (event) {
//     // because we want to scroll to the element smothly, so we will prevent default handle of the DOM, and handle the scroll to manually
//     event.preventDefault();
//     // get the current href of the nav__link element
//     const id = this.getAttribute("href");
//     console.log(id);

//     // after get the target element that you want to scroll to, we will call scrollIntoView method
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// use the event delegation to add scroll nav link smoothly
// There are 2 step you need to do when you want to use the event delegation
// 1. Add event listener to the common parent which contain the child element you want to handle event
// 2. Determine what element originated the event, in this case: what is the element is clicked
document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("nav__link")) {
      // get the id of the target element
      const id = event.target.getAttribute("href");
      console.log(id);
      id.scrollIntoView({ behavior: "smooth" });
    }
  });

// Button scrolling
btnScrollTo.addEventListener("click", function (event) {
  // return a DOMRect oject providing information about the size of an element and its position relative to the viewport of the target element which you want to scroll it to
  const s1Coords = section1.getBoundingClientRect();

  console.log("#section--1", s1Coords);

  //   get the current element of event click to - in this case this is the btnScrollTo
  console.log("btn--scroll-to", event.target.getBoundingClientRect());

  //   calculate the the distance of the page when you scroll vertical or horizonal. default when we at the top of the page and don't scroll by horizontal flow is {window.pageXOffset: 0, window.pageYOffset: 0}
  console.log("current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  // get the the current height/width viewport
  console.log(
    "height/width viewport: ",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //   window.pageXOffset -> return the scrollX property of the window interface return the number of pixel tha tthe document is currently scrolled horizontally.
  // scrolling
  //   window.scrollTo(s1Coords.left, s1Coords.top);
  //   window.scrollTo(
  //     s1Coords.left + window.pageXOffset,
  //     s1Coords.top + window.pageYOffset
  //   );

  // fix that
  //   window.scrollTo({
  //     left: s1Coords.left + window.pageXOffset,
  //     top: s1Coords.top + window.pageYOffset,
  //     behavior: "smooth",
  //   });

  //   the modern way
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////// ///////////////////// /////////////////////

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

/* 

scroll to element in the page
*/
// the old way
/* const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (event) {
  // return a DOMRect oject providing information about the size of an element and its position relative to the viewport of the target element which you want to scroll it to
  const s1Coords = section1.getBoundingClientRect();

  console.log("#section--1", s1Coords);

  //   get the current element of event click to - in this case this is the btnScrollTo
  console.log("btn--scroll-to", event.target.getBoundingClientRect());

  //   calculate the the distance of the page when you scroll vertical or horizonal. default when we at the top of the page and don't scroll by horizontal flow is {window.pageXOffset: 0, window.pageYOffset: 0}
  console.log("current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  // get the the current height/width viewport
  console.log(
    "height/width viewport: ",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //   window.pageXOffset -> return the scrollX property of the window interface return the number of pixel tha tthe document is currently scrolled horizontally.
  // scrolling
  //   window.scrollTo(s1Coords.left, s1Coords.top);
  //   window.scrollTo(
  //     s1Coords.left + window.pageXOffset,
  //     s1Coords.top + window.pageYOffset
  //   );

  // fix that
  //   window.scrollTo({
  //     left: s1Coords.left + window.pageXOffset,
  //     top: s1Coords.top + window.pageYOffset,
  //     behavior: "smooth",
  //   });

  //   the modern way
  section1.scrollIntoView({ behavior: "smooth" });
}); */

/* const h1 = document.querySelector("h1");

// mouseenter is a little bit like hover in css
// h1.addEventListener("mouseenter", function (event) {
//   alert("addEventListener: Great! You are reading the heading :D");
// });

// another way to set event into an element - but this is the old way
// h1.onmouseenter = function (event) {
//   alert("addEventListener: Great! You are reading the heading :D");
// };

// how to remove event listener

const alertH1 = function (event) {
  alert("addEventListener: Great! You are reading the heading :D");
  h1.removeEventListener("mouseenter", alertH1);
};
h1.addEventListener("mouseenter", alertH1); */

// random color rgb(255, 255, 255);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = (min = 0, max = 255) =>
  `rgb(${randomInt(min, max)}, ${randomInt(min, max)}, ${randomInt(min, max)})`;

console.log("randomColor: ", randomColor());

/* document
  .querySelector(".nav__link")
  .addEventListener("click", function (event) {
    console.log("LINK from nav_link");
    const color = randomColor();
    this.style.backgroundColor = color;
    console.log(color);
    console.log("event: ", event.target);
    console.log("this vs event.currentTarget", this, event.currentTarget);

    // stop propagation
    // event.stopPropagation(); all the above parrent will not run the handler function, the event will be removed from this element
  }); */

/* document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    console.log("LINK from nav_links");
    const color = randomColor();
    this.style.backgroundColor = color;
    console.log(color);
    // the original element with event, not the current element with event is generated by bubbling phase
    console.log("event: ", event.target);
    console.log("this vs event.currentTarget", this, event.currentTarget);
  }); */

//   if you pass the third argument = true, in the addEventListener function, the eventHandler function will call at the capture phase. The default is false -> it's mean the event Handler function will execute at the bubbling phase
/* document.querySelector(".nav").addEventListener(
  "click",
  function (event) {
    console.log("LINK from nav");
    const color = randomColor();
    this.style.backgroundColor = color;
    console.log(color);
    console.log("event: ", event.target);
    console.log("this vs event.currentTarget", this, event.currentTarget);
  }
  //   true
); */
