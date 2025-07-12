import React, { useState, useEffect } from "react";
import './Weather.css'

// Normally all the API keys are stored in .Env variables on server
const OPENWEATHER_API_KEY = '08ff5bfd6bbd0c08f59cd1c0c38d242b';




const WeatherWidget = ()=> {

    const [input, setInput] = useState('');
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
    if (error) {
        const timer = setTimeout(() => {
        setError('');
        }, 5000); 
        
        return () => clearTimeout(timer);
    }
    }, [error]);

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude, longitude} = position.coords;
            setLat(latitude);
            setLon(longitude);

        })
    }, [])

    useEffect(()=> {
        if(lat && lon){
            fetchWeatherByCoords(lat, lon)
        }
    }, [lat, lon])

    const fetchWeatherData = async (input)=>{
     try{
       const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&appid=${OPENWEATHER_API_KEY}`)
        const geoData = await geoResponse.json();

        if(geoData.length === 0) {
            setError('City not found. Please enter valid city')
            return;
        }

        const {lat, lon} = geoData[0];
        await fetchWeatherByCoords(lat, lon);
        }catch(err) {setError('Error occured while fetching data',err.message)}

    }

    const fetchWeatherByCoords = async (lat, lon) => {
       try{
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`)
        const weatherInfo = await weatherResponse.json();

        setWeatherData({
            city: weatherInfo.name,
            country: weatherInfo.sys.country,
            temperature: Math.round(weatherInfo.main.temp),
            description: weatherInfo.weather[0].description,
            icon: weatherInfo.weather[0].icon

        });
        console.log(weatherInfo);
        }catch(err){setError('Error occured while fetching data',err.message)}
    }



    const returnInputValue = (event)=>{
       setInput(event.target.value);
    }

    const handleSearch = ()=> {
        if(!input.trim()) {
            setError('Enter city name');
            return;
        }
        setError('');
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
  {error && <div className="error show error-error fade-in">{error}</div>}

  <button onClick={handleSearch} className="weather-btn">Search</button>
{weatherData && (
  <div className="weather-info">
    <h3 className="city-name">{weatherData.city}, {weatherData.country}</h3>
    <div className="temp">{weatherData.temperature}°C</div>
     <img 
      className="weather-icon" 
      src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
      alt="weather icon" 
    />
    <div className="description">{weatherData.description}</div>
  </div>
)}
</div>
    )
};

export default WeatherWidget;