import React from 'react';
import Chart from 'react-apexcharts';
import { mycontext } from '../App';
import { useContext } from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
// Dashboard Component
export default function Dashboard() {
const {token} = useContext(mycontext)
const [sampleIncomeData, setIncomeData] = useState([]);
const [sampleExpenseData, setExpenseData] = useState([]);
const [activeGoals, setactiveGoals] = useState([]);

const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [incomeRes, expenseRes , goalRes] = await Promise.all([
        axios.get('http://localhost:8000/api/GetIncome', { headers }),
        axios.get('http://localhost:8000/api/GetExpense', { headers }),
        axios.get('http://localhost:8000/api/GetGoal', { headers })
      ]);
      setIncomeData(incomeRes.data);
      setExpenseData(expenseRes.data);
      setactiveGoals(goalRes.data.length)
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    fetchDashboardData();
  }
}, [token]);

if (loading) return <div className="p-4">Loading...</div>;
////cut
// Calculations
const totalIncome = sampleIncomeData.reduce((sum, item) => sum + item.amount, 0);
const totalExpenses = sampleExpenseData.reduce((sum, item) => sum + item.amount, 0);
const balance = totalIncome - totalExpenses;

// Expenses by Category for Donut Chart
const expensesByCategory = sampleExpenseData.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + item.amount;
  return acc;
}, {});
const expenseCategoryLabels = Object.keys(expensesByCategory);
const expenseCategorySeries = Object.values(expensesByCategory);

// Monthly Income/Expense Line Chart Prep
const processMonthlyData = (data) => {
  const monthlyTotals = {};
  data.forEach(item => {
    if (item.date && item.amount) {
      const month = item.date.substring(0, 7);
      monthlyTotals[month] = (monthlyTotals[month] || 0) + item.amount;
    }
  });
  return monthlyTotals;
};
const monthlyIncomeData = processMonthlyData(sampleIncomeData);
const monthlyExpenseData = processMonthlyData(sampleExpenseData);
const allMonths = [...new Set([...Object.keys(monthlyIncomeData), ...Object.keys(monthlyExpenseData)])].sort();
const monthlyIncomeSeries = allMonths.map(month => monthlyIncomeData[month] || 0);
const monthlyExpenseSeries = allMonths.map(month => monthlyExpenseData[month] || 0);
const monthLabels = allMonths.map(monthStr => {
  const date = new Date(monthStr + '-01T12:00:00');
  return date.toLocaleString('default', { month: 'short' });
});

// Bar Chart (Income vs Expenses)
const incomeExpenseBarOptions = {
  chart: { 
    type: 'bar', 
    height: 350, 
    foreColor: '#ffffff',
    toolbar: { show: false }
  },
  plotOptions: {
    bar: { 
      horizontal: false, 
      columnWidth: '55%', 
      endingShape: 'rounded',
      distributed: true // This allows each bar to have its own color
    }
  },
  dataLabels: {
    enabled: true,
    formatter: val => "$" + val.toLocaleString(),
    style: { colors: ["#fff"] }
  },
  xaxis: {
    categories: ['Income', 'Expenses'],
    labels: { style: { colors: '#ffffff' } }
  },
  yaxis: {
    title: { text: 'Amount ($)', style: { color: '#ffffff' } },
    labels: {
      style: { colors: '#ffffff' },
      formatter: val => "$" + val.toLocaleString()
    }
  },
  colors: ['#00FF00', '#FF0000'], // Pure green and pure red
  fill: {
    type: 'solid',
    opacity: 1,
    colors: ['#00FF00', '#FF0000'] // Vibrant colors
  },
  series: [{
    name: 'Amount',
    data: [
      {
        x: 'Income',
        y: totalIncome,
        fillColor: '#00FF00' // Vivid green (RGB 0,255,0)
      },
      {
        x: 'Expenses',
        y: totalExpenses,
        fillColor: '#FF0000' // Vivid red (RGB 255,0,0)
      }
    ]
  }]
};

