import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Search from './Search';
import morningImage from '../img/morning.jpg';
import nightImage from '../img/night.jpg';
import { useState, useEffect } from 'react';

function Layout() {

  const [backgroundImage, setBackgroundImage] = useState(morningImage); 

  useEffect(() => {
    const currentTime = new Date().getHours();

    // Change background image based on time
    if (currentTime >= 18 || currentTime < 6) {
      setBackgroundImage(nightImage);
    } else {
      setBackgroundImage(morningImage);
    }
  }, []);
  return (
    <div
      className="main"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 h-screen">
        <Header />
        <Search />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
