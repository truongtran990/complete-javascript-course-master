// const markData = {
//     mass: 78,
//     height: 1.69,
// };
// const johnData = {
//     mass: 92,
//     height: 1.95,
// };

// const BMIFomula = (data) => {
//     return (data.mass / (data.height ** 2));
// }

// const markBMI = BMIFomula(markData);
// const johnBMI = BMIFomula(johnData);

// if (markBMI > johnBMI) {
//     console.log(`Mark's BMI (${markBMI}) is higher than John's BMI (${johnBMI})`);
// } else {
//     console.log(`Mark's BMI (${johnBMI}) is higher than John's BMI (${markBMI})`);
// }

/* 
Coding challenge 3
*/

// const dolphinsPoints = [96, 108, 89];
// const koalasPoints = [88, 91, 110];

// const calAvg = dolphinsPoints => dolphinsPoints.reduce((a, b) => a + b, 0) / 3;


// const avg1 = calAvg(dolphinsPoints);
// const avg2 = calAvg(koalasPoints);


// function looseCompare(arg1, arg2) {
//     if (arg1 > arg2) {
//         console.log(`dolphinsPoints's average > koalasPoints's average`);
//     } else if (arg2 > arg1) {
//         console.log(`koalasPoints's average > dolphinsPoints's average`);
//     } else {
//         console.log(`koalasPoints's average = dolphinsPoints's average`);
//     }
// }

// function strictCompare(args1, args2, minium=100) {
//     if (args1 >= minium || args2 >= minium) {
//         looseCompare(args1, args2)
//     } else {
//         console.log(`not found the win team`);
//     }
// }
// console.log(`###############3 compare loose ###############`);
// looseCompare(avg1, avg2);
// console.log(`###############3 compare strict ###############`);
// strictCompare(avg1, avg2);


/* 
Coding challenge 4
*/

const bill0 = 100;
const bill1 = 40;
const bill2 = 430;
const calTip = bill =>  ((bill >= 50 && bill <= 300) ? 15 : 20) * 0.01 * bill;

const tip0 = calTip(bill0);
const tip1 = calTip(bill1);
const tip2 = calTip(bill2);


console.log(`bill0: ${bill0}, tip0: ${tip0}, total0 = ${bill0 + tip0}`);
console.log(`bill1: ${bill1}, tip1: ${tip1}, total1 = ${bill1 + tip1}`);
console.log(`bill2: ${bill2}, tip2: ${tip2}, total2 = ${bill2 + tip2}`);