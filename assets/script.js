var apiKey = '8cd6c39495c0df975b0917be4909b26d';
var apiUrl = 'https://api.openweathermap.org/data/2.5/';
var searchBar = document.querySelector('.search-bar');

var city = document.querySelector('.city');
var temperature = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');

var fiveDay = document.querySelector('.fiveDay');

//var recentContainer = $("#recent")
//var clear = $("#clearHistory");

//renderRecents();

/*clear.on("click", function() {
    localStorage.removeItem("recents");
    recentSearches.length = 0;
    renderRecents();
    console.log('clear')
  });
  */

// function that shows the weather
function showWeather(weather) {
    city.textContent = weather.city.name;
    temperature.textContent = `Temperature: ${weather.list[0].main.temp} fahrenheit`;
    humidity.textContent = `Humidity: ${weather.list[0].main.humidity}%`;
    wind.textContent = `Wind: ${weather.list[0].wind.speed}mph`;
}


// five day forecast
function fiveDayForecast(weather) {
    console.log(weather)

    for (var index = 0; index < weather.list.length; index = index + 8) {
        console.log(weather.list[index])
        var html = ` <div class="card col-2">
        <h2 class="date">Date</h2>
        <p class="temp">Temperature: ${weather.list[index].main.temp}</p>
        <p class="humidity">Humidity: ${weather.list[index].main.temp} </p>
        <p class="wind">Wind speed: ${weather.list[index].wind.speed} </p>
    </div>`
        fiveDay.insertAdjacentHTML('beforeend', html)
    }
}

// addEventListener when pressed 'submit'
document.querySelector('#city-search').addEventListener('submit', function (event) {
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

            // fetch forecast data using lat and lon
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    showWeather(data)
                    fiveDayForecast(data)
                })
        })
});


