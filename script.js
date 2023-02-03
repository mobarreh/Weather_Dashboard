//API key
const apiKey = "456382b69ba78bc0d18ae825d9b6baff";

const historyElement = document.getElementById("history");

const input = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
//Setting variables for weather information inputs
const currentDate = moment().format("(L)");
const currentTemperature = document.getElementById("temperature");
const currentHumidity = document.getElementById("humidity");
const currentWindSpeed = document.getElementById("wind-speed");
const currentUV = document.getElementById("UV-index");
const currentIcon = document.getElementById("current-icon");
const current = document.querySelector(".current")
const forecast = document.querySelector(".forecast");
//Setting variable for button
const button = document.getElementById("search-button");

// Fetching the API
function currentWeatherApi(city) {

    let currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(currentWeatherApi)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        let nameValue = data.name;
        cityName.innerHTML = nameValue + " " + currentDate;
        console.log(nameValue);
  
        let currentIconValue = data.weather[0].icon;
        currentIcon.innerHTML = "Icon:" + currentIconValue;
        currentIcon.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" + currentIconValue + "@2x.png"
        );
        console.log(currentIconValue);

        let tempValue = data.main.temp;
        let celsiusTemp = tempValue - 273.15;
        currentTemperature.innerHTML =
          "Temp:" + " " + Math.floor(celsiusTemp) + "°C";
        console.log(tempValue);
  
        let humidityValue = data.main.humidity;
        currentHumidity.innerHTML = "Humidity:" + " " + humidityValue + "%";
        console.log(humidityValue);
  
        let windSpeedValue = data.wind.speed;
        currentWindSpeed.innerHTML = "Wind:" + " " + windSpeedValue + " " + "MPH";
        console.log(windSpeedValue);
        let latitude = data.coord.lat;
        let longitude = data.coord.lon;
        console.log(data.coord);
        getForecast(latitude, longitude)
        
      });
  }

  function getForecast(latitude, longitude){
    let oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
        fetch(oneCallApi)
          .then(function (response) {
            return response.json();
          })

          .then(function (data) {
            console.log(data);
            fiveDayForecast(data)
            const uvButton = document.createElement("button");
            uvButton.classList.add("btn");
            vButton.innerHTML = data.current.uvi;
        
          if (data.current.uvi < 3) {
            uvButton.classList.add("btn-success");
          }
          else if (data.current.uvi < 7) {
            uvButton.classList.add("btn-warning");
          }
          else {
            uvButton.classList.add("btn-danger");
          }

        
          currentUV.innerHTML = "UV Index:" + " ";
          currentUV.appendChild(uvButton);

        }); 
  }
//Funtion to iterate the display of weather information until 5 times
  function fiveDayForecast(data){
    const forecastData = 5
    

    for (let i = 0; i < forecastData; i++) {
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        const cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        const cardText = document.createElement("div");
        cardText.setAttribute("class", "card-text");
        const temp = document.createElement("p");
        temp.setAttribute("class", "weather-forecast");
        const humidity = document.createElement("p");
        humidity.setAttribute("class", "weather-forecast");
        const wind = document.createElement("p");
        wind.setAttribute("class", "weather-forecast");
        const icon = document.createElement("img");
        icon.setAttribute("src",`https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`);
        icon.style.width = "4rem";
        temp.textContent = "Temperature:" + " " + data.daily[i].temp.day + "°C";
        humidity.textContent = "Humidity:" + " " + data.daily[i].humidity + "%";
        wind.textContent = "Humidity:" + " " + data.daily[i].wind_speed + " " + "MPH";
        cardText.append(temp, humidity, wind)
        cardBody.append(cardText)
        card.append(icon, cardBody)
        forecast.append(card) 
    
      } 
  }
//Button to execute API function currentWeatherApi
button.addEventListener("click", (event)=>{
    event.preventDefault()
    const city = input.value;
    currentWeatherApi(city);
  }) 