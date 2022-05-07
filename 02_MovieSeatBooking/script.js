const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSeat = document.getElementById('movie');

const ticketPrice = +movieSeat.ariaValueMax;
// console.log(typeof ticketPrice) // determine type from string to int

container.addEventListener('click', (e) => {
    //console.log(e.target); // gives element that is clicked
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        //console.log(e.target);
        e.target.classList.toggle('selected');
    }
})