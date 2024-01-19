import React, { useState, useEffect } from 'react';
import { fetchForecast } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import WeatherIcons from './WeatherIcons';

// import { faSun, faCloudRain, faCloud, faSnowflake } from '@fortawesome/free-solid-svg-icons';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

export default function Forecast() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);

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

            const response = await fetchForecast(position.coords.latitude, position.coords.longitude);
            setWeatherForecast(response);
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

  console.log(weatherForecast);

  return (
    <div>
     <h1 className='text-2xl mt-8 font-semibold mb-4'>Forecast</h1>
     {weatherForecast ? (
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
     {weatherForecast.list.map((hourlyData) => (
       <SplideSlide key={hourlyData.dt} className="p-4 bg-black bg-opacity-40 rounded-md text-center space-y-4">
         <p className='text-lg'>{new Date(hourlyData.dt_txt).toLocaleTimeString()}</p>
         <WeatherIcons weatherCode={hourlyData.weather[0].icon} iconSize="2x" />
         <p className='text-lg'>{hourlyData.main.temp} &deg;C</p>
       </SplideSlide>
     ))}
   </Splide>
   ): (
   <FontAwesomeIcon className='flex items-center justify-center' icon={faSync} spin size="7x" />
  )}
    </div>
  );
}

