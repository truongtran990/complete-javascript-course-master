// Exporting module
console.log("Exporting module");

// Blocking code
console.log("Start fetching users");
// const dataFetched = await (
//   await fetch(`https://jsonplaceholder.typicode.com/users`)
// ).json();
console.log("Finish fetching users");
// console.log(dataFetched);

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product}(s) added to cart`);
};

// Export need to happen in top-level code
/* if (true) {
  export const addToCart2 = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product}(s) added to cart`);
  };
} */

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product}(s) added to cart`);
}
