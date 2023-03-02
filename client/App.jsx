import React, { Component, Suspense } from 'react';
import { useState } from 'react';
import { AppContainer } from 'react-hot-loader';
import Dropdown from './components/Dropdown';
import AddExpense from './components/AddExpense';
import ChartData from './components/ChartData';
import ListFiles from './components/ListFiles';
import './styles.css';

/*
 GOALS:
 ADD AREA TO DELETE EXPENSES
 ADD STYLING
 ADD PIE CHART
*/

const App = props => {

  //FOR ADD EXPENSE
  const [categories, setCategories] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [category, setCategory] = useState('')
  const [expenseNote, setExpenseNote] = useState('');

  //FOR CHARTDATA
  const[data, setData] = useState([]);

  const [selected, setSelected] = useState('Category');
  return (
    
    <>
    <Suspense fallback={<div>LOADING</div>}>
      <header className="header">
        <h1>Personal Inflation Index</h1>
            <Dropdown selected={selected} setSelected={setSelected}/>
      </header>
      <main>

        <div className='graphics'>
          <ChartData category={category} data={data} setData={setData}/>
        </div>
        <div className='sidebar'>
          <AddExpense 
          categories={categories} expenseName={expenseName} expenseAmount={expenseAmount} expenseDate={expenseDate} category={category} expenseNote={expenseNote}
          setCategories={setCategories} setExpenseName={setExpenseName} setExpenseAmount={setExpenseAmount} setExpenseDate={setExpenseDate} setCategory={setCategory} setExpenseNote={setExpenseNote}
          />
        </div>

      </main>
      <footer>
        <ListFiles data={data} setData={setData}/>
      </footer>
      </Suspense>
    </>
    
  );
};

export default App;