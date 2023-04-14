"use strict";

/* 
Synchronous code is executed line by line;
Each line of code waits for previous line to finish;
This can be a problem when the line of code take a long time to run;
    Example: we have the alert show on the web page, until the use click ok button, then the alert is closed and the program will continue running. Otherwise the alert will block the program.


Asynchronous code is executed after a task that runs in the background finishes;
Asynchronous code is non-blocking;
Execution doesn't wait for an asynchronous task to finish its work;
Callback function alone do NOT make code asynchronous;
```
    const p = document.querySelector(".p");

    setTimeout(() => {
    p.textContent = "My name is TruongTran";
    }, 5000);

    p.style.color = "red";
```

```
    const img = document.querySelector(".dog");
    img.src = "dog.jpg";
    img.addEventListener("load", function (params) {
    img.classList.add("fadeIn");
    });
    p.style.width = "300px";

```
    - The first the of the above code is execute synchronous
    - The second line: take a long time to add image to source of image -> So the JS implement the .src to run as asynchronous. So this line doesn't block the entire below code.
    - The third line: add event listener for img after it loaded sucessfully -> the callback function will run. Now the callback function will be added into the callback queue

    - The fourth line: change the style of p element 

    -- Now the execution context is empty and the background task is load the image source for img element is done -> the callback function in callback queue is pop to execute in the execution context;


*/

const LATEST_VERSION = "v3.1";
const BASE_CONTRIES_URL = `https://restcountries.com/${LATEST_VERSION}/`;
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const GEO_API_KEY = "138478313874028e15846753x61534";
const BASE_GEO_URL = `https://geocode.xyz/`;

//'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key'
///////////////////////////////////////////// XMLHttpRequest /////////////////////////////////////////////

/* const getCountryData = function (countryName) {
  const request = new XMLHttpRequest();
  request.open("GET", `${BASE_CONTRIES_URL}name/${countryName}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
        <img class="country__img" src="${data?.flags?.svg}" />
        <div class="country__data">
            <h3 class="country__name">${
              data?.name?.common || data?.name?.official
            }</h3>
            <h4 class="country__region">${data?.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data?.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data?.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.keys(data?.currencies)[0]
            }</p>
        </div>
    </article>
  `;

    // beforeend or afterbegin will insert new element in the same element
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

// With XMLHttpRequest, if any request have the response first -> it will render the data to the html page, and don't care about the order of what function is called like we call portugal first and use is second and vietname is the last.
getCountryData("portugal");
getCountryData("usa");
getCountryData("vietnam"); */

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = "") {
  const html = `
    <article class="country ${className}">
        <img class="country__img" src="${data?.flags?.svg}" />
        <div class="country__data">
            <h3 class="country__name">${
              data?.name?.common || data?.name?.official
            }</h3>
            <h4 class="country__region">${data?.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data?.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data?.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.keys(data?.currencies)[0]
            }</p>
        </div>
    </article>
  `;

  // beforeend or afterbegin will insert new element in the same element
  countriesContainer.insertAdjacentHTML("beforeend", html);
  if (countriesContainer.style.opacity !== 1)
    countriesContainer.style.opacity = 1;
};

/* const getCountryAndNeighbour = function (countryName) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open("GET", `${BASE_CONTRIES_URL}name/${countryName}`);

  request.send();

  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1 data to html page
    renderCountry(data);

    // Get neighbour country 2
    const neighbour = data.borders?.[0];

    if (!neighbour) {
      return;
    }

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `${BASE_CONTRIES_URL}alpha/${neighbour}`);

    request2.send();

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      // Render country 2 data to html page
      renderCountry(data2, "neighbour");
    });
  });
}; */

// getCountryAndNeighbour("usa");

// const request = new XMLHttpRequest();
// request.open("GET", `${BASE_CONTRIES_URL}name/${countryName}`);
// request.send();

