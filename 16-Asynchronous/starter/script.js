'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const rootEndpoint = 'https://restcountries.com/v2';
const portugalEndpoint = `${rootEndpoint}/name/portugal`;
console.log('portugalEndpoint: ', portugalEndpoint);
const publicAPIGithub = 'https://github.com/public-apis/public-apis';


const renderCountry = function(data, className='') {
    const htmlCountries = `
    <article class="country" ${className}>
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
}

const renderError = (errorMsg) => {
    countriesContainer.insertAdjacentText('beforeend', errorMsg);
    countriesContainer.style.opacity = 1;
};


// const getCountryAndNeighbour = function(countryName) {
//     // Create a new request
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     // open a new get request with endpoint
//     request.open(
//         'GET',
//         `${rootEndpoint}/name/${countryName}`
//     );
//     // we can not assign request.send() to a variable. Because it's a asynchronous code, it runs in the background, it was taked time to send and response data.
//     request.send();
//     // so we need register a callback function to a load event to process data immediately after we get the data from server
//     request.addEventListener('load', () => {
//         // we will use the this -> this of request context
//         const [data] = JSON.parse(request.responseText);
//         console.log('data: ', data);

//         // Render country 1
//         renderCountry(data);


//         // Get neighbour country (2)
//         const neighbour = data?.borders?.[0];
//         if (!neighbour) {
//             return;
//         }
//         // AJAX call country 2
//         console.log('neighbour: ', neighbour);
//         const request2 = new XMLHttpRequest();
//         // open a new get request with endpoint
//         request2.open(
//             'GET',
//             `${rootEndpoint}/alpha/${neighbour}`
//         );
//         // we can not assign request2.send() to a variable. Because it's a asynchronous code, it runs in the background, it was taked time to send and response data.
//         request2.send();

//         request2.addEventListener('load', () => {
//             const neighbourData = JSON.parse(request2.responseText);
//             console.log('Request two times for - neighbourData: ', neighbourData);

//             renderCountry(neighbourData);
//         });

//     });
// };

// getCountryAndNeighbour('portugal');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('vietnam');

// const timeToLive = 0;

// ################################# CALLBACK HELL #################################
/* Asynchronous code is not block the current execution engineer
    Go to the next code
    But sometimes, we want to wait some action until the background task fisnishes 
    Now, We need implement the another callback inside the first callback function.
    for more information, please visit at: https://anhtruong.it.com/
*/
// CALLBACK HELL
// setTimeout(() => {
//     console.log('Log setTimeOut at: ', 1);
//     setTimeout(() => {
//         console.log('Log setTimeOut at: ', 2);
//         setTimeout(() => {
//             console.log('Log setTimeOut at: ', 3);
//             setTimeout(() => {
//                 console.log('Log setTimeOut at: ', 4);
                
//             }, 1000);            
//         }, 1000);        
//     }, 1000);    
// }, 1000);


/* 
################################## PROMISE ################################## 
*/

const getJSON = (url, errorMsg='Something went wrong') => {
    return fetch(url)
        .then(response => {
            console.log('response: ', response);
            if (!response.ok) {
                throw new Error(`${errorMsg} ${response?.status}`);
            }
            return response.json();            
        })
}

const getCountryData = (countryName) => {

    return getJSON(
        `${rootEndpoint}/name/${countryName}`,
        'Country not found'
    )
        .then(data => {
            renderCountry(data[0])
            const neighbour = data?.[0].borders?.[0];
            console.log('neighbour: ', neighbour);

            if (!neighbour) {
                throw new Error(`No neighbour can be found!`);
            }
            return getJSON(
                `${rootEndpoint}/alpha/${neighbour}`,
                'Country not found'
            )            
        })
        .then(data => renderCountry(data, 'neighbour'))
        .catch(error => {
            console.error(`${error} 🎇🎇🎇`);
            renderError(`Something went wrong!!! 🎇🎇🎇 ${error.message}. Try again!`)
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        })
}

const rootGeoEnpoint = 'https://geocode.xyz';
const geoApiKey = '786858046131348759256x94117';

const getGeocode = (lat='52.803', lng='13.381') => {
    return fetch(
        `${rootGeoEnpoint}/${lat},${lng}?geoit=json&auth=${geoApiKey}`,
        error => {
            console.log('Something went wrong: ', error);
            throw new Error(`Something went wrong${error}`)
        }
    )
        .then(response => {
            console.log('response: ', response);

            if (!response.ok) {
                throw new Error(`Message: ${response.message}! Status code: ${response.status}`)
            }
            return response.json()
        })
        .then(data => {
            console.log('data: ', data);
            const countryName = data.country
            console.log('countryName at getGeocode: ', countryName);
            // return getCountryName(countryName);
            return fetch(
                `${rootEndpoint}/name/${countryName}`,
            );
        })
        .then(response => {
            console.log('response: ', response);
            if (!response.ok) {
                throw new Error(`${errorMsg} ${response?.status}`);
            }
            return response.json();            
        })
        .then(data => {
            renderCountry(data[0])
        })
}

getGeocode();
getGeocode(19.037, 72.873);
getGeocode(-33.933, 18.474);
