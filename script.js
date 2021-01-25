'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const coordinate = [latitude, longitude];

        // Implement Leaflet
        map = L.map('map').setView(coordinate, 12);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coordinate)
            .addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

        // handleClick on map
        map.on('click', (mapE) => {
            mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
        });
    }, () => {
        alert(`Could not get your position`);
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear field
        inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = ''

        const { lat, lng } = mapEvent.latlng;
        const clickedCoordinate = [lat, lng];

        L.marker(clickedCoordinate)
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup'
            })
        )
        .setPopupContent('workout')
        .openPopup();
    })

    // the part that still need to update //
    inputType.addEventListener('change', () => { 
        inputElevation.closest('.form__row').classList.toggle('form_row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form_row--hidden');
    })