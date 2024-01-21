import React, { useState, useEffect } from 'react';
import { fetchForecast } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import WeatherIcons from './WeatherIcons';
import { useQuery } from '@tanstack/react-query';

// import { faSun, faCloudRain, faCloud, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function Forecast() {
  
  const forecastQuery = useQuery({
    queryKey: ['forcastData'],
    queryFn: async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const data = await fetchForecast(position.coords.latitude, position.coords.longitude);
        return data;
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
      }
    },
  });

  return (
    <div>
     <h1 className='text-2xl mt-4 font-semibold mb-4'>Forecast</h1>
     {forecastQuery.data && (
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
              perPage: 2,
            },
          },
        }}
      >
        {forecastQuery.data.list.map((hourlyData) => (
          <SplideSlide key={hourlyData.dt} className="p-4 bg-black bg-opacity-40 rounded-md text-center space-y-4">
            <p className='text-sm'>{new Date(hourlyData.dt_txt).toLocaleTimeString()}</p>
            <WeatherIcons weatherCode={hourlyData.weather[0].icon} iconSize="2x" />
            <p className='text-sm'>{hourlyData.main.temp} &deg;C</p>
          </SplideSlide>
        ))}
      </Splide>
    )}
    {forecastQuery.isLoading && 
        <div className="animate-pulse flex  justify-center space-x-4 mt-8">
          <FontAwesomeIcon  icon={faSync} spin size="7x" />
        </div>
    }
    {forecastQuery.isError && 
      <div className="animate-pulse flex  justify-center space-x-4 mt-8">
        <pre>
          {JSON.stringify(forecastQuery.error.message)}
        </pre>
      </div>
    }
  </div>
  );
}

