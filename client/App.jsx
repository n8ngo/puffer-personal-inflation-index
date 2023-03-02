import React, { Component, Suspense } from 'react';
import { useState } from 'react';
import { AppContainer } from 'react-hot-loader';
import Dropdown from './components/Dropdown';
import AddExpense from './components/AddExpense';
import ChartData from './components/ChartData';


import './styles.css';

const App = props => {
  const [selected, setSelected] = useState('Category');
  return (
    
    <>
      <header className="header">
        <h1>Personal Inflation Index</h1>
            <Dropdown selected={selected} setSelected={setSelected}/>
      </header>
      <main>

        <div className='graphics'>
          <ChartData/>
        </div>
        <div className='sidebar'>
          <AddExpense/>
        </div>

      </main>
    </>
    
  );
};

export default App;