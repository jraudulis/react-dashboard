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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000); 
            
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(()=> {
        if (!navigator.geolocation) {
            setError('Location not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const {latitude, longitude} = position.coords;
                setLat(latitude);
                setLon(longitude);
            },
            (error) => {

            }
        );
    }, [])

    useEffect(()=> {
        if(lat && lon){
            fetchWeatherByCoords(lat, lon)
        }
    }, [lat, lon])

    const fetchWeatherData = async (input)=>{
        const city = input.trim();
        if (!city) {
            setError('Enter city name');
            return;
        }

        setLoading(true);
        setError('');

        try{
            const geoResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}`)
            
            if (!geoResponse.ok) {
                throw new Error('Failed to search for city');
            }

            const geoData = await geoResponse.json();

            if(geoData.length === 0) {
                setError('City not found. Please enter valid city');
                return;
            }

            const {lat, lon} = geoData[0];
            await fetchWeatherByCoords(lat, lon);
        } catch(err) {
            setError('Unable to fetch weather data. Please try again');
        } finally {
            setLoading(false);
        }
    }

    const fetchWeatherByCoords = async (lat, lon) => {
        setLoading(true);
        
        try{
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`)
            
            if (!weatherResponse.ok) {
                throw new Error('Weather service unavailable');
            }

            const weatherInfo = await weatherResponse.json();

            if (!weatherInfo.name || !weatherInfo.main) {
                throw new Error('Invalid weather data');
            }

            setWeatherData({
                city: weatherInfo.name,
                country: weatherInfo.sys?.country || '',
                temperature: Math.round(weatherInfo.main.temp),
                description: weatherInfo.weather?.[0]?.description || 'No description',
                icon: weatherInfo.weather?.[0]?.icon || ''
            });
            
            console.log(weatherInfo);
        } catch(err) {
            setError('Unable to fetch weather data. Please try again');
        } finally {
            setLoading(false);
        }
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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    if(!weatherData && !error) return <div className='loader'></div>;

    return (
        <div className="widget weather-widget">
            <h2>Weather</h2>
            <div className="input-wrapper">
                <input 
                    className="weather-input" 
                    type="text" 
                    placeholder="Enter city..." 
                    aria-label="Enter city"
                    value={input}
                    onChange={returnInputValue}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                />
                <button 
                    onClick={handleSearch} 
                    className="weather-btn"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>
            
            {error && <div className="error show error-error fade-in">{error}</div>}

            {weatherData && (
                <div className="weather-info">
                    <img 
                        className="weather-icon" 
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                        alt="weather icon" 
                    />
                    <div className="description">{weatherData.description}</div>
                    <div className="temp">{weatherData.temperature}°C</div>
                    <h3 className="city-name">{weatherData.city}, {weatherData.country}</h3>
                </div>
            )}
        </div>
    )
}

export default WeatherWidget;