'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const rootEndpoint = 'https://restcountries.com/v2';
const portugalEndpoint = `${rootEndpoint}/name/portugal`;
console.log('portugalEndpoint: ', portugalEndpoint);
const publicAPIGithub = 'https://github.com/public-apis/public-apis';


const getCountryData = function(countryName) {
    // Create a new request
    const request = new XMLHttpRequest();
    // open a new get request with endpoint
    request.open(
        'GET',
        `${rootEndpoint}/name/${countryName}`
    );
    // we can not assign request.send() to a variable. Because it's a asynchronous code, it runs in the background, it was taked time to send and response data.
    request.send();
    // so we need register a callback function to a load event to process data immediately after we get the data from server
    request.addEventListener('load', () => {
        // we will use the this -> this of request context
        const [data] = JSON.parse(request.responseText);
        console.log('data: ', data);
        const htmlCountries = `
        <article class="country">
            <img class="country__img" src=${data['flag']} />
            <div class="country__data">
            <h3 class="country__name">${data['name']}</h3>
            <h4 class="country__region">${data['region']}</h4>
            <p class="country__row"><span>👫</span>${data['population']}</p>
            <p class="country__row"><span>🗣️</span>${data['languages'][0]['name']}</p>
            <p class="country__row"><span>💰</span>${data['currencies'][0]['name']}</p>
            </div>
        </article>
        `;
        console.log('htmlCountries: ', htmlCountries);
        countriesContainer.insertAdjacentHTML(
            'beforeend',
            htmlCountries
        );
        countriesContainer.style.opacity = 1;
    });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('vietnam');