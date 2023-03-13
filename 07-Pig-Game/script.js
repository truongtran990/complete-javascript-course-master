"use strict";

// Select html element
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");

// start inital game
score0El.textContent = Number(0);
score1El.textContent = Number(0);
diceEl.classList.add("hidden");
