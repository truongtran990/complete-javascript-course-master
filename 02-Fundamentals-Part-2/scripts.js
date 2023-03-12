// to activate strict mode; 'use strict'; every line above this statement will be under strict mode;

"use strict";

// function logger(msg) {
//     console.log(msg);
// }

// logger("Truong Tran");
// logger("Truong Tran");
// logger("Truong Tran");


// function fruitProcess(apples, oranges) {
//     console.log(apples, oranges);
//     const juice = (`Juice with ${apples} apple and ${oranges} oranges`);
//     return juice;

// }

// fruitProcess(10, 100);


// const convertedString = Number('10');


/* 
Function type
- Function declaration
- Function expression
*/

// function declaration
// function calcAge1(brithYear) {
//     return 2022 - brithYear;
// }

// const calcAge2 = function (brithYear) {
//     return 2022 - brithYear;
// };
  

// const age1 = calcAge1(1991);
// const age2 = calcAge2(1991);

// console.log(age1, age2);
/* 
What is the different of two these kind of function:
declaration can call before block define
expression can not call before block define -> raise error
*/


/* 
Arrow function
*/
// // without parameter in one line 
// const arrowFunc1 = () => `this is arrow function without parameters`;

// // one parameter in one line
// const arrowFunc2 = brithYear => `your brithYear is ${brithYear}`;

// // two or more parameters in one line
// const arrowFunc3 = (brithYear, name) =>  `${name} have brith year is ${brithYear}`;

// // multiple line function
// const arrowFunc4 = (brithYear, yourName) => {
//     const fullName = `David ${yourName}`;
//     const entireUntil = 65 - (2022 - brithYear);
//     return`${fullName} will work additional ${entireUntil} years`;
// }


/* 
array
*/
// const friends = ["Michael", "Steven", "Peter"];
// const newFriends = new Array("Michael", "Steven", "Peter");

// console.log(typeof friends);
// console.log(typeof newFriends);


/* 
array
*/

// const myArray = [
//     "Truong",
//     "Tran",
//     "Thoi",
//     "Lan Anh",
//     2022 - 2000,
//     "developer",
//     ["python", "javascript", "java"]
// ];

// const flName = "fullName";
// const lName = "lastName";
// const fName = "firstName";
// const newObject = {
//     [fName]: "Truong",
//     [lName]: "Tran",
//     friends: ["Lan Anh", "Hoang"],
//     bestFriend: "Lan Anh",
    
// }
// newObject[flName] = `${newObject[fName]} ${newObject[lName]}`;
// newObject["detail"] = `${newObject[flName]} has ${newObject.friends.length} friends, and his best friends is called ${newObject.bestFriend}.`;

// console.log(`newObject:: `, newObject);


/* 
object method
*/
// const truong = {
//     firstName: "Truong",
//     lastName: "Tran",
//     friends: ["Lan Anh", "Hoang"],
//     bestFriend: "Lan Anh",
//     job: "developer",
//     hasDriverLicense: false,
//     brithYear: 1999,
//     calcAge: function () {
//         this.age = 2022 - this.brithYear;
//         return this.age;
//     },
//     getSummary: function () {
//         return `${truong.firstName} is a ${truong.calcAge()} years old ${truong.job}, and he has ${truong.hasDriverLicense ? 'a' : 'no'} driver's license`;
//     }
// };

// console.log(truong.getSummary());
// console.log(truong);


/* 
loop
*/