;// Donut Chart Options
const expenseCategoryDonutOptions = {
  chart: { type: 'donut', height: 350, foreColor: '#ffffff' },
  series: expenseCategorySeries,
  labels: expenseCategoryLabels,
  colors: ['#ff6d00', '#2962ff', '#d50000', '#2e7d32', '#7e57c2', '#ffb74d', '#fdd835', '#00acc1'],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total Expenses',
            color: '#ffffff',
            formatter: function (w) {
              return '$' + w.globals.seriesTotals.reduce((a, b) => a + b, 0);
            }
          }
        }
      }
    }
  },
  legend: { position: 'bottom', labels: { colors: ['#ffffff'] } },
  dataLabels: {
    enabled: true,
    formatter: val => val.toFixed(1) + "%",
    style: { fontSize: '12px', colors: ["#fff"] },
    dropShadow: { enabled: false }
  },
  responsive: [{
    breakpoint: 480,
    options: { chart: { width: 200 }, legend: { position: 'bottom' } }
  }]
};

// Line Chart Options
const monthlyIncomeExpenseLineOptions = {
  chart: {
    type: 'line',
    height: 350,
    toolbar: { show: false },
    zoom: { enabled: true },
    foreColor: '#ffffff'
  },
  colors: ['#00E396', '#FF4560'], // Bright Green & Red
  series: [
    { name: 'Income', data: monthlyIncomeSeries },
    { name: 'Expenses', data: monthlyExpenseSeries }
  ],
  xaxis: {
    categories: monthLabels,
    labels: { style: { colors: '#ffffff' } },
    title: { text: 'Month', style: { color: '#ffffff' } }
  },
  yaxis: {
    title: { text: 'Amount ($)', style: { color: '#ffffff' } },
    labels: {
      style: { colors: '#ffffff' },
      formatter: val => typeof val !== 'number' ? '$0' : "$" + val.toLocaleString()
    }
  },
  tooltip: {
    theme: 'dark',
    y: {
      formatter: val => typeof val !== 'number' ? '$0' : "$ " + val.toLocaleString()
    }
  },
  stroke: { 
    curve: 'smooth',
    width: 3, // Makes lines thicker (optional)
    colors: ['#00E396', '#FF4560'] // Alternative way to set colors
  },
  markers: { size: 4 },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    labels: { colors: ['#ffffff'] }
  },
  grid: { borderColor: '#474747' }
};
/////
  return (
    <div>
      <div className="main-title">
        <h2>DASHBOARD</h2>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner"><h3>TOTAL INCOME</h3><span className="material-icons-outlined">account_balance_wallet</span></div>
          <h1>{totalIncome.toLocaleString()} MAD</h1>
        </div>
        <div className="card">
          <div className="card-inner"><h3>TOTAL EXPENSES</h3><span className="material-icons-outlined">receipt_long</span></div>
          <h1>{totalExpenses.toLocaleString()} MAD</h1>
        </div>
        <div className="card">
          <div className="card-inner"><h3>BALANCE</h3><span className="material-icons-outlined">savings</span></div>
          <h1 style={{ color: balance < 0 ? '#ffcccc' : 'inherit' }}>{balance.toLocaleString()} MAD</h1>
        </div>
        <div className="card">
          <div className="card-inner"><h3>ACTIVE GOALS</h3><span className="material-icons-outlined">flag</span></div>
          <h1>{activeGoals}</h1>
        </div>
      </div>

      <div className="charts">
        <div className="charts-card">
          <h2 className="chart-title">Income vs. Expenses (Total)</h2>
          <Chart
            options={incomeExpenseBarOptions}
            series={incomeExpenseBarOptions.series}
            type="bar"
            height={incomeExpenseBarOptions.chart.height}
          />
        </div>
        <div className="charts-card">
          <h2 className="chart-title">Expenses by Category</h2>
          <Chart
            options={expenseCategoryDonutOptions}
            series={expenseCategoryDonutOptions.series}
            type="donut"
            height={expenseCategoryDonutOptions.chart.height}
          />
        </div>
      </div>

      <div className="charts-card" style={{ marginTop: '20px' }}>
        <h2 className="chart-title">Monthly Income vs. Expense Trend</h2>
        <Chart
          options={monthlyIncomeExpenseLineOptions}
          series={monthlyIncomeExpenseLineOptions.series}
          type="line"
          height={monthlyIncomeExpenseLineOptions.chart.height}
        />
      </div>
    </div>
  );
}
