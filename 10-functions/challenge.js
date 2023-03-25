"use strict";

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    // const stringQuestion = `${this.question}\n` + this.options.join("\n");
    // let answerOption;
    // do {
    //   answerOption = Number(prompt(stringQuestion).trim());
    // } while (
    //   typeof answerOption !== "number" ||
    //   answerOption < 0 ||
    //   answerOption >= this.answers.length
    // );

    // this.answers[answerOption] += 1;

    /* 
    we can make it more clear and concise
    */
    const answerOption = Number(
      prompt(`${this.question}\n + ${this.options.join("\n")}`)
    );

    typeof answerOption === "number" &&
      answerOption >= 0 &&
      answerOption < this.answers.length &&
      this.answers[answerOption]++;

    this.displayResults("string");
    this.displayResults();
  },
  displayResults: function (type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".answer")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

// Bonus: Use the 'displayResults' method to display the 2 arrays in the test
// data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
// object! So what should the this keyword look like in this situation?

const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];

poll.displayResults.call({ answers: data1 }, "string");
poll.displayResults.call({ answers: data1 });
poll.displayResults.call({ answers: data2 }, "string");
poll.displayResults.call({ answers: data2 });

/* 
Coding Challenge #2
This is more of a thinking challenge than a coding challenge 🤓
*/

/* 
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
*/

/* 
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.
*/
