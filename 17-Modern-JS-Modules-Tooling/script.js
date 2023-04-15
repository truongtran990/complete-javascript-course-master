"use strict";

///////////////////////// MODULE /////////////////////////
/* 
Module
    Reusable piece of code that encapsulates implementation details 
    Usually a standalone file, but it doesn't have to be. For simpling, we can think of a separate file.   

    A module contains some codes, and we can import and export value of a module.
    Whatever we export from a module, it called the public API.

    We can export and import the value from other module.

Why module?
    Compose software: Modules are small building blocks that we put together to build complex applications
    Isolate components: Modules can be developed in isolation without thinking about the entire codebase
    Abstract code: Implement low-level code in modules and import these abstractions into other modules
    Organized code: Modules naturally lead to a more organized codebase;

ES6 - Native JS modules
    We didn't have the modules before ES6, but we can use external libraries.
    Modules stored in files, exactly one module per file.
   
Script is also a file.
Compare the ES6 module vs script (both of them are also the file)

                        ES6 module                                  Script

Top-level variable      | Scoped to module                          | Global
Default mode            | Strict mode                               | Sloppy mode
Top-level this          | undefined                                 | window
Imports and exports     | Yes                                       | No    
HTML linking            | <script type="module" scr="path_to_js">   | <script  scr="path_to_js">
File downloading        | Asynchronous way                          | Synchronous is default, unless using the defer, async keyword


Importing value always the first things happen in the modules.

*/

// Importing a module

// import {
//   addToCart,
//   totalPrice as price,
//   tq as quantity,
// } from "./shoppingCart.js";
// import * as shoppingCart from "./shoppingCart.js";

// console.log("Importing module");

// addToCart("bread", 10);

// console.log(price, quantity);

// console.log(shoppingCart);

// shoppingCart.addToCart("IPX 14 RPM", 100);

import add, { cart } from "./shoppingCart.js";

// add("IPX 14 RPM", 100);
// add("IPX 13 RPM", 100);
// add("IPX 12 RPM", 100);

// console.log(cart);

// console.log(`Start fetching`);

// const dataFetched = await (
//   await fetch(`https://jsonplaceholder.typicode.com/posts`)
// ).json();

// console.log("dataFetched", dataFetched);
// console.log(`Something really`);

const getLastPost = async function () {
  const dataFetched = await (
    await fetch(`https://jsonplaceholder.typicode.com/posts`)
  ).json();

  return { title: dataFetched.at(-1), text: dataFetched.at(-1).body };
};

// Start fetching
// console.log(`Starting fetch posts`);
// (async function () {
//   const data = await getLastPost();
//   console.log(data);
// })();
// console.log(`Ending fetch posts`);

// One module import a module which as a top-level await, then the importing module will wait for the imported module to fisnish the blocking code

// console.log("Start consume promise");
// fetch(`https://jsonplaceholder.typicode.com/posts`)
//   .then((res) => res.json())
//   .then((data) => console.log("data from .then method: ", data));
// console.log("End consume promise");

const ShoppingCart2 = (function (params) {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product}(s) added to cart (shipping cost: ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product}(s) ordered from supplier`);
  };
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart("Apple", 4);
ShoppingCart2.addToCart("Pizza", 8);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);
