"use strict";

const flight = "LH234";
const truong = {
  name: "Truong Tran",
  passport: 1927409174091720943,
};

const checkIn = (flightNum, passenger) => {
  console.log("flight: ", flight === flightNum);
  console.log("passenger: ", passenger === truong);
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  if (passenger.passport === 1927409174091720943) {
    alert(`Checked in`);
  } else {
    alert(`Wrong passport`);
  }
};

/* 
for the premitive data type -> when we pass the variable to the function calling. It will copy the original value
it exactly be the same with the below:
flightNum = flight
*/
// checkIn(flight, truong);
// console.log(flight);
// console.log(truong);

/**
 *
 * @param {string} str input string
 * @returns string without any space
 */
function oneWord(str) {
  return str.replace(/ /g, "").toLowerCase();
}

const upperFirstWord = (str) => {
  const [first, ...others] = str.split(" ");

  return [first.toUpperCase(), ...others].join(" ");
};

const transform = (str, func) => {
  console.log(`original str: ${str}`);

  console.log(`transformed str: ${func(str)}`);
  console.log(`transform by method: ${func.name}`);
};

const text = "JavaScript is the best";
transform(text, upperFirstWord);

// Javascript uses callbacks all the time
const high5 = function () {
  console.log("✌✌✌");
};

document.body.addEventListener("click", high5);

/* 
FUNCTION RETURN FUNCTION

*/

const greet1 = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greetHey = greet1("Hello");
greetHey("Truong Tran");
greetHey("Lan Anh");

const greetArrow = (greeting) => {
  return (name) => console.log(`${greeting} ${name}`);
};

const greetHey2 = greetArrow("What's up you guys");
greetHey2("Van The");
greetHey2("Van Thoi");
greetHey2("Ngoc Anh");

/* 
CALL AND APPLY METHOD
when you want to use a method of some object for another object, how to bound the this method to new object
There are three ways to do that
    call
        methods(newObject, arg1, arg2, ...args) // pass arguments one by one
    apply
        methods(newObject, arrayListParam)  // pass argument as one list
    bind
*/
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} book a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
  },
};

lufthansa.book(370, "Truong Tran 99");
lufthansa.book(777, "Thoi Tran 2k2");

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

const book = lufthansa.book;

/* 
THE BIND METHOD
bind manually set this keyword to function call, it return function that this keyword is bounded
*/
const bookEW = book.bind(eurowings);
const bookLX = book.bind(swiss);
const bookLH = book.bind(lufthansa);
// const bookEW = book.bind(eurowings);
bookEW(199, "What is this");

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

/* 
bind in eventListener
as we learn before: in the eventListener Function: the this keywork is alway point to the element on which that handle is attached to.
*/

// is we use this code, it will NOT WORK AS EXPECTED \\\\ because the this key word in the handler function point to the .buy element
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);

// we need use the bind to handle it
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// PARTIAL FUNCTION
const addTax = (rate, value) => {
  return value + value * rate;
};
console.log(addTax(10, 2));

const newAddTax = (rate) => {
  return function (value) {
    return value + value * rate;
  };
};
