import React, { useState, useEffect } from 'react';
import { fetchForecast, fetchWeather, fetchCity } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import WeatherIcons from '../components/WeatherIcons';
// import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import moment from 'moment';


export default function SearchedResult() {
  const [searchWeather, setSearchWeather] = useState(null);
  const [searchForecast, setSearchForecast] = useState(null);
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if location data is available before making further API calls
        if (location.state && location.state.lat && location.state.lon) {
          const forecastResponse = await fetchForecast(location.state.lat, location.state.lon);
          setSearchForecast(forecastResponse);

          const weatherResponse = await fetchWeather(location.state.lat, location.state.lon);
          setSearchWeather(weatherResponse);
        }
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchData();
  }, [location.state]);

  console.log(location, "location in search result");

  
  return (
    <div className='text-white'>
      <div>
      {searchWeather ? (
        <div className='space-y-8 sm:space-y-16,'>
        <div className='text-center mt-8 sm:text-left'>
          <p className="header text-4xl font-bold">{searchWeather.name}, {searchWeather.sys.country}</p>
          <p className="day text-2xl">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        </div>
        
        <div className='flex flex-col md:flex-row justify-between items-center sm:space-x-4'>

          <div className='flex flex-row items-center space-x-4 mb-8 md:mb-0'>
            <WeatherIcons weatherCode={searchWeather.weather[0].icon} iconSize="5x" />
            <div className='flex flex-col items-center justify-items-center'>
              <p className="text-2xl sm:text-4xl">{searchWeather.main.temp} &deg;C</p>
              <p className="description text-xl sm:text-3xl">{searchWeather.weather[0].main}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-x-8 sm:gap-x-20 gap-y-4 justify-items-center bg-black bg-opacity-40 p-8">
            <p className="text-sm sm:text-xl"><span className='block'>High</span> {searchWeather.main.temp_max}&deg;C</p>
            <p className="text-sm sm:text-xl"><span className='block'>Low</span> {searchWeather.main.temp_min}&deg;C</p>
            <p className="text-sm sm:text-xl"><span className='block'>Humidity</span> {searchWeather.main.humidity}%</p>
            <p className="text-sm sm:text-xl"><span className='block'>Wind</span> {searchWeather.wind.speed} mps</p>
            <p className="text-sm sm:text-xl"><span className='block'>Sunrise</span> {new Date(searchWeather.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
            <p className="text-sm sm:text-xl"><span className='block'>Sunset</span> {new Date(searchWeather.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
          </div>

        </div>
      </div>
      ) : (
        <div class="animate-pulse flex  justify-center space-x-4 mt-8">
          <FontAwesomeIcon  icon={faSync} spin size="7x" />
        </div>
      )}
      </div>

      <div>
        <h1 className='text-2xl font-semibold mb-4'>Forecast</h1>
        {searchForecast ? (
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
                  perPage: 7,
                },
                767: {
                  perPage: 5,
                },
                640: {
                  perPage: 4,
                },
                370: {
                  perPage: 3,
                },
              },
            }}
          >
            {searchForecast.list.map((hourlyData) => (
              <SplideSlide key={hourlyData.dt} className="p-4 bg-black bg-opacity-40 rounded-md space-y-4 text-center">
                <p className='text-lg'>{new Date(hourlyData.dt_txt).toLocaleTimeString()}</p>
                <WeatherIcons weatherCode={hourlyData.weather[0].icon} iconSize="2x" />
                <p className='text-lg'>{hourlyData.main.temp} &deg;C</p>
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div class="animate-pulse flex  justify-center space-x-4 mt-8">
          <FontAwesomeIcon  icon={faSync} spin size="7x" />
        </div>
        )}
      </div>
    </div>
    
  );
}
