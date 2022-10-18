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