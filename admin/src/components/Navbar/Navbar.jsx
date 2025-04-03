// import React from 'react'
// import './Navbar.css'
// import {assets} from '../../assets/assets'

// const Navbar = () => {
//   return (
//     <div className='navbar'>
//       <img className='logo' src={assets.redfood} alt="" />
//       <h2>Admin Panel</h2>
//       <img className='profile' src={assets.profile_image} alt="" />
//     </div>
//   )
// }

// export default Navbar


// Navbar.jsx
// import React from 'react';
// import './Navbar.css';
// import { assets } from '../../assets/assets';
// import { useNavigate } from 'react-router-dom';

// const Navbar = ({ token, setToken }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setToken('');
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className='navbar'>
//       <img className='logo' src={assets.redfood} alt="" />
//       <h2>{token ? 'Admin Panel' : 'Authentication'}</h2>
//       {token && (
//        <>
//        <span 
//          onClick={handleLogout} 
//          className="logout-btn" 
//          style={{cursor: 'pointer', fontSize: '30px'}}
//        >
//          👤
//        </span>
//      </>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
    setShowDropdown(false); // Hide dropdown after logout
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.redfood} alt="" />
      <h2>{token ? 'Admin Panel' : ''}</h2>
      {/* <h2>Admin Panel</h2> */}
      {token && (
        <>
          <span
            onClick={() => setShowDropdown(!showDropdown)}
            className="logout-btn"
            style={{ cursor: 'pointer', fontSize: '30px' }}
          >
            👤
          </span>
          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '50px', // Adjust based on your navbar height
                right: '20px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                zIndex: 1000,
                width: '150px', // Adjust width as needed
              }}
            >
              <div
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                Switch Language
                <span>▶</span>
              </div>
              <div
                onClick={handleLogout}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                Log Out
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;