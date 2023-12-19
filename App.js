import React, { useState } from 'react';
import axios from 'axios';

function GfGWeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const WeekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
      try {
        const res = await axios.get(url, {
          params: {
            q: input,
            units: 'metric',
            appid: api_key,
          },
        });
        setWeather({ data: res.data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        setInput('');
        console.log('error', error);
      }
    }
  };

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="app-name text-4xl font-bold mb-6 text-blue-700">
        Parveen Weather App
      </h1>
      <div className="search-bar mb-4 w-full max-w-md">
        <input
          type="text"
          className="city-search p-3 border rounded w-full"
          placeholder="Enter City Name.."
          name="query"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather.loading && (
        <div className="text-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 mb-4"></div>
          <p className="text-gray-700">Fetching Weather...</p>
        </div>
      )}
      {weather.error && (
        <div className="text-center text-red-600 mt-4">
          <p className="error-message">
            <span className="text-lg">City not found</span>
            <p className="mt-2">Please enter a valid city name</p>
          </p>
        </div>
      )}
      {weather.data && weather.data.main && (
        <div className="text-center">
          <div className="city-name mb-2">
            <h2 className="text-2xl font-semibold">
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date mb-2">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp mb-2">
            <img
              className="inline-block mr-2"
              src={`https://openweathermap.org/img/wn/${
                weather.data.weather[0].icon
              }@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p className="text-gray-700">
              {weather.data.weather[0].description.toUpperCase()}
            </p>
            <p className="text-gray-700">Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GfGWeatherApp;
