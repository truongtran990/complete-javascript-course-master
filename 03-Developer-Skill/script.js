"use strict";

console.log("hi my script");
/* 
Do it by myself
Keep going, keep coding, keep building
*/

/* 
How to solve the problem
1. Make sure you 100% understand the problem. Ask the right question to get a clear picture of the problem.
    REQUIREMENT: We need a function that reverses whatever we pass into it

    How to clarify it, how to 100% understanding it
        What does "Whatever" even mean in this context?
        What should be reverses? Only string, number, and arrays make senseto reverse? How about undefined, null, boolean?

        What to do if something else is passed in?

        What should be returned? Should it always be a string, or should the type be the same as passed in?

        How to recognize whether the argument is the number, a string or an array?

        How to reverse a number, a string, and an array?

2. Divide and conquer
    Break a big problem into small sub-problems
        Check  if argument is the string, number or array?

        Implement reversing a number

        Implement reversing a string

        Implement reversing a array


3. Dont' be afraid to do as much research as you have to do
    How to check if a value is a number in js
    
    How to check if a value is a string in js
    
    How to check if a value is a array in js


4. For bigger problem, write the pseudo-code before writing the actual code

*/

/* 
Coding Challenge #1
*/

/* 
1. 
    What is "the thermometor displays" -> display the detail of temperature
    what is the content will be display? -> 21ºC in 2 days 

2. Divide and conquer
    How to loop over array

3. 

*/

function displayThermometer(temperatures) {
  const outputs = [];
  for (let index = 0; index < temperatures.length; index++) {
    let tempOutput = `... ${temperatures[index]}ºC in ${index + 1} days `;
    outputs.push(tempOutput);
  }
  return outputs.join("");
}
const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

const result1 = displayThermometer(data1);
const result2 = displayThermometer(data2);

console.log(`result 1: ${result1} `);
console.log(`result 2: ${result2} `);
