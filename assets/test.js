var apiKey = '8cd6c39495c0df975b0917be4909b26d';
var apiUrl = 'https://api.openweathermap.org/data/2.5/';
var searchBar = document.querySelector('.search-bar');
var city = document.querySelector('.city');
var temperature = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var wind = document.querySelector('.wind');
var topContainer = document.querySelector('.weather');
var fiveDayHeader = document.querySelector('.fiveDayHeader')
var fiveDay = document.querySelector('.fiveDay');
var addToHistory = JSON.parse(localStorage.getItem('search-history')) || [];


recentContainer = $("#recent");


var date = document.querySelector("#date");
const currentDate = dayjs();
date.textContent = currentDate.format("MMMM D, YYYY");

//var clear = $("#clearHistory");


// function that shows the weather
function showWeather(weather) {
    city.textContent = weather.city.name;
    temperature.textContent = `Temperature: ${weather.list[0].main.temp} fahrenheit`;
    humidity.textContent = `Humidity: ${weather.list[0].main.humidity}%`;
    wind.textContent = `Wind: ${weather.list[0].wind.speed}mph`;
    topContainer.classList.remove("hide");
    fiveDayHeader.classList.remove("hide");
}


// five day forecast
function fiveDayForecast(weather) {
    console.log(weather)

    for (var index = 0; index < weather.list.length; index = index + 8) {
        console.log(weather.list[index])
        var html = ` <div class="card col-2">
        <h2 class="date"> ${dayjs(weather.list[index].dt_txt).format("MMMM D, YYYY")} </h2>
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

    // save city history to localStorage
    function setLocalStorage(city) {
        if (addToHistory.indexOf(city) === -1) {
            addToHistory.push(city);
            localStorage.setItem("search-history", JSON.stringify(addToHistory));
            displayHistory();
        }
    }
    setLocalStorage(city);

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

// history of previously searched cities
function displayHistory() {
    recentContainer.empty();

    for (let i = 0; i < addToHistory.length; i++) {
        var recentInput = $("<input>");
        recentInput.attr("type", "text");
        recentInput.attr("readonly", true);
        recentInput.attr("class", "form-control-lg text-black");
        recentInput.attr("value", addToHistory[i]);
        recentInput.on("click", function () {
            getWeather($(this).attr(“value”));
            function setLocalStorage(city) {
                if (addToHistory.indexOf(city) === -1) {
                    addToHistory.push(city);
                    localStorage.setItem("search-history", JSON.stringify(addToHistory));
                    displayHistory();
                }
            }
            /*var catUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${addToHistory[i]}&units=imperial`;
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
        });*/
            recentContainer.prepend(recentInput);
        }
}

    async function getWeather(city) {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/'; +
            city +
            "&units=imperial&appid=8cd6c39495c0df975b0917be4909b26d";
        var response = await fetch(apiUrl);
        if (response.ok) {
            var data = await response.json();
            var nameValue = data.name;
            var tempValue = data.main.temp;
            var humidityValue = data.main.humidity;
            var windValue = data.wind.speed;
            console.log(data);
            var lat = data.coord.lon;
            var lon = data.coord.lat;


            // Fetch weather data for the selected city
            // Update HTML elements with the weather information
        }

        function setLocalStorage(city) {
            if (addToHistory.indexOf(city) === -1) {
                addToHistory.push(city);
                localStorage.setItem("search-history", JSON.stringify(addToHistory));
                displayHistory();
            }
        }


