import React, { useState } from 'react';
import axios from 'axios';
import { mycontext } from '../App';
import { useContext } from 'react';
export default function Goal(){
const [GoalForm , SetGoalForm] = useState({})
const {token} = useContext(mycontext)
const HandleGoal = (e)=>{
    SetGoalForm({...GoalForm , [e.target.name] : e.target.value})
}
const HandleSubmit = async()=>{
    try {
        console.log(GoalForm)
        await axios.post('http://localhost:8000/api/PostGoal', GoalForm ,{
            headers :{
                Authorization: `Bearer ${token}`
            }
        } );
             alert('Post created!');
      } catch (error) {
        console.error('Error:', error.response.data);
      }  
    console.log(GoalForm)
}
    return(
        <div>
             price : <input type="text" name="price" onChange={HandleGoal} required/>
             months : <input type="number" name="months" onChange={HandleGoal} required/>
             date : <input type="date" name="date" onChange={HandleGoal} required/>
             <button type="submit" onClick={HandleSubmit}>submit</button>
        </div>
    )
}