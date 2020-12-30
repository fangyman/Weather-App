{/*
  A web app for getting the weather in a given city
*/}


import React, { useState } from "react";

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
    if (evt.key === "Enter" && isToggled) {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
    if (evt.key === 'Enter' && !isToggled){
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
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

    return `${day} ${date} ${month} ${year}`;
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
          ? (weather.main.temp > 16 && isToggled) || (weather.main.temp > 60 && !isToggled)
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
              <div className="temp">{Math.round(weather.main.temp)}
              <b>{isToggled ? '°c' : '°f'}</b>
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div>
          <div className= "bottomright" id="bit00_3">
            <label class="switch">
              <input type="checkbox" id="checkbox1" onClick={toggleTrueFalse}/>
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
