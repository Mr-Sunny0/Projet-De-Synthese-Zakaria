import './App.css';
import { useState , useEffect } from 'react';
import Sidebar from "./components/Sidebare";
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
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(localStorage.getItem('user'));
  return (
  <mycontext.Provider value={{token , setToken ,user , setUser}}>
    <div className="container">
      <BrowserRouter>
       {token ? <Sidebar /> : null}            {/* // this will check if the token exists , if it does then return the sidebar */}
       <div className="main-content">
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
