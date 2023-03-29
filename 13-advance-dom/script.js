"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
// select all tabs operation
const operationTabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

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
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

///////////////////////// DOM TRAVERSING /////////////////////////
const h1 = document.querySelector("h1");
// going downward: child, get all childrens of the h1 element has class is hightlight
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes); // return NodeList text, comment, span, ...
// console.log(h1.children); // return HTMLCollection

h1.firstElementChild.style.color = "blue";
h1.lastElementChild.style.color = "red";

// going upwards: parents

// get the direct parent the closest parent
// console.log("h1.parentNode", h1.parentNode);
// console.log("h1.parentElement", h1.parentElement);

// select the .header closest with h1 element
// closest find the closest parent
// querySelector find the closest children
// h1.closest(".header").style.background = "green";

// going sideways: siblings
// console.log(h1.previousElementSibling); // return: null (because the h1 is the first element of the its parent)
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// how to get all siblings
// console.log("all children of h1: ", h1.parentElement.children);

// console.log("type: ", typeof h1.parentElement.children);
[...h1.parentElement.children].forEach(function (element) {
  if (element !== h1) {
    // console.log("not h1: ", element);
    element.style.transform = "scale(0.5)";
  }
});

// operationTabs.forEach((tab) =>
//   tab.addEventListener("click", () => {
//     console.log(`TAB`);
//   })
// );

tabsContainer.addEventListener("click", (event) => {
  const clicked = event.target.closest(".operations__tab");
  console.log(clicked);
  //   if the click from element that is null -> we will immediately return and complete the even handler function
  // Guard clause
  if (!clicked) {
    return;
  }
  // Before make the current tab is active, we need to deactive all tab
  operationTabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });

  // Remove the active content tab
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  //   Activate operation tab
  clicked.classList.add("operations__tab--active");
  //   Activate content tab
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
///////////////////////// ///////////////////////// /////////////////////////

///////////////////////// PASSING ARGUMENT TO EVENT HANDLER /////////////////////////
// mouseover like mouseenter, but mouseenter does not have bubbling
// when we hover to the link, all remain link is decrease opacity | menu face
const handleHover = function (event) {
  if (event.target.classList.contains("nav__link")) {
    // select the target that event is happen on that element
    const link = event.target;

    // select all siblings
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    // change opacity of all siblings except the event.target
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    // change the opacity of the logo element
    logo.style.opacity = this;
  }
};

// nav.addEventListener("mouseover", function (event) {
//   handleHover(event, 0.5);
// });
// nav.addEventListener("mouseout", function (event) {
//   handleHover(event, 1);
// });

// why is work. the bind method will assign this = 0.5 into the the handleHover function
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////// ///////////////////////// /////////////////////////
///////////////////////// STICKY NAVIGATION /////////////////////////
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// // use the scroll is the bad idea for performance, we will enhance it
// window.addEventListener("scroll", function () {
//   //   console.log(window.screenY);
//   //   console.log(initialCoords.top);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

///////////////////////// ///////////////////////// /////////////////////////
///////////////////////// STICKY NAVIGATION V2 /////////////////////////

// entries: the threshold entries

// const observeOptions = {
//   // first is needed a root property, and the root element is the target is intersecting
//   // if the root is null, we will observer intersecting the entire viewport
//   root: null,
//   threshold: 0.1, // the percentage of intersection which the observer callbackFunc will be called, in the other hand, the % of the target element visible in the viewport
// };

// const observeCallbackFun = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const observer = new IntersectionObserver(observeCallbackFun, observeOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const stickyNav = (entries, observer) => {
  console.log("entries: ", entries);
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
observer.observe(header);

///////////////////////// ///////////////////////// /////////////////////////
///////////////////////// REVEALING ELEMENTS ON SCROLL /////////////////////////

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  // Function handle the entry which was observered
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};

// Define new intersec observer object
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // the entire viewport
  threshold: 0.15, // 15% of the targe object intersect with the viewport
});

allSections.forEach((section) => {
  // add observer for each section element in the html page
  sectionObserver.observe(section);
  //   section.classList.add("section--hidden");
});

///////////////////////// ///////////////////////// /////////////////////////
///////////////////////// LAZY LOADING IMAGES /////////////////////////

