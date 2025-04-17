import axios from 'axios';
import { mycontext } from '../../App';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// This Sidebar component expects 'closeSidebar' function and 'sidebarOpen' boolean as props
const Sidebar = ({ closeSidebar, sidebarOpen }) => {
    const navigate = useNavigate();
  
  const {setToken , setUser} = useContext(mycontext);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Clean up localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  
      // Update context/state
      setToken(null);
      setUser(null);
  
      // Navigate to login
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };














  return (
    // Apply 'sidebar-responsive' class conditionally based on the sidebarOpen prop
    <aside id="sidebar" className={sidebarOpen ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          {/* Changed icon and text to match your expense tracker theme */}
          <span className="material-icons-outlined">account_balance_wallet</span> {/* Or monetization_on */}
          Finance Tracker
        </div>
        {/* This span uses the closeSidebar function passed in as a prop */}
        <span className="material-icons-outlined" onClick={closeSidebar}>close</span>
      </div>

      {/* Updated list items to match your old sidebar's routes and titles */}
      <ul className="sidebar-list">

        {/* Dashboard Link */}
        <li className="sidebar-list-item">
           {/* IMPORTANT: For React routing, replace <a> with <Link> from react-router-dom later */}
          <a href="/Dashboard">
            <span className="material-icons-outlined">dashboard</span> Dashboard
          </a>
        </li>

        {/* Goals Link */}
        <li className="sidebar-list-item">
          <a href="/Goal">
            <span className="material-icons-outlined">track_changes</span> {/* 'track_changes' or 'flag' might fit Goals */}
            Goals
          </a>
        </li>

        {/* Incomes Link */}
        <li className="sidebar-list-item">
          <a href="/Income">
            <span className="material-icons-outlined">trending_up</span> Incomes
          </a>
        </li>

        {/* Expenses Link */}
        <li className="sidebar-list-item">
          <a href="/Expense">
            <span className="material-icons-outlined">trending_down</span> Expenses
          </a>
        </li>

        {/* Settings Link (Example - added based on previous template) */}
        {/* You might want a settings page */}
        {/* <li className="sidebar-list-item">
          <a href="/Settings">
             <span className="material-icons-outlined">settings</span> Settings
           </a>
         </li> */}

        {/* Logout Link */}
        <li className="sidebar-list-item">
         <a href="/#"  onClick={(e) => { e.preventDefault();
          const confirmLogout = window.confirm("Are you sure you want to logout?");
          if (confirmLogout) handleLogout();}}>
         <span className="material-icons-outlined">logout</span> Logout
         </a>
</li>


       </ul>
    </aside>
  );
};

export default Sidebar;