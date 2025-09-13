const apiKey = "e85a026eab758b07dfa8b22ecd87d07c"; 
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const tempEl = document.querySelector(".temp");
const cityEl = document.querySelector(".city");
const descEl = document.querySelector(".desc");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const weatherIcon = document.getElementById("weather-icon");

function toPersianNumber(num) {
  return num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
}

function updateWeatherIcon(main) {
  main = main.toLowerCase();
  weatherIcon.classList.remove("animate");
  setTimeout(() => weatherIcon.classList.add("animate"), 50);
  if(main === "rain" || main === "drizzle" || main === "thunderstorm") {
    weatherIcon.src = "./src/images/rain.png";
  } else if(main === "clear") {
    weatherIcon.src = "./src/images/sun.png";
  } else if(main === "clouds") {
    weatherIcon.src = "./src/images/cloud.png";
  } else {
    weatherIcon.src = "./src/images/weather.png";
  }
}

async function getWeather(city) {
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`;
  const response = await fetch(url);
  if (!response.ok) {
    alert("شهر پیدا نشد!");
    return;
  }
  const data = await response.json();
  [tempEl, cityEl, descEl, humidityEl, windEl, weatherIcon].forEach(el => {
    el.classList.add("fade-out");
  });
  setTimeout(() => {
    cityEl.textContent = data.name;
    descEl.textContent = data.weather[0].description;
    humidityEl.textContent = `${toPersianNumber(data.main.humidity)}%`;
    windEl.textContent = `${toPersianNumber(Math.round(data.wind.speed * 3.6))} km/h`;
    tempEl.textContent = `${toPersianNumber(Math.round(data.main.temp))}°C`;
    updateWeatherIcon(data.weather[0].main);
    [tempEl, cityEl, descEl, humidityEl, windEl, weatherIcon].forEach(el => {
      el.classList.remove("fade-out");
      el.classList.add("fade-in");
    });
    setTimeout(() => {
      [tempEl, cityEl, descEl, humidityEl, windEl, weatherIcon].forEach(el => {
        el.classList.remove("fade-in");
      });
    }, 1000);
  }, 300);
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city !== "") {
      getWeather(city);
    }
  }
});

window.addEventListener("load", () => {
  getWeather("Tehran,IR");
});
