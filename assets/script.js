var apiKey = '8cd6c39495c0df975b0917be4909b26d';
var apiUrl = 'https://openweathermap.org/';
var searchBar = document.querySelector('.search-bar');

document.querySelector('.searchCity').addEventListener('submit', function (event) {
    event.preventDefault();

    var city = searchBar.value.trim();
    var catUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;

// fetch
    fetch(catUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (city) {
            console.log(city);
            var lon = city.coord.lon;
            var lat = city.coord.lat;
            console.log(lon, lat);
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    console.log('hello')
                })
        })
});
