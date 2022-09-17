var apiKey = "aced3c832ed11bbdeba8eca54b432a36";
var formEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
var formBtnEl = document.getElementById("formBtn");
var cityInfoEl = document.querySelector("#city-container");


var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if (cityName) {
        retrieveCoordinates(cityName);
        cityInputEl.value = "";
        cityInfoEl.innerHTML = "";
    } else {
        alert("Please enter a city.");
    }
};

var retrieveCoordinates = function(city) {
    console.log(city);
    var apiUrl="https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid="+apiKey;

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                var lat = data[0].lat;
                var lon = data[0].lon;
                var city = data[0].name;

                var dateEl = document.createElement('span');
                dateEl.textContent = " (" + moment().format('L') + ")";
                console.log(moment().format('L'));

                var cityTitle = document.createElement('h3');
                cityTitle.textContent = city;
                cityInfoEl.appendChild(cityTitle);
                cityTitle.appendChild(dateEl);

                fetchWeather(lat, lon);
            });
        } else {
            alert('Error: Unable to connect to OpenWeatherMap.org');
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeatherMap");
    });
};

var fetchWeather = function(lat,lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=hourly,daily&appid="+apiKey;

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
            });
        } else {
            alert('Error: Unable to connect to OpenWeatherMap.org');
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeatherMap");
    });
};

var displayWeather = data => {
    var temp = document.createElement('p');
    temp.textContent = "Temp: "+ Math.ceil(data.current.temp) +"°F";
    cityInfoEl.appendChild(temp);

    var wind = document.createElement('p');
    wind.textContent = "Wind: "+ Math.ceil(data.current.wind_speed)+" MPH";
    cityInfoEl.appendChild(wind);

    var humidity = document.createElement('p');
    humidity.textContent = "Humidity: "+ Math.ceil(data.current.humidity)+"%";
    cityInfoEl.appendChild(humidity);

    var uvi = document.createElement('p');
    uvi.textContent = "UV Index: "+ data.current.uvi;
    cityInfoEl.appendChild(uvi);
};


formEl.addEventListener("submit", formSubmitHandler);