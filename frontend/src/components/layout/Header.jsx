import React, { useState } from 'react';
import { mycontext } from '../../App';
import { useContext } from 'react';
function Header({ onMenuClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useContext(mycontext);           //access the token stored in mycontext
  // Test user data
  const userdata = JSON.parse(user)
  const currentUser = {
    name: userdata.name,
    email: userdata.email,
    avatar: "account_circle"
  };
  console.log(user.name)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="menu-icon" onClick={onMenuClick}>
        <span className="material-icons-outlined">menu</span>
      </div>
      <div className="header-space"></div>
      <div className="user-menu-container">
        <span 
          className="material-icons-outlined user-icon" 
          onClick={toggleDropdown}
        >
          {currentUser.avatar}
        </span>
        {isDropdownOpen && (
          <div className="user-dropdown">
            <div className="user-info">
              <span className="material-icons-outlined dropdown-avatar">
                {currentUser.avatar}
              </span>
              <div className="user-details">
                <div className="user-name">{currentUser.name}</div>
                <div className="user-email">{currentUser.email}</div>
              </div>
            </div>
            {/* <div className="dropdown-divider"></div>
            <div className="dropdown-item">Profile</div>
            <div className="dropdown-item">Log out</div> */}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;