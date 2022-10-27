/* 
///////////////////////////// CODING CHALLENGE AT CHAP16 - ASYNCHRONOUS
In this challenge you will build a function 'WhereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:
PART 1:
    1. Create a fucntion 'whereAmI' which takes as inputs a latitude value (lat) and longtitude value (lng) (these are GPS coordinates, examples are below).
    2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
    The AJAX call will be done to a URL with this format:
    https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating.
    3. Once you have the data, take a look at in the console to see all the attributes that you received about the provided location. Then, using this data log a message like this to the console: 'You are in Berlin, Germany'
    4. Chain a .catch method to the end of the promise chain and log errors to the console
    5. This API allow you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the reqeust. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaniful error message.

    PART 2:
    6. Now it's time to use the received data to render a country. So take the relevant attribut from the geodoing API result, and blug it into the countries APi that wehave been using.
    7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

    TEST COORDINATES 1: 52.803, 13.381 (Latitude, Longtitude)
    TEST COORDINATES 2: 19.037, 72.873
    TEST COORDINATES 3: -33.933, 18.474

    
*/
// const rootGeoEnpoint = 'https://geocode.xyz';
// const geoApiKey = '786858046131348759256x94117';

// const getCountryName = async (lat='52.803', lng='13.381') => {
//     try {
//         const response = await fetch(
//             `${rootGeoEnpoint}/${lat},${lng}?geoit=json&auth=${geoApiKey}`,
//         )
//         try {
//             return await response.json();
//         } catch (error) {
//             console.log(error);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// const name = getCountryName();
// console.log(name);


/* 
/////////////////////////////////////////
// Coding Challenge #2

Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some sturff  on your own. Pretend you're woking on your own.

PART 1.
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image paht. when the image is done loding, append it to the DOM element with the 'images' class, and resolve the promise. The fullilled value should be the image element itself. In case there is an error loding the image ('error' event), reject the promise.

If this part too tricky for you, just watch the first part of the solution.


PART 2.
1. Consume the promise using .then and also add an error handler;
2. After the image loaded, pause execution for 2 seconds using the wait function we created earlier;
3. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promsie to hide the current image. You will need a global variable for that);
4. After the second image has loaded, pause execution for 2 seconds again;
5. After the 2 seconds have passed, hide the current image

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the nework speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK!!!
*/







/* 
PART 1
    Write an async function 'loadNPause' that recreates coding challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more. Don't forget to test, the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
    1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
    2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
    3. Check out the 'imgs'array in the console! Is it like you expected?
    4. Use a promise combinator function to actually get the images from the array
    5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg', ]. to test, turn off the 'loadNPause'.

*/


const wait = (seconds) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve
        }, seconds * 1000);
    })
}

const imgContainer = document.querySelector('.images');

const createImage = (imgPath) => {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = imgPath;

        img.addEventListener('load', () => {
            imgContainer.append(img);
            resolve(img);
        })
        img.addEventListener('error', () => {
            reject(new Error('Image not found'));
        })
    })
}