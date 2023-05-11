// "use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/* 
Show the movements
*/
const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach((movement, index) => {
    const moveType = movement > 0 ? "deposit" : "withdrawal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${moveType}">${
      index + 1
    } ${moveType}</div>
        <div class="movements__value">${movement}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  console.log("acc: ", acc);

  labelBalance.textContent = `${acc.balance}€`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int, _, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

const user = "Steven Thomas Williams"; // output: stw
const createUsernames = (users) => {
  users.forEach((user) => {
    user.username = user.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};
createUsernames(accounts);

const calcBalance = function (acc) {
  const balance = acc.movements.reduce((acc, movement) => acc + movement, 0);

  labelBalance.textContent = `${balance}€`;
};

// calcBalance(account1.movements);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display sumary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener("click", function (event) {
  // Prevent form from submitting
  event.preventDefault();

  console.log("LOGIN");

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  console.log("currentAccount: ", currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // Update UI
    updateUI(currentAccount);

    console.log("currentAccount: ", currentAccount);
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener("click", function (event) {
  event.preventDefault();

  const confirmUser = inputCloseUsername.value;
  const confirmPIN = inputClosePin.value;

  if (
    confirmUser &&
    confirmPIN &&
    confirmUser === currentAccount.username &&
    String(confirmPIN) === String(currentAccount.pin)
  ) {
    console.log(`Correct pin and username`);
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(`index of account will be deleted`, index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  } else {
    console.log(`Incorrect pin or username`);
  }
  inputCloseUsername.value = inputClosePin.value = "";
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/* 
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(`--------------- FOR OF ---------------\n`);
for (const [index, movement] of movements.entries()) {
  const msg =
    `Movement ${index + 1}: ` +
    (movement > 0 ? `You deposited ${movement}` : `You withdrew ${movement}`);
  console.log(msg);
}

console.log(`--------------- FOREACH ---------------\n`);
movements.forEach((movement, index, array) => {
  const msg =
    `Movement ${index + 1}: ` +
    (movement > 0 ? `You deposited ${movement}` : `You withdrew ${movement}`);
  console.log(msg);
  console.log(array);
});

 */

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// console.log(`--------------- FOREACH WITH MAP ---------------\n`);
// currencies.forEach(function (value, key, map) {
//   console.log("value: ", value);
//   console.log("key: ", key);
//   console.log("map: ", map);
// });

/* 
///////////////////////////////////////////// CODING CHALLENGE 1 /////////////////////////////////////////////
*/

const checkDogs = function (dogsJulia, dogsKate) {
  const copiedDogsJulia = [...dogsJulia];
  copiedDogsJulia.splice(0, 1);
  copiedDogsJulia.splice(-2, 2);

  const allDogs = [...copiedDogsJulia, ...dogsKate];

  allDogs.forEach((dogAge, i) => {
    const msg =
      dogAge >= 3
        ? `Dog number ${i + 1} is an adult, and is ${dogAge} years old`
        : `Dog number ${i + 1} is still a puppy 🤓`;

    console.log(msg);
  });
};

const calcAverageHumanAge = function (ages) {
  const humanAges = ages
    .map((age) => {
      return age > 2 ? 16 + age * 4 : 2 * age;
    })
    .filter((humanAge) => humanAge >= 18);

  const averageAge =
    humanAges.reduce((acc, age) => acc + age, 0) / humanAges.length;

  console.log(averageAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;
// const movementsUSD = movements.map((mov) => mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements);

// const balance = movements.reduce(function (
//   accumulator,
//   currentValue,
//   index,
//   arr
// ) {
//   // accumulator hold the calc of all previous values.
//   return accumulator + currentValue;
// },
// 0);

// console.log(balance);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const maxMove = movements.reduce((acc, movement, index) => {
//   console.log(`Iteration ${index}: accumulate-${acc}`);
//   return acc > movement ? acc : movement;
// }, movements[0]);
// console.log(maxMove);

/* 
//////////////////// CODING CHALLENGE 3 ////////////////////
*/
// const calcAverageHumanAge2 = (ages) => {
//   const humanAges =
//     ages
//       .map((age) => {
//         return age > 2 ? 16 + age * 4 : 2 * age;
//       })
//       .filter((humanAge) => humanAge >= 18)
//       .reduce((acc, age, _, arr) => acc + age, 0) / arr.length;

//   console.log(humanAges);
//   return humanAges;
// };

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const find450 = movements.find((mov) => mov == 450);

// console.log(find450);
