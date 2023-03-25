const nested = [2, 4, [5, 6]];

const [oFirst, oSecond, oThird] = nested;

console.log(oFirst, oSecond, oThird);

// destructuring and skip some element, you can do like this
const [first, , last] = nested;
console.log(first);
console.log(last);

/* 
Destructure the object
*/

// const restaurant = {
//   startedMenu: ["Fish", "Chicken", "Noodle", "Pizza"],
//   mainMenu: ["main menu1", "main menu2", "main menu3", "main menu4"],
//   categories: ["ca1", "ca2"],
//   openingHours: {
//     mon: {
//       open: 8,
//       close: 22,
//     },
//     tue: {
//       open: 8,
//       close: 22,
//     },
//     wed: {
//       open: 8,
//       close: 22,
//     },
//     thu: {
//       open: 8,
//       close: 22,
//     },
//   },
//   order: function (starterIndex, mainIndex) {
//     return [this.startedMenu[starterIndex], this.mainMenu[mainIndex]];
//   },
//   orderDelivery: function ({
//     time = "22:22",
//     address,
//     mainIndex = 0,
//     starterIndex = 1,
//   }) {
//     console.log(
//       `Order received! ${this.startedMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
//     );
//   },
// };

// restaurant.orderDelivery({
//   time: "11:11",
//   address: "Via del Sole, 21",
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: "Via del Sole, 21",
//   starterIndex: 2,
// });
// // normal destructure

// // const { startedMenu, categories } = restaurant;

// // console.log(startedMenu, categories);

// // destructure with default value
// // const { startedMenu = [], categories = [], favorite = [] } = restaurant;
// // console.log(startedMenu, categories, favorite);

// // change the name of properties with default value
// const {
//   startedMenu: changedStartedMenu = [],
//   categories: customCategories = [],
//   favorite: customeFavorite = [],
//   openingHours = {},
// } = restaurant;

// console.log(changedStartedMenu, customCategories, customeFavorite);

// // how to mutating variable
// let a = 11;
// let b = 22;

// const obj = { a: 100, b: 200, c: 400 };

// // can not do like below
// // const { a, b } = obj;
// // const { a, b } = obj;
// console.log(a, b);

// // instead we will do likt this
// ({ a, b } = obj);
// console.log(a, b);

// // Nested object
// console.log(openingHours);

// const {
//   mon: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

/* 
Spread operator
*/

const arr = [7, 8, 9];
const newArr = [1, 2, arr[0], arr[1], arr[2]];

console.log("newArr", newArr);

// but you can use another way with more concise
const newArr1 = [1, 2, ...arr];
console.log("newArr1: ", newArr1); // two array are the same

// since ES2018 we can spread object event if is not iterables

/* 
Rest pattern
use the same syntax with spread operator, but the spread operator in the right hand side of = operator
but the rest pattern, in the left hand side of the = operator
*/

// spread operator
/* from one array -> is will unpack to multiple value */
const arr3 = [1, 2, ...[1, 3, 4, 5, 6, 7]];

console.log(arr3);

// rest pattern
/* collect from multiple element into one array */
const [a, b, ...others] = [1, 1, 1, 1, 1, 1, 1];
console.log(a);
console.log(b);
console.log(others);

const newObj = {
  name: "Truong",
  job: "Developer",
  age: 23,
  company: "FPT",
  friends: ["Lan Anh", "Truong", "Hoang"],
};

const { age, ...othersProperties } = newObj;

console.log("age: ", age);
console.log("othersProperties: ", othersProperties);

const addArray = (...numbers) => {
  let total = 0;
  for (let index = 0; index < numbers.length; index++) {
    console.log(index);
    total += numbers[index];
  }
  console.log(`total of: ${numbers} is: ${total}`);
  return total;
};

const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// addArray(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
// addArray(...testData);

/* 
&& and ||
*/
// || will return the first truthy value in the expression

console.log("/////////////////////////// OR OPERATOR ");
console.log(3 || "Jonas"); // output: 3
console.log("" || null); // output: null
console.log(true || 0); //output: true
console.log(undefined || null); //output: null
console.log(undefined || 0 || "" || "hello"); //output: hello

console.log("/////////////////////////// AND OPERATOR ");
// if the first argument is falsy -> we will return the first element
// else return the last element

/* 
in the other hand, it will return the first falsy value, if does not exists falsy value -> it will the last element
 */
// console.log(0 && "Jonas");
// console.log(7 && "Jonas");

const rest1 = {
  name: "Capri",
  numGuests: 0,
};

const rest2 = {
  name: "La Piazza",
  owner: "Giovanni Rossi",
};
/* 
OR assignment operator
*/
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// update the numGuests properties of variable, if this properties if falsy -> will update this properties, else keep the original properties
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// nullish assignment operator
// if numGuests is null or undefined -> update the numGuests to 10 else not null or undefined -> keep value of this properties
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

/* 
AND assignment operator 
*/
rest1.owner = rest1.owner && "<ANONYMOUS>";
rest2.owner = rest2.owner && "<ANONYMOUS>";

// console.log(rest1);
// console.log(rest2);

/* 
FOR OF IN JAVASCRIPT
*/

const menus = ["chicken", "fish", "beef", "pig", "octopus", "squiz"];

// with for of... we can use the continue and break keywork
for (const item of menus) {
  console.log(item);
}

// how to get index with for of
for (const item of menus.entries()) {
  console.log(item); // output: [0, 'chicken']
}
// we can use the destructuring syntax to get the index and the value in for of structure
for (const [index, item] of menus.entries()) {
  console.log(index);
  console.log(item );
}


/* 
OPTIONAL CHAINING
*/
