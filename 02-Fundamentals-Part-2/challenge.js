"use strict";

// let hasDriverLicense = false;
// const passedTest = true;

// if (passedTest) {
//     hasDriverLicense = true;
// }

// if (hasDriverLicense) {
//     console.log(`I can drive`);
// }


// const private  = "truong";
// console.log(private);


/* 
Coding Challenge #1 
*/

// const calcAverage = (points) => {(points.reduce((a, b) => a + b, 0)) / 3};

// const checkWiner = (avgDolphins, avgKoalas) => {
//     if (avgDolphins >= 2 * avgKoalas) {
//         console.log(`Dolphins win (${avgDolphins} - ${avgKoalas})`);
//     } else if(avgKoalas >= 2 * avgDolphins) {
//         console.log(`Koalas win (${avgKoalas}) - ${avgDolphins} `);
//     } else {
//         console.log(`No team win!`);
//     }
// };
// const dolphinsPoint1 = [44, 23, 71];
// const koalasPoint1 = [65, 54, 49];

// const avgDolphins1 = calcAverage(dolphinsPoint1);
// const avgKaolas1 = calcAverage(koalasPoint1);

// checkWiner(avgKaolas1, avgDolphins1);

// const dolphinsPoint2 = [85, 54, 41];
// const koalasPoint2 = [23, 34, 27];

// const avgDolphins2 = calcAverage(dolphinsPoint2);
// const avgKaolas2 = calcAverage(koalasPoint2);

// checkWiner(avgKaolas2, avgDolphins2);



/* 
Coding Challenge #2
*/

// function calcTip(bill) {
//     return (bill >= 50  && bill <= 300) ? 15 : 20;
// }

// const bills = [125, 555, 44];

// function calsTipsAndTotal(bills) {
//     const tips = [];
//     const total = [];

//     for (let index = 0; index < bills.length; index++) {
//         tips[index] = calcTip(bills[index]);
//         total[index] = bills[index] * ((tips[index] * 0.01) + 1);
//     }
//     const data = {
//         tips, total
//     };

//     return data;
// }

// const {tips, total} = calsTipsAndTotal(bills);
// console.log(`tips: ${tips}`);
// console.log(`total: ${total}`);


/* 
Coding Challenge #3 
*/

// const markObj = {
//     fullName: "Mark Miller",
//     mass: 78,
//     height: 1.69,
//     calcBMI: function () {
//         this.BMI = this.mass / (this.height ** 2);
//         console.log("this.BMI: ", this.BMI);
//         return this.BMI;
//     }
// };
// const johnObj = {
//     fullName: "John Smith",
//     mass: 92,
//     height: 1.95,
//     calcBMI: function () {
//         this.BMI = this.mass / (this.height ** 2);
//         console.log("this.BMI: ", this.BMI);
//         return this.BMI;
//     }
// };

// const BMIHigher = johnObj.BMI >= markObj.BMI ? johnObj : markObj;
// const BMILower = johnObj.BMI >= markObj.BMI ? markObj : johnObj;

// console.log(`${BMIHigher.fullName}'s BMI (${BMIHigher.calcBMI()}) is higher than ${BMILower.fullName}'s (${BMILower.calcBMI()})`);


/* 
Coding Challenge #4 
*/

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];


function calcTip(bill) {
    return (bill >= 50  && bill <= 300) ? 15 : 20;
}

function calcAllTipsAndBills(bills) {
    const tips = [];
    const totals = [];
    for (let index = 0; index < bills.length; index++) {
        let tempTip = calcTip(bills[index]);
        let totalBill = bills[index] * (1 + (tempTip * 0.01));
        tips.push(tempTip);
        totals.push(totalBill);
    }
    console.log(`tips: ${tips}, totals: ${totals}`);
    return [tips, totals];
}

const [tips, totals] = calcAllTipsAndBills(bills);
console.log(tips);
console.log(totals);