///////////////////////////////////////////// PROMISES /////////////////////////////////////////////
/* 
What is the promise?
    An object that is used as a placeholder for the future result of an asynchronous operation.

    Or

    A container for an asynchronous delivered value.

    Or

    A container for a future value (Response for AJAX call)
*/

// const getCountryData = function (country) {
//   // Immediately return a promise
//   fetch(`${BASE_CONTRIES_URL}name/${countryName}`)
//     /* All the promise can call the .then() method
//         In the then method, we need to add the callback function that we want to be executed as soon as promise is actually FULFILLED - as soon as the result is available

//         This function will receive one argument, that argument is the resulting value of fulfilling promise

//     */
//     .then(function (response) {
//       console.log("Reponse of promise: ", response);

//       //   The body of response is hold the data from server response, if you want to read this data, you need to call .json() method. The json() method is available for all response come from fetch function.
//       // The .json actually is also the asynchronous function, it's mean it also will return a promise.

//       //   We need to consume this promise to get the actual data that is comming from fetch function
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

// // The then() method alway return a promise
// const getCountryData = function (country) {
//   // Country 1
//   //   The fetch promise only reject when there is no connection, the status code is 404, the fetch promise will still get fulfulled, no rejected.
//   fetch(`${BASE_CONTRIES_URL}name/${country}`)
//     .then(
//       // The first callback function in .then() method for the fulfilled promised
//       (response) => {
//         console.log("res 1: ", response);

//         if (!response.ok) {
//           // Immediate reject the promise
//           throw new Error(`Country not found (${response.status})`);
//         }

//         return response.json();
//       }
//       // The second callback function is for the rejected
//     )
//     .then((data) => {
//       renderCountry(data?.[0]);
//       //   const neighbour = data[0]?.borders?.[0];
//       const neighbour = "asfads";
//       if (!neighbour) {
//         return "Neighbour does not exists";
//       }
//       //   Country 2
//       return fetch(`${BASE_CONTRIES_URL}alpha/${neighbour}`);
//     })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Can not get the neighbour data (${response.status})`);
//       }
//       return response.json();
//     })
//     .then((data) => renderCountry(data[0], "neighbour"))
//     .catch((error) => {
//       console.error(`${error} ✴✴✴`);
//       renderError(`Something went wrong ✴✴✴ ${error.message}. Try again!`);
//     })

