const apiKey = "da5cc509bc967933cf9f957a7a06eb9b";

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Enter city name");
        return;
    }

    try {
        const currentRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const currentData = await currentRes.json();

        if (currentData.cod !== 200) {
            alert(currentData.message);
            return;
        }

        document.getElementById("cityName").textContent = currentData.name;
        document.getElementById("temperature").textContent =
            `Temperature: ${Math.round(currentData.main.temp)}°C`;
        document.getElementById("description").textContent =
            currentData.weather[0].description;

        const icon = currentData.weather[0].icon;

        document.querySelector(".current-weather .icon").innerHTML =
            `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`;

        changeBackground(currentData.weather[0].main.toLowerCase());

        // Forecast
        const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        const forecastData = await forecastRes.json();

        const forecastDays = document.querySelectorAll(".day");

        forecastDays.forEach((day, index) => {
            const forecast = forecastData.list[index * 8];
            if (!forecast) return;

            const weekday = new Date(forecast.dt_txt)
                .toLocaleDateString("en-US", { weekday: "long" });

            day.querySelector(".weekday").textContent = weekday;
            day.querySelector(".temp").textContent =
                `${Math.round(forecast.main.temp)}°C`;

            day.querySelector(".icon").innerHTML =
                `<img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">`;
        });

    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
}

function changeBackground(condition) {
    const body = document.body;
    body.className = "";

    if (condition.includes("clear")) body.classList.add("clear");
    else if (condition.includes("cloud")) body.classList.add("clouds");
    else if (condition.includes("rain")) body.classList.add("rain");
    else if (condition.includes("snow")) body.classList.add("snow");
    else body.classList.add("default");
}
