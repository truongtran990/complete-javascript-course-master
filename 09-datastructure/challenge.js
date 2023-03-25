"use strict";

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// my solution
// const [...players1] = [...game.players[0]];
// const [...players2] = [...game.players[1]];

// but we have another more concise
const [players1, players2] = game.players;

console.log(players1);
console.log(players2);
const [gk, ...fieldPlayers] = players1;

const allPlayers = [...players1, ...players2];

const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];

function printGoals(...players) {
  const mappedScore = {};
  const copiedScored = [...game.scored];
  for (let index = 0; index < copiedScored.length; index++) {
    if (mappedScore[copiedScored[index]] === undefined) {
      mappedScore[copiedScored[index]] = 0;
    } else {
      mappedScore[copiedScored[index]] += 1;
    }
  }
  console.log(`mappedScore: ${mappedScore}`);

  for (let index = 0; index < players.length; index++) {
    let goalNo = 0;
    if (mappedScore[players[index]] !== undefined) {
      goalNo = mappedScore[players[index]];
    }
    console.log(`${players[index]} have ${goalNo}`);
    goalNo = 0;
  }
}

let winer = (game.odds.team1 > game.odds.team2 && "team2") || "team1";
console.log(`${winer} are win!!!`);
printGoals(
  "Davies",
  "Kimmich",
  "Goretzka",
  "Coman",
  "Muller",
  "Gnarby",
  "Lewandowski"
);

/* 
////////////////////////// CHALLENGE 3
*/
console.log(`////////////////// Coding challenge 3`);

const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);

// 1. Create an array 'events' of the different game events that happened (no
//   duplicates)
const events = new Set(gameEvents.values());
for (const x of events) {
  console.log(x);
}

// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log
gameEvents.delete(64);
console.log(`map after delete key 64: `);
for (const [minute, event] of gameEvents.entries()) {
  console.log(minute, event);
}

// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)

/* There are two things you need to know, and how to solve this problem */
// 1. How to get the number of elements in a map
// 2. How to get the last element in a map
const time = [...gameEvents.keys()].pop();
console.log("Compute and log the following string: ", time / gameEvents.size);

// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽ GOAL
for (const [minute, event] of gameEvents.entries()) {
  const prefixStr = minute <= 45 ? "[FIRST HALF]" : "[SECOND HALF]";
  console.log(`${prefixStr} ${minute}: ${event}`);
}
