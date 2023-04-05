"use strict";

// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// console.log(dataTest1.speedUS);
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
// by 1.6)

// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)

// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter

class CarClass {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate(args = 10) {
    this.speed += args;
    console.log("new speed: ", this.speed);
  }
  brake(args = 5) {
    this.speed -= args;
    console.log("new speed: ", this.speed);
  }
  set speedUS(ratio = 1.6) {
    this.speed *= ratio;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
}
const dataTest1 = new CarClass("Ford", 120);

/* 
///////////////////////////////// CODING CHALLENGE 3
*/
// 1. Use a constructor function to implement an Electric Car (called 'EV') as a child
// "class" of 'Car'. Besides a make and current speed, the 'EV' also has the
// current battery charge in % ('charge' property)
// 2. Implement a 'chargeBattery' method which takes an argument
// 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20,
// and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
// km/h, with a charge of 22%'
// 4. Create an electric car object and experiment with calling 'accelerate',
// 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
// you 'accelerate'! Hint: Review the definiton of polymorphism 😉
