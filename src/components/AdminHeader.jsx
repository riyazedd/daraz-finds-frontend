import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../API';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await API.post('/api/users/logout');
      localStorage.removeItem('adminToken');
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="text-xl font-medium py-5 px-15 flex justify-between items-center shadow-md">
      <div>
        <Link to="/">Daraz Finds</Link>
      </div>
      <ul className="flex gap-5 items-center">
        <li>
          <Link to="/admin/productlist" className="flex items-center gap-2">Products</Link>
        </li>
        <li>
          <Link to="/admin/categorylist" className="flex items-center gap-2">Category</Link>
        </li>
        <li className="relative">
          <button onClick={toggleDropdown} className="p-3 bg-gray-500 text-white rounded hover:cursor-pointer">
            Account
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
              <ul>
                <li>
                  <Link to="/admin/updateprofile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Update Profile</Link>
                </li>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="block px-4 py-2 w-full text-left text-red-500 hover:bg-gray-200 hover:cursor-pointer"
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
  