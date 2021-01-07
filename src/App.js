import React, { useState } from "react";
import "./App.css";

/*
  A web app for getting the weather in a given city
*/

/*
  This is a constant variable that keeps hold of the key and the
  link to the api.
*/

const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/",
};

/*
  Main function for the web app
 */
function App() {
  /*
    query, isQuery: this is used for the search bar, to get the inputted city.
    weather, setWeather: this is used to get the api calls, gets the weather in JSON format.
    isToggled, setToggled: checks whether the slider is in celsius or fahrenheit. 
  */
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [isToggled, setToggled] = useState(false);

  /*
    Function used to switch between celsius and fahrenheit
  */

  const toggleTrueFalse = () => setToggled(!isToggled);

  /* 
    This function handles the api call and sets to the weather.
    evt: Event
  */

  const search = (evt) => {
    if (evt.key === "Enter" && query.length !== 0) {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  /*
    This function convert a give temp to fahrenheit
  */
  const celsiusToFahrenheit = (temp) => {
    return temp * (9 / 5) + 32;
  };

  /*
    Returns the appropiate temp based on whether the user selected
    celsius or fahrenheit
  */
  const celsiusOrFahrenheit = (temp) => {
    return isToggled
      ? `${Math.round(temp)}°C`
      : `${Math.round(celsiusToFahrenheit(temp))}°F`;
  };

  /* 
    Captializes a given string
   */
  const capitalize = (desc) => {
    return desc.charAt(0).toUpperCase() + desc.slice(1);
  };

  /*
    Function to build a date from scratch
  */
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date},  ${month}, ${year}`;
  };

  return (
    /* 
    Search Bar
    Location Box
    Weather Box
    Switch
     */
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter a city...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <div>Current: {celsiusOrFahrenheit(weather.main.temp)}</div>
                <div>
                  Feels Like: {celsiusOrFahrenheit(weather.main.feels_like)}
                </div>
                <div>Low: {celsiusOrFahrenheit(weather.main.temp_min)}</div>
                <div>High: {celsiusOrFahrenheit(weather.main.temp_max)}</div>
              </div>
              <div className="weather">
                {capitalize(weather.weather[0].description)}
              </div>
              <div className="temp">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt=" "
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <div className="bottomright" id="bit00_3">
            <label class="switch">
              <input type="checkbox" id="checkbox1" onClick={toggleTrueFalse} />
              <div class="slider round">
                <span class="on">°C</span>
                <span class="off">°F</span>
              </div>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
