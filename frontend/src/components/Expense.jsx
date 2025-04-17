import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { mycontext } from '../App';

export default function Expense() {
    const [ExpenseForm, SetExpenseForm] = useState({});
    const [errors, setErrors] = useState({});
    const { token } = useContext(mycontext);
    const [expenses, setExpenses] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/GetExpense', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Failed to fetch expenses:', error);
            }
        };

        if (token) fetchData();
    }, [token]);

    const validateForm = () => {
        const newErrors = {};

        if (!ExpenseForm.name) {
            newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s]*$/.test(ExpenseForm.name)) {
            newErrors.name = 'Name should contain only letters';
        }

        if (!ExpenseForm.amount) {
            newErrors.amount = 'Amount is required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(ExpenseForm.amount)) {
            newErrors.amount = 'Please enter a valid amount';
        }

        if (!ExpenseForm.category) {
            newErrors.category = 'Category is required';
        }

        if (!ExpenseForm.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const HandleExpense = (e) => {
        SetExpenseForm({ ...ExpenseForm, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const HandleSubmit = async () => {
        if (validateForm()) {
            try {
                await axios.post('http://localhost:8000/api/PostExpense', ExpenseForm, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Expense added successfully!');
                SetExpenseForm({});
                setErrors({});
                const response = await axios.get('http://localhost:8000/api/GetExpense', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Error:', error.response?.data);
                alert('Failed to add expense. Please try again.');
            }
        }
    };

    const HandleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/DeleteExpense/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExpenses(expenses.filter(expense => expense.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const HandleEdit = (id) => {
        setEdit(true);
        const selectedExpense = expenses.find(e => e.id === id);
        SetExpenseForm(selectedExpense);
        setEditId(id);
    };

    const HandleUpdate = async (id) => {
        if (validateForm()) {
            try {
                await axios.put(`http://localhost:8000/api/UpdateExpense/${id}`, ExpenseForm, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEdit(false);
                SetExpenseForm({});
                setErrors({});
                const response = await axios.get('http://localhost:8000/api/GetExpense', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="expense-container">
            <div className="expense-form">
                <h2 className="form-title">{edit ? 'Edit Expense' : 'Add Expense'}</h2>
                <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={ExpenseForm.name || ''}
                        onChange={HandleExpense}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter expense name"
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Amount</label>
                    <input
                        type="text"
                        name="amount"
                        value={ExpenseForm.amount || ''}
                        onChange={HandleExpense}
                        className={`form-input ${errors.amount ? 'error' : ''}`}
                        placeholder="Enter amount"
                    />
                    {errors.amount && <p className="error-message">{errors.amount}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                        name="category"
                        value={ExpenseForm.category || ''}
                        onChange={HandleExpense}
                        className={`form-select ${errors.category ? 'error' : ''}`}
                    >
                        <option value="">Select category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Online subscription">Online subscription</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.category && <p className="error-message">{errors.category}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={ExpenseForm.date || ''}
                        onChange={HandleExpense}
                        className={`form-input ${errors.date ? 'error' : ''}`}
                    />
                    {errors.date && <p className="error-message">{errors.date}</p>}
                </div>

                {edit ? (
                    <button className="submit-button" onClick={() => HandleUpdate(editId)}>Update</button>
                ) : (
                    <button type="button" onClick={HandleSubmit} className="submit-button">Add Expense</button>
                )}
            </div>

            <div className="expense-table-container">
                <h2 className="form-title">Expense List</h2>
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
                        {expenses.length === 0 ? (
                            <tr><td colSpan="6">No expense records yet.</td></tr>
                        ) : (
                            expenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.name}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.date}</td>
                                    <td><button onClick={() => HandleDelete(expense.id)}>🗑️</button></td>
                                    <td><button onClick={() => HandleEdit(expense.id)}>✏️</button></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
