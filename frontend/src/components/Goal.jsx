import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { mycontext } from '../App';

export default function Goal() {
    const [GoalForm, SetGoalForm] = useState({});
    const [errors, setErrors] = useState({});
    const [goals, setGoals] = useState([]);
    const { token } = useContext(mycontext);
    const [sampleIncomeData, setIncomeData] = useState([]);
    const [sampleExpenseData, setExpenseData] = useState([]);
    
    const HandleGoal = (e) => {
        SetGoalForm({ ...GoalForm, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
    };
    const Handledelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/DeleteGoal/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setGoals(goals.filter(goal => goal.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const HandleSubmit = async () => {
        let newErrors = {};
        if (!GoalForm.name) newErrors.name = "Goal name is required.";
        if (!GoalForm.price || GoalForm.price <= 0) newErrors.price = "Enter a valid price.";
        if (!GoalForm.months || GoalForm.months <= 0) newErrors.months = "Enter a valid number of months.";
        if (!GoalForm.date) newErrors.date = "Target date is required.";

        const monthly_target = (GoalForm.price / GoalForm.months).toFixed(2);
        if (monthly_target > balance) {
            newErrors.months = `Balance too low. You need ${monthly_target} MAD/month.`;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const newGoal = { ...GoalForm, monthly_target };

            await axios.post('http://localhost:8000/api/PostGoal', newGoal, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            SetGoalForm({});
            setErrors({});
            fetchGoals();
        } catch (error) {
            console.error('Error:', error.response?.data);
        }
    };

    const fetchGoals = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/GetGoal', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGoals(res.data);
        } catch (error) {
            console.error('Fetch error:', error.response?.data);
        }
    };
    const fetchBalance = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
    
          const [incomeRes, expenseRes] = await Promise.all([
            axios.get('http://localhost:8000/api/GetIncome', { headers }),
            axios.get('http://localhost:8000/api/GetExpense', { headers }),
          ]);
    
          setIncomeData(incomeRes.data);
          setExpenseData(expenseRes.data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        }
      };

    useEffect(() => {
        fetchGoals();
        fetchBalance();
    }, [token]);
    const totalIncome = sampleIncomeData.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = sampleExpenseData.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpenses;
    return (
        <div className="expense-container">
            <div className="expense-form">
                <h2 className="form-title">Add a Goal</h2>
                <form>
                    <div className="form-group">
                        <label className="form-label">Goal Name</label>
                        <input
                            type="text"
                            name="name"
                            value={GoalForm.name || ''}
                            onChange={HandleGoal}
                            className="form-input"
                            placeholder="Enter goal name"
                        />
                        {errors.name && <p className="input-error">{errors.name}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Total Cost</label>
                        <input
                            type="number"
                            name="price"
                            value={GoalForm.price || ''}
                            onChange={HandleGoal}
                            className="form-input"
                            placeholder="Enter total cost"
                        />
                        {errors.price && <p className="input-error">{errors.price}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Months to Save</label>
                        <input
                            type="number"
                            name="months"
                            value={GoalForm.months || ''}
                            onChange={HandleGoal}
                            className="form-input"
                            placeholder="Enter number of months"
                        />
                        {errors.months && <p className="input-error">{errors.months}</p>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Target Date</label>
                        <input
                            type="date"
                            name="date"
                            value={GoalForm.date || ''}
                            onChange={HandleGoal}
                            className="form-input"
                        />
                        {errors.date && <p className="input-error">{errors.date}</p>}
                    </div>

                    <button
                        type="button"
                        onClick={HandleSubmit}
                        className="submit-button"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className="goals-grid">
                {goals.map((goal) => (
                     <div key={goal.id} className="goal-card">
                     <span
                         className="delete-icon material-icons-outlined"
                         title="Delete Goal"
                         onClick={() => Handledelete(goal.id)}>
                         delete_outline
                     </span>                    

                     <div className="goal-card-header">
                         <h3>{goal.name}</h3>
                     </div>
                     <div className="goal-card-content">
                         <div className="goal-info">
                             <span className="info-label">Total Cost:</span>
                             <span className="info-value">${goal.price}</span>
                         </div>
                         <div className="goal-info">
                             <span className="info-label">Duration:</span>
                             <span className="info-value">{goal.months} months</span>
                         </div>
                         <div className="goal-info">
                             <span className="info-label">Monthly Target:</span>
                             <span className="info-value">${goal.monthly_target}</span>
                         </div>
                         <div className="goal-info">
                             <span className="info-label">Target Date:</span>
                             <span className="info-value">{new Date(goal.date).toLocaleDateString()}</span>
                         </div>
                     </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
