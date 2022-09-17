var apiKey = "aced3c832ed11bbdeba8eca54b432a36";
var formEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
var formBtnEl = document.getElementById("formBtn");
var cityInfoEl = document.querySelector("#city-container");
var forecastEl = document.querySelector("#forecast");


var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if (cityName) {
        retrieveCoordinates(cityName);
        cityInputEl.value = "";
        cityInfoEl.innerHTML = "";
        forecastEl.innerHTML = "";
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&exclude=hourly,minutely&appid="+apiKey;

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
                displayForecast(data);
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
    var condition = data.current.weather[0].main;
    if(condition === "Clouds") {
        var icon = document.createElement('i');
        icon.className = ("fa fa-solid fa-cloud");
        cityInfoEl.appendChild(icon);
    } else if (condition === "Thunderstorm") {
        var icon = document.createElement('i');
        icon.className = ("fa fa-solid fa-cloud-bolt");
        cityInfoEl.appendChild(icon);
    } else if (condition === "Drizzle") {
        var icon = document.createElement('i');
        icon.className = ("fa fa-solid fa-cloud-rain");
        cityInfoEl.appendChild(icon);
    }  else if (condition === "Rain") {
        var icon = document.createElement('i');
        icon.className = ("fa fa-solid fa-cloud-showers-heavy");
        cityInfoEl.appendChild(icon);
    }  else if (condition === "Snow") {
        var icon = document.createElement('i');
        icon.className = ("fa fa-solid fa-snowflake");
        cityInfoEl.appendChild(icon);
    }  else if (condition === "Clear") {
        var icon = document.createElement('i');
        icon.className = ("fa fa-solid fa-sun");
        cityInfoEl.appendChild(icon);
    } else {
        var icon = document.createElement('i');
        icon.className = ("fa fa-solid fa-smog");
        cityInfoEl.appendChild(icon);
    }

    var temp = document.createElement('p');
    temp.textContent = "Temp: "+ Math.ceil(data.current.temp) +"°F";
    cityInfoEl.appendChild(temp);

    var wind = document.createElement('p');
    wind.textContent = "Wind: "+ Math.ceil(data.current.wind_speed)+" MPH";
    cityInfoEl.appendChild(wind);

    var humidity = document.createElement('p');
    humidity.textContent = "Humidity: "+ Math.ceil(data.current.humidity)+"%";
    cityInfoEl.appendChild(humidity);

    var uvi = data.current.uvi;
    var uviEl = document.createElement('p');
    var uviSpan = document.createElement('span');
    uviSpan.textContent = uvi;

    if(uvi<=2) {
        uviSpan.className =("low-uvi")
    } else if(uvi>2 && uvi<=7) {
        uviSpan.className =("moderate-uvi")
    } else if(uvi>7 && uvi<11) {
        uviSpan.className =("high-uvi")
    } else {
        uviSpan.className =("extreme-uvi")
    }
    uviEl.textContent = "UV Index: "
    cityInfoEl.appendChild(uviEl);
    uviEl.appendChild(uviSpan);
};

var displayForecast = data => {
    console.log(data.daily);

    for(var i =1; i < data.daily.length-2; i++) {
        var div = document.createElement("div");
        div.className = "forecast";

        var temp = data.daily[i].temp.day;
        var wind = data.daily[i].wind_speed;
        var humidity = data.daily[i].humidity;

        if(i===1) {
            var date = moment().add(1, 'days').format('L')
        } else if (i===2){
            var date = moment().add(2, 'days').format('L')
        } else if (i===3){
            var date = moment().add(3, 'days').format('L')
        } else if (i===4){
            var date = moment().add(4, 'days').format('L')
        } else if (i===5){
            var date = moment().add(5, 'days').format('L')
        };

        var condition = data.daily[i].weather[0].main;
        if(condition === "Clouds") {
            var icon = document.createElement('i');
            icon.className = ("fa fa-solid fa-cloud");
            div.appendChild(icon);
        } else if (condition === "Thunderstorm") {
            var icon = document.createElement('i');
            icon.className = ("fa fa-solid fa-cloud-bolt");
            div.appendChild(icon);
        } else if (condition === "Drizzle") {
            var icon = document.createElement('i');
            icon.className = ("fa fa-solid fa-cloud-rain");
            div.appendChild(icon);
        }  else if (condition === "Rain") {
            var icon = document.createElement('i');
            icon.className = ("fa fa-solid fa-cloud-showers-heavy");
            div.appendChild(icon);
        }  else if (condition === "Snow") {
            var icon = document.createElement('i');
            icon.className = ("fa fa-solid fa-snowflake");
            div.appendChild(icon);
        }  else if (condition === "Clear") {
            var icon = document.createElement('i');
            icon.className = ("fa fa-solid fa-sun");
            div.appendChild(icon);
        } else {
            var icon = document.createElement('i');
            icon.className = ("fa fa-solid fa-smog");
            div.appendChild(icon);
        }

        var dateEl = document.createElement("h4");
        dateEl.textContent = date;
        div.appendChild(dateEl);

        var tempEl = document.createElement("p");
        tempEl.textContent="Temp: "+ Math.ceil(temp) +"°F";
        div.appendChild(tempEl);

        var windEl = document.createElement("p");
        windEl.textContent="Wind: "+ Math.ceil(wind)+" MPH";
        div.appendChild(windEl);

        var humidityEl = document.createElement("p");
        humidityEl.textContent="Humidity: "+ Math.ceil(humidity)+"%";
        div.appendChild(humidityEl);

        forecastEl.appendChild(div);
    }
};

formEl.addEventListener("submit", formSubmitHandler);