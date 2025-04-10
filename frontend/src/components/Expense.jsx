import React, { useState } from 'react';
import axios from 'axios';
import { mycontext } from '../App';
import { useContext } from 'react';
export default function Expense(){
const [ExpenseForm , SetExpenseForm] = useState({})
const {token} = useContext(mycontext)
const HandleExpense = (e)=>{
    SetExpenseForm({...ExpenseForm , [e.target.name] : e.target.value})
}
const HandleSubmit = async()=>{
    try {
        console.log(ExpenseForm)
        await axios.post('http://localhost:8000/api/PostExpense', ExpenseForm ,{
            headers :{
                Authorization: `Bearer ${token}`
            }
        } );
             alert('Post created!');
      } catch (error) {
        console.error('Error:', error.response.data);
      }  
    console.log(ExpenseForm)
}
    return(
        <div>
             name : <input type="text" name="name" onChange={HandleExpense} required/>
             amount : <input type="text" name="amount" onChange={HandleExpense} required/>
             category : <select name="category" onChange={HandleExpense} required>
                           <option value=""></option>
                           <option value="Entertainemnt">Entertainemnt</option>
                           <option value="Groceries">Groceries</option>
                           <option value="Online subscription">Online subscription</option>
                           <option value="other ">other</option>
                        </select>
             date : <input type="date" name="date" onChange={HandleExpense} required/>
             <button type="submit" onClick={HandleSubmit}>submit</button>
        </div>
    )
}