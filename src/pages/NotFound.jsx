import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center justify-center text-white min-h-screen">
      <div className="max-w-md p-8 rounded-md bg-white text-black text-center">
        <h1 className="text-4xl font-bold mb-4">
          Sorry, the page you were looking for is not found.
        </h1>
        <Link to="/" className="text-xl">
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
