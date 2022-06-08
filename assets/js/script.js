$("#search").on("click", function () {
    event.preventDefault();
    var searchInput = document.querySelector("#city").value;
    getWeather(searchInput);
});

function getWeather(searchInput) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&units=imperial&appid={API key}" ;

    fetch(weatherURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data, weather);
            });
        }
        else {
            //Modal that states city not found
        }
    });

};