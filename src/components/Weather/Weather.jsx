import React, { useState, useEffect } from "react";
import './Weather.css'

// Normally all the API keys are stored in .Env variables on server
const OPENWEATHER_API_KEY = '08ff5bfd6bbd0c08f59cd1c0c38d242b';




const WeatherWidget = ()=> {

    const [input, setInput] = useState('');
    const [weatherData, setWeatherData] = useState(null)

    const fetchWeatherData = async (input)=>{
       const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${OPENWEATHER_API_KEY}`)
        const geoData = await geoResponse.json();
        const {lat, lon} = geoData[0];

        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`)
        const weatherDataResponse = await weatherResponse.json();
        setWeatherData(weatherDataResponse);
        console.log(weatherDataResponse);

    }



    const returnInputValue = (event)=>{
       setInput(event.target.value);
    }

    const handleSearch = ()=> {
        fetchWeatherData(input);
        setInput('');
    }

    return (
        <div className="weather-widget">
  <h2>Weather</h2>
  
  <input 
    className="weather-input" 
    type="text" 
    placeholder="Enter city..." 
    aria-label="Enter city"
    value={input}
    onChange={returnInputValue}
  />
  
  <button onClick={handleSearch} className="weather-btn">Search</button>

  <div className="weather-info">
    <h3 className="city-name"></h3>
    <div className="temp">22°C</div>
    <div className="description">Sunny</div>
    <img 
      className="weather-icon" 
      src="https://openweathermap.org/img/wn/01d.png" 
      alt="weather icon" 
    />
  </div>
</div>
    )
};

export default WeatherWidget;