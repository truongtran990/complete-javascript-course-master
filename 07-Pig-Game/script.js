"use strict";

// Select html element
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

const WIN_SCORE = 100;

let scores, activePlayer, currentSore, isPlaying;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentSore = 0;
  isPlaying = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

init();

const switchPlayer = function () {
  //reset the current score of active player to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  // reset current score and toggler activePlayer
  currentSore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;

  // the .toggle method of document is: if the element have the class -> it will remove, and else if the element don't have the class, we will add class the element.
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (!isPlaying) {
    return;
  }
  // generate the random number, which will display in the dice
  const diceNumber = Math.trunc(Math.random() * 6 + 1);

  //    set the correct image dice will show on ui, after user click roll dice
  diceEl.src = `dice-${diceNumber}.png`;
  diceEl.classList.remove("hidden");

  // update new current score if diceNumber is == 1 and diceNumber != 1
  if (diceNumber !== 1) {
    currentSore += diceNumber;

    // update score on ui of active user
    document.getElementById(`current--${activePlayer}`).textContent =
      currentSore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  if (!isPlaying) {
    return;
  }
  // add current score to active player's score
  scores[`${activePlayer}`] += currentSore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[`${activePlayer}`];
  // check if player's score is > WIN_SCORE -> END THE GAME AND DISABLE HOLD AND ROLL BUTTON
  if (scores[`${activePlayer}`] >= WIN_SCORE) {
    isPlaying = false;
    diceEl.classList.add("hidden");
    console.log(`${activePlayer} wins`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
