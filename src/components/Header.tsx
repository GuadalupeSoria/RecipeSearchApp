import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <ChefHat size={24} />
          <span>Recipe Finder</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-blue-200">Search</Link>
            </li>
            <li>
              <Link to="/favorites" className="hover:text-blue-200">Favorites</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;