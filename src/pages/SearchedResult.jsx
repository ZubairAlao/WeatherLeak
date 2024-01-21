import React from 'react';
import { fetchForecast, fetchWeather, fetchCity } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import WeatherIcons from '../components/WeatherIcons';
import { useQuery } from '@tanstack/react-query';
import { useLocation,  } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import moment from 'moment';


export default function SearchedResult() {
  const location = useLocation()

  const resultWeatherQuery = useQuery({
    queryKey: ['resultData', location.state],
    enabled: location.state !== null && location.state.lat && location.state.lon !== null,
    queryFn: async () => {
      try {
          const forecastResponse = await fetchForecast(location.state.lat, location.state.lon);
          const weatherResponse = await fetchWeather(location.state.lat, location.state.lon);
            
          const combinedData = { weatherResponse, forecastResponse};
          return combinedData;
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
      }
    },
  });

  const { weatherResponse, forecastResponse } = resultWeatherQuery.data || {};


  return (
    <div className='text-white'>
      <div>
      {weatherResponse && (
        <div className='space-y-8 sm:space-y-16,'>
        <div className='text-center mt-8 sm:text-left'>
          <p className="header text-4xl font-bold">{weatherResponse.name}, {weatherResponse.sys.country}</p>
          <p className="day text-2xl">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        </div>
        
        <div className='flex flex-col md:flex-row justify-between items-center sm:space-x-4'>

          <div className='flex flex-row items-center space-x-4 mb-8 md:mb-0'>
            <WeatherIcons weatherCode={weatherResponse.weather[0].icon} iconSize="5x" />
            <div className='flex flex-col items-center justify-items-center'>
              <p className="text-2xl sm:text-4xl">{weatherResponse.main.temp} &deg;C</p>
              <p className="description text-xl sm:text-3xl">{weatherResponse.weather[0].main}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-x-8 sm:gap-x-20 gap-y-4 justify-items-center bg-black bg-opacity-40 p-8">
            <p className="text-sm sm:text-xl"><span className='block'>High</span> {weatherResponse.main.temp_max}&deg;C</p>
            <p className="text-sm sm:text-xl"><span className='block'>Low</span> {weatherResponse.main.temp_min}&deg;C</p>
            <p className="text-sm sm:text-xl"><span className='block'>Humidity</span> {weatherResponse.main.humidity}%</p>
            <p className="text-sm sm:text-xl"><span className='block'>Wind</span> {weatherResponse.wind.speed} mps</p>
            <p className="text-sm sm:text-xl"><span className='block'>Sunrise</span> {new Date(weatherResponse.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
            <p className="text-sm sm:text-xl"><span className='block'>Sunset</span> {new Date(weatherResponse.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
          </div>

        </div>
      </div>
      )}
      {resultWeatherQuery.isLoading && 
        <div className="animate-pulse flex  justify-center space-x-4 mt-8">
          <FontAwesomeIcon  icon={faSync} spin size="7x" />
        </div>
      }
      </div>

      <div>
        <h1 className='text-2xl font-semibold mb-4'>Forecast</h1>
        {forecastResponse && (
          <Splide
            options={{
              width: "100%",
              rewind: true,
              autoplay: "true",
              perPage: 8,
              perMove: "2",
              gap: "1rem",
              height: "10rem",
              type: "loop",
              rewindSpeed: "3000",
              arrows: "true",
              pagination: "false",
              breakpoints: {
                1024: {
                  perPage: 6,
                },
                767: {
                  perPage: 5,
                },
                640: {
                  perPage: 3,
                },
                370: {
                  perPage: 3,
                },
              },
            }}
          >
            {forecastResponse.list.map((hourlyData) => (
              <SplideSlide key={hourlyData.dt} className="p-4 bg-black bg-opacity-40 rounded-md space-y-4 text-center">
                <p className='text-sm'>{new Date(hourlyData.dt_txt).toLocaleTimeString()}</p>
                <WeatherIcons weatherCode={hourlyData.weather[0].icon} iconSize="2x" />
                <p className='text-sm'>{hourlyData.main.temp} &deg;C</p>
              </SplideSlide>
            ))}
          </Splide>
        )}
        {resultWeatherQuery.isLoading && 
          <div className="animate-pulse flex  justify-center space-x-4 mt-8">
            <FontAwesomeIcon  icon={faSync} spin size="7x" />
          </div>
        }
      </div>
    </div>
  );
}
