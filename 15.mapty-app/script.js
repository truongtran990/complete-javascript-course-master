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

let map, mapEvent;

// before handle function, check it exists
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log("position: ", position);
      // get the longitude and latitude value
      const { latitude, longitude } = position.coords;
      console.log(
        `${MAP_BASE_URL}@${latitude},${longitude},${DEFAULT_MAP_ZOOM}`
      );

      const coords = [latitude, longitude];

      //   assign map variable
      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map?.on("click", function (mapE) {
        //  assign the mapEvent equal to mapE
        mapEvent = mapE;

        form.classList.remove("hidden");
        // when the use click on the map -> show the form and focus mouse on the distance input
        inputDistance.focus();
      });
    },
    function () {
      alert("Could not get your position");
    }
  );
}

// as you can see, there are 2 varialbe: map and mapEvent does not exists
// so we need create a global variable to store 2 variables
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //   clear input fields before input them
  inputDistance.value = inputDuration.value = inputCadence.value = "";

  // display the marker
  const { lat: currentLatitude, lng: currentLogitude } = mapEvent.latlng;
  // add the current mouse click address to map
  L.marker([currentLatitude, currentLogitude])
    .addTo(map)
    //   binds a popup to the layer with the passed content
    .bindPopup(
      // a new popup instance
      L.popup({
        maxWidth: 250,
        maxHeight: 50,
        //   set to false if you want to do not close the popup when another popup is opened
        autoClose: false,
        //    set to false if you want to do not close the popup when use clicks on the map
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();

  form.classList.add("hidden");
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
