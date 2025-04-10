import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { mycontext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Loginpage() {
  const {setToken , setUser} = useContext(mycontext) ;
  const [logindata , setlogindata] = useState({}) ;
  const navigate = useNavigate();
  const handlechange  = (e)=>{
    setlogindata({...logindata , [e.target.name] : e.target.value})
  }
  const handlelogin =async ()=>{
      try {
        const res = await axios.post('http://localhost:8000/api/login',logindata);  //this will send the post request to the login page to get the token
        if (res.data && res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);                                       //we save the token in local storage since we will need it to send and accept data
        localStorage.setItem('user', JSON.stringify(res.data.user));    
        setToken(res.data.access_token);                                            //we save the token in a state
        setUser(res.data.user);                                                     //and we store the user information in state
        console.log('Login successful', res.data);
        navigate('/Dashboard');                                                   //if the token is saved then we redirect
        }else(
          console.log("login error")
        )
      } catch (err) {
        console.error('Login error:', err.response.data);
      }
    }
  return (
    <div>
      Gamil : <input type="gmail" name='email' onChange={handlechange}  required/>
      Password : <input type="password" name="password" onChange={handlechange}  required/>
      <button type='submit' onClick={handlelogin}> submit </button>
      <Link to="/register">Dont have an account ? , register here</Link>
    </div>
  );
}
