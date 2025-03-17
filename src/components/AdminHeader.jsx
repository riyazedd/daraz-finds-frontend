import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';
import { FiMenu, FiX } from 'react-icons/fi';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await API.post('/api/users/logout');
      localStorage.removeItem('adminToken');
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="text-xl font-medium py-4 px-6 flex justify-between items-center shadow-md bg-white">
      {/* Logo */}
      <div>
        <Link to="/" className="text-2xl font-bold text-gray-800">Daraz Finds</Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 focus:outline-none">
        {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
      </button>

      {/* Navigation Links */}
      <ul className={`md:flex md:items-center md:gap-5 absolute md:static top-16 left-0 w-full bg-white md:w-auto shadow-md md:shadow-none transition-all duration-300 ${
        menuOpen ? 'block' : 'hidden'
      }`}>
        <li className="md:inline-block px-6 py-3 md:py-0">
          <Link to="/admin/productlist" className="block text-gray-800 hover:text-blue-500">Products</Link>
        </li>
        <li className="md:inline-block px-6 py-3 md:py-0">
          <Link to="/admin/categorylist" className="block text-gray-800 hover:text-blue-500">Category</Link>
        </li>

        {/* Account Dropdown */}
        <li className="relative md:inline-block px-6 py-3 md:py-0">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)} 
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Account
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <ul>
                <li>
                  <Link to="/admin/updateprofile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Update Profile
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={logoutHandler} 
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default AdminHeader;
