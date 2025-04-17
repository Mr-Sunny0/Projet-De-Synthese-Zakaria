import './App.css';
import { useState  } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Income from './components/Income';
import Expense from './components/Expense';
import Goal from './components/Goal';
import Dashboard from './components/Dashboard';
import Loginpage from './components/Loginpage';
import RegisterPage from './components/RegisterPage';
import {BrowserRouter , Routes, Route , Navigate} from "react-router-dom";
import { createContext } from 'react';
export const mycontext = createContext()
function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to open the sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  // Function to close the sidebar
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
  <mycontext.Provider value={{token , setToken ,user , setUser}}>
    <div className="grid-container">
      <BrowserRouter>
       {token ? <Header onMenuClick={openSidebar} /> : null}
       {token ? <Sidebar sidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} /> : null}       {/* // this will check if the token exists , if it does then return the sidebar */}
       <div className="main-container">
       <Routes>
       {/* Public Routes */}
          <Route path="/" element={token ? <Navigate to="/Dashboard"/> : <Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />
        {/* Protected Routes */}
          <Route path="/Dashboard" element={token ? <Dashboard/> : <Navigate to="/" />} />
          <Route path="/Income" element={token ? <Income/> : <Navigate to="/" />} />
          <Route path="/Expense" element={token ? <Expense/> : <Navigate to="/" />} />
          <Route path="/Goal" element={token ? <Goal/> : <Navigate to="/" />} />
       </Routes>
        </div>
      </BrowserRouter>
    </div>
    </mycontext.Provider>
  )
}

export default App;
