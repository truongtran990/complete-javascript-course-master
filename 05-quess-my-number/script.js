"use strict";

// query the DOM element
// console.log(document.querySelector(".message").textContent);

/* 
What is the DOM and DOM manipulation

DOM: Document object model: structured representation of HTML documents. Allow js to access html element and styles to manipulation them.
*/

// // Select the html element and then change the html content
// document.querySelector(".message").textContent = "Correct Number!";

// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;

// // .value and use the assignment operator to assign the value of the input element.
// document.querySelector(".guess").value = 23;
// // .value to get the value of the input element.
// console.log("input value: ", document.querySelector(".guess").value);

/* 
Handle click event
*/
// function handleClickCheck() {
//   console.log("click check button: ", document.querySelector(".guess").value);
// }

let SECRET_NUMBER = Math.trunc(Math.random() * 20 + 1);
console.log(SECRET_NUMBER);
const higherMsg = "Too high";
const lowerMsg = "Too low";
const noInputMsg = "🐱‍🐉 No number! Please enter valid number.";
const correctMsg = "Correct number!";
const looseMsg = "You lost the game!";
let maxPoint = 0;
const successColor = "#228B22";
const defaulBackgroundColor = "#222";

const getCurrentPoint = function () {
  return Number(document.querySelector(".score").textContent);
};

const udpateValue = function (newPoint, selector = ".score") {
  document.querySelector(selector).textContent = newPoint;
};

const descreasePoint = function () {
  const currentPoint = getCurrentPoint();
  udpateValue(currentPoint - 1);
};

const updateMaxPoint = function () {
  const currentPoint = getCurrentPoint();
  if (currentPoint > maxPoint) {
    udpateValue(currentPoint, ".highscore");
  }
};

const playAgainHandle = function () {
  document.querySelector("body").style.backgroundColor = defaulBackgroundColor;
  SECRET_NUMBER = Math.trunc(Math.random() * 20 + 1);
  console.log(`new secret ${SECRET_NUMBER}`);
  udpateValue(20);
  udpateValue("?", ".number");
};

const handleCheckNumberInput = function () {
  const inputNumber = Number(document.querySelector(".guess").value);
  let currentPoint = getCurrentPoint();
  if (!inputNumber) {
    document.querySelector(".message").textContent = noInputMsg;
    console.log(`Enter a number between [1, 20]`);
  } else if (inputNumber === SECRET_NUMBER) {
    document.querySelector(".number").textContent = SECRET_NUMBER;
    document.querySelector(".message").textContent = correctMsg;
    updateMaxPoint();
    document.querySelector("body").style.backgroundColor = successColor;
  } else if (inputNumber > SECRET_NUMBER) {
    document.querySelector(".message").textContent = higherMsg;
    if (currentPoint < 0) {
      udpateValue(looseMsg, ".message");
    }
    descreasePoint();
  } else if (inputNumber < SECRET_NUMBER) {
    document.querySelector(".message").textContent = lowerMsg;
    if (currentPoint < 0) {
      udpateValue(looseMsg, ".message");
    }
    descreasePoint();
  }
};

document
  .querySelector(".check")
  .addEventListener("click", handleCheckNumberInput);

document.querySelector(".again").addEventListener("click", playAgainHandle);
