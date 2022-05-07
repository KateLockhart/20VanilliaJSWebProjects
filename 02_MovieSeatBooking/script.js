const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSeat = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSeat.ariaValueMax;
// console.log(typeof ticketPrice) // determine type from string to int

// Save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //console.log(selectedSeats); // Seats return as a NodeList

    // Copy selected seats into arr, map through, return new arr of indexes to save in local storage
    // If item is not in array .indexOf() will return -1
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //console.log(seatsIndex); // Checking for index functionality

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    //console.log(e.target.selectedIndex, e.target.value); // Distinguishing movie selected & price from dropdown to save in local storage
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Seat click event
container.addEventListener('click', (e) => {
    //console.log(e.target); // gives element that is clicked
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //console.log(e.target);
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial count and total set, updates both count and total
updateSelectedCount();