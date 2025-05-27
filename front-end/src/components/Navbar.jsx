import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="p-4 bg-blue-700 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">LinkSaver</Link>
      
      <div className="flex gap-4 items-center">
        {
          !token ?
            (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) :
            (
              <button onClick={handleLogout} className='cursor-pointer border-[1.5px] px-2 py-1 font-semibold rounded-lg'>Logout</button>
            )
        }
      </div>
    </nav>
  );
};

export default Navbar;