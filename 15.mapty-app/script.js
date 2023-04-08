"use strict";

/* 
/////////////////////////// PROJECT PLANNING ///////////////////////////
*/

const MAP_BASE_URL = "https://www.google.com/maps/";
let DEFAULT_MAP_ZOOM = "15z";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
  date = new Date();
  clicks = 0;

  constructor(coords, distance, duration) {
    this.id = Date.now() + "";
    this.coords = coords;
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.type = "running";
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  type = "cycling";
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDescription();
  }
  calcSpeed() {
    // km/h
    this.speed = this.distance / this.duration;
    return this.speed;
  }
}

// const run1 = new Running([1, 2], 10, 1, 10);
// const cycle1 = new Cycling([1, 2], 20, 2, 20);

// console.log(run1);
// console.log(cycle1);

// APPLICATION ARCHITECTURE
class App {
  // to keep the properties private
  #map;
  #mapEvent;
  #workouts = [];
  #DEFAULT_MAP_ZOOM = 13;

  // the constructor function will be called asap when the new object is created
  constructor() {
    // load the map based on the current position when the new object is created
    this._getPosition();

    // as you can see, there are 2 varialbe: map and mapEvent does not exists
    // so we need create a global variable to store 2 variables
    // the submit event with form element will trigger when any input element is enter key is press
    form.addEventListener("submit", this._newWorkout.bind(this));

    inputType.addEventListener("change", this._toggleElevationField);

    containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
  }

  _getPosition() {
    console.log("this in _getPosotion", this);
    // before handle function, check it exists
    if (navigator.geolocation) {
      // this._loadMap is call as a callback function in the getCurrentPosition in leaflef. indeed, this function is called as regular function, not is the method called.
      // this._loadMap is the callback function, we not call it by ourself - App's instance
      // if you want to bind the this keyword into the _loadMap function, we need to use the bind function
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        // this._loadMap,
        function () {
          alert("Could not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    //   console.log("position: ", position);
    // get the longitude and latitude value
    const { latitude, longitude } = position.coords;
    console.log(`${MAP_BASE_URL}@${latitude},${longitude},${DEFAULT_MAP_ZOOM}`);

    const coords = [latitude, longitude];

    console.log("this at _loadMap", this);
    //   assign map variable
    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map?.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    //  assign the mapEvent equal to mapE
    this.#mapEvent = mapE;

    form.classList.remove("hidden");
    // when the use click on the map -> show the form and focus mouse on the distance input
    inputDistance.focus();
  }

  _hideForm() {
    // Empty input
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        "";
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => {
      form.style.display = "grid";
    }, 1000);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(event) {
    // input is the array and when call validInputs pass argument as many as you want
    const validInputs = (...inputs) => {
      console.log(inputs);
      return inputs.every((inp) => Number.isFinite(inp));
    };

    const allPositive = (...inputs) => {
      return inputs.every((inp) => inp > 0);
    };

    event.preventDefault();

    // Get data from form
    const type = inputType.value;
    console.log(type);
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    // Render workout on maps as marker
    console.log("this.#mapEvent", this.#mapEvent.latlng);
    const { lat: currentLatitude, lng: currentLogitude } =
      this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === "running") {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert("Inputs have to be positive numbers");
      }
      workout = new Running(
        [currentLatitude, currentLogitude],
        distance,
        duration,
        cadence
      );
    }

    // If workout cycling, create cycling object
    if (type === "cycling") {
      const elevation = +inputElevation.value;
      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert("Inputs have to be positive numbers");
      }
      workout = new Cycling(
        [currentLatitude, currentLogitude],
        distance,
        duration,
        elevation
      );
    }
    console.log(workout);

    // Add new object to workout array
    this.#workouts.push(workout);

    // add the current mouse click address to map
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkouts(workout);

    // Hide form and clear input fields before input them
    this._hideForm();

    console.log("this at _newWorkout", this.#mapEvent);
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
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
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkouts(workout) {
    let htmlWorkout = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>  
    `;

    if (workout.type === "running") {
      htmlWorkout += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>      
      `;
    }
    if (workout.type === "cycling") {
      htmlWorkout += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>   
      `;
    }

    // add element in after the form element
    form.insertAdjacentHTML("afterend", htmlWorkout);
  }

  _moveToPopup(event) {
    console.log(event.target);
    const workoutEl = event.target.closest(".workout");
    console.log("workoutEl", workoutEl);

    if (!workoutEl) {
      return;
    }
    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );
    console.log(workout);

    this.#map.setView(workout.coords, this.#DEFAULT_MAP_ZOOM, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the public interface
    workout.click();
  }
}

const app = new App();
