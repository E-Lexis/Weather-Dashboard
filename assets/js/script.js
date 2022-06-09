var apiKey = 'b584a7877659513a88047ad6c6507db9';

var searchHistory = (localStorage.searchHistory) ? JSON.parse(localStorage.searchHistory) : [];
document.querySelector("#search").addEventListener("click", () => {
    searchHistory.push(document.querySelector("#city").value);
    localStorage.searchHistory = JSON.stringify(searchHistory);

    if (searchHistory.length > 5) {
        searchHistory.pop();
    }
});

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

function displayWeather(data) {
    var cityName = data.name;
                var cityLat = data.lat;
                var cityLon = data.lon;
    
                document.getElementById("current-city").innerText = cityName;
    
                var weatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude={part}&appid=" + apiKey;

                fetch(weatherUrl).then(function(response) {
                    // request was successful
                    if (response.ok) {
                      response.json().then(function(data) {
                        document.getElementById("current-temperature").innerText = data.current.temp;
                        document.getElementById("current-wind_speed").innerText = data.current.wind_speed;
                        document.getElementById("current-humidity").innerText = data.current.humidity;
                        document.getElementById("current-uvi").innerText = data.current.uvi; 
                      });
                    }
                    else {
                        document.getElementById("current-temperature").innerText = ''
                        document.getElementById("current-wind_speed").innerText = ''
                        document.getElementById("current-humidity").innerText = ''
                        document.getElementById("current-uvi").innerText = '' 
                    }
                  });
};
                    
function getWeather(searchInput) {

    var cityUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + searchInput + "&limit=3l&appid=" + apiKey;

    fetch(cityUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(cityData) {
            displayWeather(cityData);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
        
};