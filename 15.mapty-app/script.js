"use strict";

/* 
/////////////////////////// PROJECT PLANNING ///////////////////////////
*/

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MAP_BASE_URL = "https://www.google.com/maps/";
let DEFAULT_MAP_ZOOM = "15z";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// before handle function, check it exists
if (navigator?.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log("position: ", position);
      // get the longitude and latitude value
      const { latitude, longitude } = position.coords;
      console.log(
        `${MAP_BASE_URL}@${latitude},${longitude},${DEFAULT_MAP_ZOOM}`
      );

      const coords = [latitude, longitude];

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
    },
    function () {
      alert("Could not get your position");
    }
  );
}
