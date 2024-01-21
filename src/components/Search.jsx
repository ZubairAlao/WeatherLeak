import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchCity } from '../api';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Search() {
  const [location, setLocation] = useState([]);
  const [cityName, setCityName] = useState('');
  const [showLocationList, setShowLocationList] = useState(true);


  const searchWeatherQuery = useQuery({
    queryKey: ['cityData', cityName],
    enabled: false,
    queryFn: async () => {
      try {
        if (cityName.trim() === '') {
          return [];
        }
        const data = await fetchCity(cityName);
        setLocation(data);
        return data;
      } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
      }
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cityName.trim() !== '') {
      await searchWeatherQuery.refetch();
      setShowLocationList(true);
    }
  };

  const handleLinkClick = () => {
    setShowLocationList(false);
    setCityName('');
    setLocation([])
  };


  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      <form onSubmit={handleSubmit}>
        <div className='relative w-200'>
          <input
            type="text"
            value={cityName}
            onFocus={() => setShowLocationList(false)}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Search Location"
            className="py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 w-64"
          />
          <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FontAwesomeIcon className="text-gray-400" icon={faSearch} />
          </button>
          {/* <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded-md absolute -top-2 left-72 ">Search</button> */}
        </div>
      </form>


      {showLocationList && (
        <div className='text-white flex flex-col absolute top-36'>
          {location.map((city) => (
            <Link
              to={`/searched/${city.name}`}
              state= {{ lat: city.lat, lon: city.lon}}
              key={`${city.name}-${city.state}-${city.country}`}
              onClick={handleLinkClick}
              className='border rounded-full w-64 text-center py-2 px-4 m-1 bg-black bg-opacity-60'
            >
              {city.name}, {city.state}, {city.country}
            </Link>
          ))}
        </div>
      )}

      {searchWeatherQuery.isLoading && 
        <div className="animate-pulse absolute top-40 flex  justify-center space-x-4 mt-8">
          {/* <FontAwesomeIcon  icon={faSync} spin size="7x" /> */}
          <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V1.01a10 10 0 100 19.98V20a8 8 0 01-8-8z"></path>
          </svg>
        </div>
      }

    </div>
  );
}
