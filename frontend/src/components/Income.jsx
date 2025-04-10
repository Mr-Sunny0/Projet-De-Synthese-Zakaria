import React, { useState } from 'react';
import axios from 'axios';
import { mycontext } from '../App';
import { useContext } from 'react';
export default function Income(){
const [IncomeForm , SetIncomeForm] = useState({})
const {token} = useContext(mycontext)
const HandleIncome = (e)=>{
    SetIncomeForm({...IncomeForm , [e.target.name] : e.target.value})
}
const HandleSubmit = async()=>{
    try {
        console.log(IncomeForm)
        await axios.post('http://localhost:8000/api/PostIncome', IncomeForm ,{
            headers :{
                Authorization: `Bearer ${token}`
            }
        } );
             alert('Post created!');
      } catch (error) {
        console.error('Error:', error.response.data);
      }  
    console.log(IncomeForm)
}
    return(
        <div>
             name : <input type="text" name="name" onChange={HandleIncome} required/>
             amount : <input type="text" name="amount" onChange={HandleIncome} required/>
             category : <select name="category" onChange={HandleIncome} required>
                           <option value=""></option>
                           <option value="Salary">Salary</option>
                           <option value="Investement">Investement</option>
                           <option value="FreeLance">FreeLance</option>
                           <option value="Raise">Raise</option>
                        </select>
             date : <input type="date" name="date" onChange={HandleIncome} required/>
             <button type="submit" onClick={HandleSubmit}>submit</button>
        </div>
    )
}