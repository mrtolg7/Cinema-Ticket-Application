const container = document.querySelector(".container");
const count = document.querySelector('#count');
const amaount = document.querySelector('#amount');
const select = document.querySelector('#movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');

        calculateTotal();
    }
})



select.addEventListener('chanege', function(e) {
    calculateTotal();

})

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatArr = [];
    const seatArr = [];

    selectedSeats.forEach(function(seat){
        selectedSeatArr.push(seat);
    })

    seats.forEach(function(seat){
        seatArr.push(seat);
    })

    // [1,3,5]
    let selectdSeatIndexs = selectedSeatArr.map(function(seat) {
        return seatArr.indexOf(seat);
    })

    console.log(selectdSeatIndexs);

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amaount.innerText = selectedSeatCount * select.value ;

    saveToLocalStorage(selectdSeatIndexs);
}

    function getFromLocalStorage() {

        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

        if( selectedSeats != null && selectedSeats.length > 0) {
            seats.forEach(function(seat, index) {
                if (selectedSeats.indexOf(index) > -1) {
                    seat.classList.add('selected');
                }
            })
        }

        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        
        if ( selectedMovieIndex != null ) {
            select.selectedIndex = selectedMovieIndex;
        }

    }



    function saveToLocalStorage(indexs) {
        localStorage.setItem('selectedSeats', JSON.stringify(indexs));
        localStorage.setItem('selectedMovieIndex', select.selectedIndex);
    }



