import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="text-center inline">
      <Link to="/" className="text-2xl font-bold text-white">Weather Leaks</Link>
    </div>
  );
}
