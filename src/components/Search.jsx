import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchCity } from '../api';
import { Link } from 'react-router-dom';

export default function Search() {
  const [location, setLocation] = useState([]);
  const [cityName, setCityName] = useState('');
  const [showLocationList, setShowLocationList] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetchCity(cityName);
      setLocation(response);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cityName && cityName.trim() !== "") {
      setShowLocationList(true);
      await fetchData();
    }
  };

  const handleLinkClick = () => {
    setShowLocationList(false);
    setCityName('');
    setLocation([])
  };

  useEffect(() => {
    // Make sure Location is not empty before making the API call
    if (cityName && cityName.trim() !== "") {
      fetchData();
    }
  }, []);

  console.log(location, "location in search");


  return (
    <div className='flex flex-col items-center justify-center mt-8'>
      <form onSubmit={handleSubmit}>
        <div className='relative w-200'>
          <input
            type="text"
            value={cityName}
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

    </div>
  );
}
