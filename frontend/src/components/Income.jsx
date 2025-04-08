import React, { useState } from 'react';
import axios from 'axios';
export default function Income(){
const [IncomeForm , SetIncomeForm] = useState({
    name : '' ,
    amount : null  ,
    Category : "" ,
    date : ""
})
const HandleIncome = (e)=>{
    SetIncomeForm({...IncomeForm , [e.target.name] : e.target.value})
}
const HandleSubmit = async()=>{
    try {
        await axios.post('http://localhost:8000/api/PostIncome', IncomeForm );
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
             Category : <select name="Category" onChange={HandleIncome} required>
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