//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// The then() method alway return a promise
const getCountryData = function (country) {
  // Country 1
  //   The fetch promise only reject when there is no connection, the status code is 404, the fetch promise will still get fulfulled, no rejected.
  getJSON(`${BASE_CONTRIES_URL}name/${country}`, "Country not found")
    .then((data) => {
      renderCountry(data?.[0]);
      const neighbour = data[0]?.borders?.[0];

      console.log("neighbour: ", neighbour);
      if (!neighbour) {
        // Immediately return reject promise
        throw new Error("No neighbour found!");
      }
      //   Country 2
      return getJSON(
        `${BASE_CONTRIES_URL}alpha/${neighbour}`,
        "Neighbour not found"
      );
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((error) => {
      console.error(`${error} ✴✴✴`);
      renderError(`Something went wrong ✴✴✴ ${error.message}. Try again!`);
    })

    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const whereAmI = function (lat, lng) {
//   getPosition;
//   getJSON(
//     `${BASE_GEO_URL}${lat},${lng}?geoit=json&auth=${GEO_API_KEY}`,
//     "Wrong went reverse geo!"
//   )
//     .then((data) => {
//       // if(data.)
//       if (data.success === false && data.error?.code === "006") {
//         throw new Error(
//           `Exceed limit request per second. ${data.error?.message}`
//         );
//       }
//       const country = data.country;

//       console.log(`You are in ${data.city}, ${country}`);
//       return fetch(`${BASE_CONTRIES_URL}name/${country}`);
//     })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Country not found (${res.status})`);
//       }
//       return res.json();
//     })
//     .then((data) => renderCountry(data[0]))
//     .catch((err) => {
//       console.error(`Somethings went wrong with reverse geo.\n${err}`);
//     });
// };

// let countryName = "germany";
// btn.addEventListener("click", function () {
//   getCountryData(countryName);
// });

// getCountryData("australia");

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

// Convert into promisify
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // This line of code .getCurrentPosition work as asynchronous way, it running in the webAPI
    navigator.geolocation.getCurrentPosition(
      // (position) => resolve(position),
      // (err) => reject(err)

      // We simply place the resolve and reject as function parameter at here, because the getCurrentPosition default pass the position as argument for thhe first function to handle get position successfully
      resolve,
      reject
    );
  });
};

// Now we handle the result - in the other hand we CONSUME the promise
// getPosition().then((position) => {
//   const { latitude: lat, longitude: lng } = position.coords;
//   console.log(lat, lng);
//   whereAmI(lat, lng);
// });

// const whereAmI = function () {
//   getPosition()
//     .then((position) => {
//       const { latitude: lat, longitude: lng } = position.coords;
//       return getJSON(
//         `${BASE_GEO_URL}${lat},${lng}?geoit=json&auth=${GEO_API_KEY}`,
//         "Wrong went reverse geo!"
//       );
//     })
//     .then((data) => {
//       // if(data.)
//       if (data.success === false && data.error?.code === "006") {
//         throw new Error(
//           `Exceed limit request per second. ${data.error?.message}`
//         );
//       }
//       const country = data.country;

//       console.log(`You are in ${data.city}, ${country}`);
//       return fetch(`${BASE_CONTRIES_URL}name/${country}`);
//     })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`Country not found (${res.status})`);
//       }
//       return res.json();
//     })
//     .then((data) => renderCountry(data[0]))
//     .catch((err) => {
//       console.error(`Somethings went wrong with reverse geo.\n${err}`);
//     });
// };

// btn.addEventListener("click", whereAmI);

/////////////////////////////////// CODING CHALLENGE 2 ///////////////////////////////////

// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path

const imagesContainer = document.querySelector(".images");

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const newImg = document.createElement("img");
    newImg.src = imgPath;

    newImg.addEventListener("load", function () {
      imagesContainer.insertAdjacentElement("beforeend", newImg);
      resolve(newImg);
    });
    newImg.addEventListener("error", function () {
      reject(new Error("Error while loading image"));
    });
  });
};

const imgPath1 = "./img/img-1.jpg";
const imgPath2 = "./img/img-2.jpg";
const imgPath3 = "./img/img-3.jpg";

const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

// let globalImage;
// createImage(imgPath1)
//   .then((image1) => {
//     globalImage = image1;
//     return wait(2);
//   })
//   .then(() => {
//     globalImage.style.display = "none";
//     return createImage(imgPath2);
//   })
//   .then((image2) => {
//     globalImage = image2;
//     return wait(2);
//   })
//   .then(() => (globalImage.style.display = "none"))
//   .catch((error) => console.error(error));

// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise

// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2

// 4. Consume the promise using .then and also add an error handler

// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier

// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that 😉)

// 7. After the second image has loaded, pause execution for 2 seconds again

// 8. After the 2 seconds have passed, hide the current image

const whereAmI = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `${BASE_GEO_URL}${lat},${lng}?geoit=json&auth=${GEO_API_KEY}`
    );

    if (!resGeo.ok) {
      throw new Error(`Encounter problem when fetching location data`);
    }

    const dataGeo = await resGeo.json();

    const res = await fetch(`${BASE_CONTRIES_URL}name/${dataGeo.country}`);
    if (!res.ok) {
      throw new Error(`Encounter problem when fetching country data`);
    }

    const data = await res.json();

    renderCountry(data[0]);
    return data[0];
  } catch (error) {
    console.error(error.message);
    renderError(error.message);
  }
};

// const data = whereAmI();
// data.then((x) => console.log(x));

// try {
//   const x = 10;
//   x = 11;
// } catch (error) {
//   console.error(error.message);
// }