/* One the biggest measure when building website is performance. And the images
have the biggest impact on page loading. 
And optimized for images loading is very important. And the lazy load is comming
*/
// select all images that have the data-src attribute

const targetImgs = document.querySelectorAll("img[data-src]"); //return NodeList

const loadingImgs = (entries, observer) => {
  console.log(entries);
  entries.forEach((entry) => {
    // if isIntersecting -> change the src to Src data attribute and remove the lazy-img class from classList
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.src = entry.target.dataset.src;

    // this is not the good idea, because sometime, the network is too slow and then the image is take a long time to load. what is the image will show on the page. The lazy-image is still there until the new image is loading successfully and replace it.
    // to make suke blue alway there until the load image event is totally completed, and after that we will remove the blur class
    // entry.target.classList.remove("lazy-img");

    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });
    // remove this entry from observer intersecting
    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadingImgs, {
  root: null,
  threshold: 0,
  //   to make the image load before the threshold is reached, we will add the rootMargin with negative value
  rootMargin: "200px",
});

targetImgs.forEach((image) => {
  imgObserver.observe(image);
});

///////////////////////// ///////////////////////// /////////////////////////
///////////////////////// SLIDER COMPONENT /////////////////////////

const slider = function () {
  // Get all slide images
  const imgSlides = document.querySelectorAll(".slide");

  // // get the slider that contains all slide images
  // const slider = document.querySelector(".slider");

  // // scale out that make image is smaller and shift to left 1000px to ease to view
  // slider.style.transform = "scale(0.3) translateX(-1000px)";

  // // slider is relative display, and all the image slides is absolute, so all the images are on top of each other, so we can only see the one images. the see all, we change the overflow to visible
  // slider.style.overflow = "visible";
  // // slider.style.transform = translateX

  // get the left, right button
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let currentSlide = 0;
  const sizeOfSlides = imgSlides.length;

  const createDots = function () {
    imgSlides.forEach(function (_, index) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide=${index}></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    // 0%, 100%, 200%, 300% -> -100%, 0%, 200%, 300%
    imgSlides.forEach(
      (img, index) =>
        (img.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === sizeOfSlides - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    // 0%, 100%, 200%, 300% -> -100%, 0%, 200%, 300%
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = sizeOfSlides - 1;
    } else {
      currentSlide--;
    }

    // 0%, 100%, 200%, 300% -> -100%, 0%, 200%, 300%
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // go to next slide
  btnRight.addEventListener("click", nextSlide);

  // go to previous slide
  btnLeft.addEventListener("click", previousSlide);

  // using the left and right arrow to move image slide
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      previousSlide();
    }
    event.key === "ArrowRight" && nextSlide();
  });

  ///////////////////////// ///////////////////////// /////////////////////////
  ///////////////////////// CLICK DOT TO MOVE TO IMAGE SLIDE /////////////////////////
  dotContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("dots__dot")) {
      console.log("DOT");
      // get the slide
      const { slide } = event.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
///////////////////////// ///////////////////////// /////////////////////////
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
// console.log(document.documentElement);

// select head and body
// console.log(document.head);
// console.log(document.body);

// select element with the class is header
// const header = document.querySelector(".header");

// select all the elements have the class is `section`
// const allSections = document.querySelectorAll(".section");

// console.log(allSections); // return array of type: NodeList -> it's not realtime -> the result is just depend on the time when the select is execute, not update the value when the html page is changed

const allButtons = document.getElementsByTagName("button"); // get all elements button tag: type: HTMLColection, when the html page is changed the result is updated also.

// console.log(allButtons);

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
// header.append(message);

// insert before header element
// header.before(message);
// header.after(message);

////////////////////////////// Delete element
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     // message.remove();
//     // the old way to remove message element
//     message.parentElement.removeChild(message);
//   });

// styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// .style only work for inline style, if you try to adit another style attribute like height -> show nothing
// document.documentElement.style.setProperty("background-color", "red");

// attribute
const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// Non-standar
// console.log(logo.designer);

// console.log(logo.getAttribute("designer"));
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

// console.log("randomColor: ", randomColor());

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
