import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudRain, faCloud, faSnowflake } from '@fortawesome/free-solid-svg-icons';

export default function WeatherIcons({ weatherCode, iconSize }) {

    const weatherIcons = {
        '01d': faSun,       // Clear sky (day)
        '01n': faSun,       // Clear sky (night)
        '02d': faCloud,     // Few clouds (day)
        '02n': faCloud,     // Few clouds (night)
        '03d': faCloud,     // Scattered clouds (day)
        '03n': faCloud,     // Scattered clouds (night)
        '04d': faCloud,     // Broken clouds (day)
        '04n': faCloud,     // Broken clouds (night)
        '09d': faCloudRain, // Shower rain (day)
        '09n': faCloudRain, // Shower rain (night)
        '10d': faCloudRain, // Rain (day)
        '10n': faCloudRain, // Rain (night)
        '11d': faCloudRain, // Thunderstorm (day)
        '11n': faCloudRain, // Thunderstorm (night)
        '13d': faSnowflake, // Snow (day)
        '13n': faSnowflake, // Snow (night)
        '50d': faCloud,     // Mist (day)
        '50n': faCloud,     // Mist (night)
      };

  return (
    <FontAwesomeIcon icon={weatherIcons[weatherCode]} size={iconSize} />
  )
}
