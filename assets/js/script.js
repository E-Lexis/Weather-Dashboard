var apiKey = 'b584a7877659513a88047ad6c6507db9';


//Local storage
var searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
document.querySelector("#search").addEventListener("click", () => {
    searchHistory.push(document.querySelector("#city").value);
    localStorage.searchHistory = JSON.stringify(searchHistory);
});

if (searchHistory.length > 5) {
    searchHistory.shift();
}

//Creates a button for each previously searched city
var data = document.querySelector("#search-history");
searchHistory.forEach((search) => {
    searchEl = document.createElement("button");
    searchEl.innerHTML = search;
    data.appendChild(searchEl);
});

$("#search").on("click", function () {
    event.preventDefault();
    var searchInput = document.querySelector("#city").value;
    getWeather(searchInput);
});


//Geocodes city name to find latitude and longitude
function getWeather(searchInput) {

    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=1&appid=" + apiKey;

    fetch(cityUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(cityData) {
            console.log(cityData);
          
            document.getElementById("current-city").innerText = cityData[0].name;
            displayWeather(cityData[0].lat, cityData[0].lon);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
    });
        
};

//Gets API data and displays it on the page
function displayWeather(lat, lon) {
    
    var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=" + apiKey;

    fetch(weatherUrl).then(function(response) {
        if (response.ok) {
        response.json().then(function(weatherData) {
            console.log(weatherData);
            document.getElementById("current-date").innerText = new Date(weatherData.current.dt * 1000).toLocaleDateString("en-US");
            document.getElementById("current-temp").innerText = weatherData.current.temp;
            document.getElementById("current-wind_speed").innerText = weatherData.current.wind_speed;
            document.getElementById("current-humidity").innerText = weatherData.current.humidity;
            document.getElementById("current-uvi").innerText = weatherData.current.uvi; 
            
            //Fills cards for 5-day forecast
            for (var i = 0; i < 5; i++) {
                document.getElementById("d"+i+"-date").innerText = new Date(weatherData.daily[i].dt * 1000).toLocaleDateString("en-US");
                document.getElementById("d"+i+"-temp").innerText = weatherData.daily[i].temp.day;
                document.getElementById("d"+i+"-wind_speed").innerText = weatherData.daily[i].wind_speed;
                document.getElementById("d"+i+"-humidity").innerText = weatherData.daily[i].humidity;
                document.getElementById("d"+i+"-uvi").innerText = weatherData.daily[i].uvi; 
            }
        });
        }
        else {
            document.getElementById("current-temp").innerText = ''
            document.getElementById("current-wind_speed").innerText = ''
            document.getElementById("current-humidity").innerText = ''
            document.getElementById("current-uvi").innerText = ''
        }
    });
};