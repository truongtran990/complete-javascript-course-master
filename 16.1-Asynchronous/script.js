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

///////////////////////////////////////////// XMLHttpRequest /////////////////////////////////////////////

const getCountryData = function (countryName) {
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

getCountryData("portugal");
getCountryData("usa");
getCountryData("vietnam");
