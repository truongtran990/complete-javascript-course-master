"use strict";

// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// console.log(dataTest1.speedUS);
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
// by 1.6)

// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)

// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.brake = function (args = 5) {
  this.speed -= args;
  console.log("new speed: ", this.speed);
};
Car.prototype.accelerate = function (args = 10) {
  this.speed += args;
  console.log("Car - new speed: ", this.speed);
};

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
    return this;
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

/* 
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.brake = function (args = 5) {
  this.speed -= args;
  console.log("new speed: ", this.speed);
};
Car.prototype.accelerate = function (args = 10) {
  this.speed += args;
  console.log("Car - new speed: ", this.speed);
};
  
*/
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
  console.log("charge after call chargeTo: ", this.charge);
};

EV.prototype.accelerate = function (speedIncrease = 20, chargeDecrease = 1) {
  this.speed += speedIncrease;
  this.charge -= chargeDecrease;
  console.log(
    `EV - ${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const electricCar = new EV("Tesla", 120, 23);

electricCar.accelerate();
electricCar.brake();
electricCar.chargeBattery(90);

console.log(EV.prototype);
// 2. Implement a 'chargeBattery' method which takes an argument
// 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20,
// and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
// km/h, with a charge of 22%'
// 4. Create an electric car object and experiment with calling 'accelerate',
// 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
// you 'accelerate'! Hint: Review the definiton of polymorphism 😉

// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class

class EVCl extends CarClass {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log("charge after call chargeTo: ", this.#charge);
    return this;
  }

  accelerate(speedIncrease = 20, chargeDecrease = 1) {
    this.speed += speedIncrease;
    this.#charge -= chargeDecrease;
    console.log(
      `EV - ${this.make} going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!
const newEVCL = new EVCl("Rivian", 120, 23);
newEVCL.accelerate().chargeBattery(20).brake();
console.log(newEVCL);
