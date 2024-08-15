document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    const apiKey = "922ccf3c6e78c8f69c88da4aba427756";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

    async function checkWeather(city) {
        try {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "cloud.png";
                    break;
                case "Rain":
                    weatherIcon.src = "icons8-rain-48.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "icons8-drizzle-64.png";
                    break;
                case "Snow":
                    weatherIcon.src = "icons8-snow-48.png";
                    break;
                case "Clear":
                    weatherIcon.src = "icons8-sun-48.png";
                    break;
                default:
                    weatherIcon.src = "icons8-mist-100.png";
            }
        } catch (error) {
            console.error("Error fetching weather data: ", error);
            alert("Please enter the correct city name.");
        }
        document.querySelector(".weather").style.display="block";
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });
});















