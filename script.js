/*const apiKey = "efcb9800a7c270d9047a647a53293ca9";

async function getWeather() {

    const city = document.getElementById("city").value;

    if (city === "") return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.cod != "200") {
        alert("City not found");
        return;
    }

    document.getElementById("location").innerHTML = data.name;

    document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";

    document.getElementById("condition").innerHTML = data.weather[0].main;

    document.getElementById("humidity").innerHTML = data.main.humidity + "%";

    // document.getElementById("wind").innerHTML=data.wind.speed+" km/h";
    const wind = (data.wind.speed * 3.6).toFixed(1);
    document.getElementById("wind").innerHTML = wind + " km/h";

    document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    changeBackground(data.weather[0].main);

}

function changeBackground(weather) {

    document.body.className = "";

    switch (weather) {

        case "Clear":
            document.body.classList.add("clear");
            break;

        case "Clouds":
            document.body.classList.add("clouds");
            break;

        case "Rain":
        case "Drizzle":
            document.body.classList.add("rain");
            break;

        case "Snow":
            document.body.classList.add("snow");
            break;

        case "Thunderstorm":
            document.body.classList.add("thunderstorm");
            break;

        default:
            document.body.classList.add("clear");
    }

}

*/

const apiKey = "efcb9800a7c270d9047a647a53293ca9";

async function getWeather() {
    let location = document.getElementById("city").value.trim();

    if (!location) {
        alert("Please enter a city, municipality, or province.");
        return;
    }

    try {
        // Search the location using the Geocoding API
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)},PH&limit=1&appid=${apiKey}`;

        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            alert("Location not found.");
            return;
        }

        const { lat, lon, name, state, country } = geoData[0];

        // Fetch weather using coordinates
        const weatherUrl =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        const weatherResponse = await fetch(weatherUrl);
        const data = await weatherResponse.json();

        document.getElementById("location").innerHTML =
            `${name}${state ? ", " + state : ""}, ${country}`;

        document.getElementById("temp").innerHTML =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("condition").innerHTML =
            data.weather[0].description
                .replace(/\b\w/g, c => c.toUpperCase());

        document.getElementById("humidity").innerHTML =
            `${data.main.humidity}%`;

        document.getElementById("wind").innerHTML =
            `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

        document.getElementById("icon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        document.getElementById("icon").alt =
            data.weather[0].description;

        changeBackground(data.weather[0].main);

    } catch (error) {
        console.error(error);
        alert("Unable to retrieve weather data.");
    }
}

function changeBackground(weather) {

    document.body.className = "";

    switch (weather) {

        case "Clear":
            document.body.classList.add("clear");
            break;

        case "Clouds":
            document.body.classList.add("clouds");
            break;

        case "Rain":
        case "Drizzle":
            document.body.classList.add("rain");
            break;

        case "Snow":
            document.body.classList.add("snow");
            break;

        case "Thunderstorm":
            document.body.classList.add("thunderstorm");
            break;

        default:
            document.body.classList.add("clear");
    }
}

function updateDateTime() {

    const now = new Date();

    const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };

    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    document.getElementById("currentDate").textContent =
        now.toLocaleDateString("en-US", dateOptions);

    document.getElementById("currentTime").textContent =
        now.toLocaleTimeString("en-US", timeOptions);
}

updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);

document.getElementById("city").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});