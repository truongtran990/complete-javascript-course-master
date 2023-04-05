// "use strict";

/* 
///////////////////////////////////// OOP /////////////////////////////////////
What is OOP?
    Object oriented programming is a programming paradigm based on the concept of objects
        "paradigm" is the style of code "how" we wrute and organize code
    We use the objec to describe the real-world or abstract features;

    Object contain data (properties) and code (methods). By using objects, we pack data and correcsponding behaviour into one block;

    In OOP, objects are self-contained pieces/block of code
    Objects are building blocks of application and interact with one another

    Interactions happen through API, methods that the code outside of the object can access and use to communicate with the object

    OOP was developed with the goal of organizing code, to make it more flexible and easier to maintain

    Classes and instances (Traditional OOP)
        instance is the real objec that are created from the class, you can create many instance that you want to

        // abstraction
            Ignoring or hiding detail that don't matter, allowing us to get an overview perspective of the thing we're implementing, instead of messing with details that don't really mater to our implementation
        
        // encapsulation
            Keeping properties and methods private inside the class, so they are not accessible from outside the class. some methods can be exposed as a public interface - API.

        // inheritance
            The children classes have all the properties and methods of the parrent class. This allow us to reuse common logic and to model real-world relationships.

        // polomorphism

    Classes  (Prototypes OOP)
        Prototypes contains methods, that object can access methods

        Object are linked to a prototype object
        Prototypal inheritance: the prototype contains

        How do we actually create prototypes? And how do we link objects to prototypes? How can we create new objects, without having classes.
            1. Constructor functions
            2. ES6 classes: is worked exactly like constructor functions; 
                ES6 classes do nothave behave like classical OOP
            3. Object.create(): The easiest and most straightforward way of linking an object to a prototype object
*/
// classes traditional OOP
// create a class when use the constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //   how we add new mothod in constructor function
  //   but you should never do this
  //   this.calcAge = function () {
  //     console.log(2025 - this.birthYear + 1, {});
  //   };
  //   static hey() {
  //     console.log("some thing");
  //   }
};

// The diffirent between constructor function vs regular function is the contructor function is call with the new keyword
const truong = new Person("Truong", 1999);
// how constructor function work
// 1. New {} is created
// 2. function is called, this = {}
// 3. linked to prototype
// 4. function automatically return {}

const matilda = new Person("Matilada", 2000);
const jack = new Person("Jack", 1975);

// check the object is the instanceof Person
console.log(truong instanceof Person);

// Prototypes
// every function in js automatically has a property called prototype, it includes the constructor function
console.log(Person.prototype);
Person.prototype.calcAge = function () {
  console.log("Your are: ", 2023 - this.birthYear);
  return 2023 - this.birthYear;
};

truong.calcAge();
matilda.calcAge();

console.log(truong.__proto__);

// Person.prototype is not the prototype of the Person. it is the prototype of the instance that is created from the new keyword constructor function
console.log(truong.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(truong));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(jack));

// can you guest below statment
console.log(Person.prototype.isPrototypeOf(Person));

// set properties for prototype
Person.prototype.species = "Homo Sapie";

console.log(truong.species);

// but the species is not directly in the object like the firstName and birthYear, not includes in inherit properties

console.log(truong.hasOwnProperty("firstName"));
console.log(truong.hasOwnProperty("birthYear"));
console.log(truong.hasOwnProperty("species"));
// console.log(truong.hasOwnProperty("calcAge"));

// Prototypal inheritance and the prototype chain
/* 
    Static method
        If you want to create a method that you access directly from className without access through the instance of the class. You may need the static methods
*/

// static method in the constructor
const StaticClass = function () {};
StaticClass.hey = function () {
  console.log("hey in StaticClass");
};

StaticClass.hey();

class StaticClassV2 {
  static hey() {
    console.log("hey static method in StaticClassV2");
  }
}
StaticClassV2.hey();

// Object.create manually set the object to the other prototype object that you want
const PersonPrototype = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },
  init(firstName, birthYear) {
    (this.firstName = firstName), (this.birthYear = birthYear);
  },
};

const truong3 = Object.create(PersonPrototype);
console.log("truong3: ", truong3);

truong3.name = "Truong Tran";
truong3.birthYear = 1999;
truong3.greet = function () {
  console.log("hello truong3");
};

truong3.greet();

console.log(PersonPrototype.__proto__);

const NewPerson = function () {};
console.log(NewPerson.prototype);
// const x = NewPerson();
truong3.calcAge();
console.log(truong3.__proto__ === PersonPrototype);

const truong4 = Object.create(PersonPrototype);
truong4.init("Truong Tran 4", 2000);
truong4.calcAge();

/* 
///////////////////////////// Inheritance between "Classes"/ Constructor functions
*/
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  // we will use the call method to set the this object for this of the Student class
  Person.call(this, firstName, birthYear);
  // this.__proto__ = Person.prototype;
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);
/* 
If you use Student.prototype = Person.prototype should be the exactly the same object
*/

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I'm learning ${this.course}`);
};

const mike = new Student("Mike", 2000, "Computer Science");
console.log("mike: ", mike);
mike.introduce();
// mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(
  "check instance of mike vs Student before changes: ",
  mike instanceof Student
);
console.log(
  "check instance of mike vs Person before changes: ",
  mike instanceof Person
);
console.log(
  "check instance of mike vs Object before changes: ",
  mike instanceof Object
);
Student.prototype.constructor = Student;
