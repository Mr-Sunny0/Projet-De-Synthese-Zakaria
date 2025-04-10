import React from 'react'
import { mycontext } from '../App'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function RegisterPage() {
  const {setToken , setUser} = useContext(mycontext)
  const [registerdata , setregisterdata] = useState({})
  const navigate = useNavigate();
  const Handlechange = (e)=>{
    setregisterdata({...registerdata , [e.target.name] : e.target.value})
  }
  const Handleregister = async()=>{
    try {
    const res = await axios.post('http://localhost:8000/api/register',registerdata)
    if (res.data && res.data.access_token) {
    localStorage.setItem("token" , res.data.access_token)
    localStorage.setItem("user" , JSON.stringify(res.data.user))
    setToken(res.data.access_token)
    setUser(res.data.user)
    console.log('Register successful', res.data);
    navigate('/Dashboard');                                                     //if the token is saved then we redirect
    }else (
      console.log('Invalid response structure')
    )
  } catch (err) {
    console.error('Login error:', err.response.data);
  }
}
  return (
        <div>
          name : <input type="text" name='name' onChange={Handlechange} required/>
          email : <input type="email" name='email' onChange={Handlechange} required/>
          password : <input type="password" name='password' onChange={Handlechange} required/>
          password_confirmation : <input type="password" name='password_confirmation' onChange={Handlechange} required/>
          <button onClick={Handleregister}>register</button>
          <Link to="/login">Already have an account , login here</Link>
        </div>
  )
}
