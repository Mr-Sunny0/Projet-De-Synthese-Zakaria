import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { mycontext } from '../App';

export default function Income() {
    const [IncomeForm, SetIncomeForm] = useState({});   /// state that contains the current form data 
    const [errors, setErrors] = useState({});          //state responsible for the errors 
    const { token } = useContext(mycontext);           //access the token stored in mycontext
    const [incomes, setIncomes] = useState([]);        //fetched income data 
    const [edit, setedit] = useState(false);           //state to determine if im editing or not
    const [editid, seteditid] = useState(null);        // id of the selected edit row
 //fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/GetIncome', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIncomes(response.data);
            } catch (error) {
                console.error('Failed to fetch incomes:', error);
            }
        };
        if (token) {
            fetchData();
        }
    }, [token]);
 /// validation
    const validateForm = () => {
        const newErrors = {};

        if (!IncomeForm.name) {
            newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]*$/.test(IncomeForm.name)) {
            newErrors.name = 'Name should contain only letters';
        }

        if (!IncomeForm.amount) {
            newErrors.amount = 'Amount is required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(IncomeForm.amount)) {
            newErrors.amount = 'Please enter a valid amount';
        }

        if (!IncomeForm.category) {
            newErrors.category = 'Category is required';
        }

        if (!IncomeForm.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
//fils the incomeform state with data using onchange
    const HandleIncome = (e) => {
        SetIncomeForm({ ...IncomeForm, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };
// fetch data but reusable
    const fetchIncomes = async () => {
        const response = await axios.get('http://localhost:8000/api/GetIncome', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setIncomes(response.data);
    };
   
    const HandleSubmit = async () => {
        if (validateForm()) {
            try {
                const trimmedForm = {
                    name: IncomeForm.name.trim(),          //trim to remove spaces
                    amount: IncomeForm.amount.trim(),
                    category: IncomeForm.category,
                    date: IncomeForm.date,
                };

                await axios.post('http://localhost:8000/api/PostIncome', trimmedForm, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                alert('Income added successfully!');
                SetIncomeForm({});
                setErrors({});
                fetchIncomes();
            } catch (error) {
                console.error('Error:', error.response?.data);
                alert('Failed to add income. Please try again.');
            }
        }
    };
///delete function
    const Handledelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/DeleteIncome/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIncomes(incomes.filter(income => income.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };
/// edit button logic
    const Handleedit = (id) => {
        setedit(true);
        const newincome = incomes.find(e => e.id === id);
        SetIncomeForm(newincome);
        seteditid(id);
    };

    const Handleupdate = async (id) => {
        if (validateForm()) {
            try {
                const trimmedForm = {
                    name: IncomeForm.name.trim(),
                    amount: IncomeForm.amount.trim(),
                    category: IncomeForm.category,
                    date: IncomeForm.date,
                };

                await axios.put(`http://localhost:8000/api/UpdateIncome/${id}`, trimmedForm, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setedit(false);
                seteditid(null);
                SetIncomeForm({});
                setErrors({});
                fetchIncomes();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="expense-container">
            <div className="expense-form">
                <h2 className="form-title">{edit ? 'Edit Income' : 'Add Income'}</h2>

                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={IncomeForm.name || ''}
                        onChange={HandleIncome}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter income name"
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Amount</label>
                    <input
                        type="text"
                        name="amount"
                        value={IncomeForm.amount || ''}
                        onChange={HandleIncome}
                        className={`form-input ${errors.amount ? 'error' : ''}`}
                        placeholder="Enter amount"
                    />
                    {errors.amount && <p className="error-message">{errors.amount}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                        name="category"
                        value={IncomeForm.category || ''}
                        onChange={HandleIncome}
                        className={`form-select ${errors.category ? 'error' : ''}`}
                    >
                        <option value="">Select category</option>
                        <option value="Salary">Salary</option>
                        <option value="Investment">Investment</option>
                        <option value="FreeLance">FreeLance</option>
                        <option value="Raise">Raise</option>
                    </select>
                    {errors.category && <p className="error-message">{errors.category}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={IncomeForm.date || ''}
                        onChange={HandleIncome}
                        className={`form-input ${errors.date ? 'error' : ''}`}
                    />
                    {errors.date && <p className="error-message">{errors.date}</p>}
                </div>

                {edit ? (
                    <>
                        <button className="submit-button" onClick={() => Handleupdate(editid)}>Update</button>
                        <button className="submit-button" onClick={() => {
                            setedit(false);
                            seteditid(null);
                            SetIncomeForm({});
                            setErrors({});
                        }}>Cancel</button>
                    </>
                ) : (
                    <button type="button" onClick={HandleSubmit} className="submit-button">Add Income</button>
                )}
            </div>

            <div className="expense-table-container">
                <h2 className="form-title">Income List</h2>
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.length === 0 ? (
                            <tr><td colSpan="6">No income records yet.</td></tr>
                        ) : (
                            incomes.map((income) => (
                                <tr key={income.id}>
                                    <td>{income.name}</td>
                                    <td>${parseFloat(income.amount).toFixed(2)}  MAD</td>
                                    <td>{income.category}</td>
                                    <td>{income.date}</td>
                                    <td><button onClick={() => Handledelete(income.id)}>🗑️</button></td>
                                    <td><button onClick={() => Handleedit(income.id)}>✏️</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
