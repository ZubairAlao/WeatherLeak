import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchWeather } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import WeatherIcons from './WeatherIcons';

import Forecast from './Forecast';

export default function Weather() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // const refresh = () => {
  //   window.location.reload();
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user's geolocation
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);

            const response = await fetchWeather(position.coords.latitude, position.coords.longitude);
            setWeatherData(response);
          },
          function (error) {
            console.error('Error getting geolocation:', error.message);
          }
        );

        console.log('Latitude is:', lat);
        console.log('Longitude is:', long);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [lat, long]);

  console.log(weatherData);

  return (
    <div className="text-white">
      {weatherData ? (
        <div className='space-y-8 sm:space-y-16,'>
          <div className='text-center mt-8 sm:text-left'>
            <p className="header text-4xl font-bold">{weatherData.name}, {weatherData.sys.country}</p>
            <p className="day text-2xl">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
          </div>
          
          <div className='flex flex-col md:flex-row justify-between items-center sm:space-x-4'>

            <div className='flex flex-row items-center space-x-4 mb-8 md:mb-0'>
              <WeatherIcons weatherCode={weatherData.weather[0].icon} iconSize="5x" />
              <div className='flex flex-col items-center justify-items-center'>
                <p className="text-2xl sm:text-4xl">{weatherData.main.temp} &deg;C</p>
                <p className="description text-xl sm:text-3xl">{weatherData.weather[0].main}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-x-8 sm:gap-x-20 gap-y-4 justify-items-center bg-black bg-opacity-40 p-8">
              <p className="text-sm sm:text-xl"><span className='block'>High</span> {weatherData.main.temp_max}&deg;C</p>
              <p className="text-sm sm:text-xl"><span className='block'>Low</span> {weatherData.main.temp_min}&deg;C</p>
              <p className="text-sm sm:text-xl"><span className='block'>Humidity</span> {weatherData.main.humidity}%</p>
              <p className="text-sm sm:text-xl"><span className='block'>Wind</span> {weatherData.wind.speed} mps</p>
              <p className="text-sm sm:text-xl"><span className='block'>Sunrise</span> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
              <p className="text-sm sm:text-xl"><span className='block'>Sunset</span> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>

          </div>
        </div>
      ) : (
        <div class="animate-pulse flex  justify-center space-x-4 mt-8">
          <FontAwesomeIcon  icon={faSync} spin size="7x" />
        </div>
      )}

      <Forecast />

      {/* <button onClick={refresh} className="mt-2 p-2 bg-blue-500 text-white rounded-md">Refresh</button> */}

    </div>
  );
}
