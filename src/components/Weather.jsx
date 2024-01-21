import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { fetchWeather } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import WeatherIcons from './WeatherIcons';
import { useQuery } from '@tanstack/react-query';

import Forecast from './Forecast';

export default function Weather() {

  const weatherQuery = useQuery({
    queryKey: ['weatherData'],
    queryFn: async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const data = await fetchWeather(position.coords.latitude, position.coords.longitude);
        return data;
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
      }
    },
  });

  return (
    <div className="text-white">
      {weatherQuery.data && (
        <div className='space-y-8 sm:space-y-16,'>
          <div className='text-center mt-8 sm:text-left'>
            <p className="header text-4xl font-bold">{weatherQuery.data.name}, {weatherQuery.data.sys.country}</p>
            <p className="day text-2xl">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
          </div>
          
          <div className='flex flex-col md:flex-row justify-between items-center sm:space-x-4'>

            <div className='flex flex-row items-center space-x-4 mb-8 md:mb-0'>
              <WeatherIcons weatherCode={weatherQuery.data.weather[0].icon} iconSize="5x" />
              <div className='flex flex-col items-center justify-items-center'>
                <p className="text-2xl sm:text-4xl">{weatherQuery.data.main.temp} &deg;C</p>
                <p className="description text-xl sm:text-3xl">{weatherQuery.data.weather[0].main}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-x-8 sm:gap-x-20 gap-y-4 justify-items-center bg-black bg-opacity-40 p-8">
              <p className="text-sm sm:text-xl"><span className='block'>High</span> {weatherQuery.data.main.temp_max}&deg;C</p>
              <p className="text-sm sm:text-xl"><span className='block'>Low</span> {weatherQuery.data.main.temp_min}&deg;C</p>
              <p className="text-sm sm:text-xl"><span className='block'>Humidity</span> {weatherQuery.data.main.humidity}%</p>
              <p className="text-sm sm:text-xl"><span className='block'>Wind</span> {weatherQuery.data.wind.speed} mps</p>
              <p className="text-sm sm:text-xl"><span className='block'>Sunrise</span> {new Date(weatherQuery.data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
              <p className="text-sm sm:text-xl"><span className='block'>Sunset</span> {new Date(weatherQuery.data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </div>

          </div>
        </div>
      )}
      {weatherQuery.isLoading && 
        <div className="animate-pulse flex  justify-center space-x-4 mt-8">
          <FontAwesomeIcon  icon={faSync} spin size="7x" />
        </div>
      }
      {weatherQuery.isError && <pre>{JSON.stringify(weatherQuery.error)}</pre>}

      <Forecast />
    </div>
  );
}
