import React, { Component } from 'react';
import { useState } from 'react';
import { AppContainer } from 'react-hot-loader';
import Dropdown from './components/Dropdown';
import AddExpense from './components/AddExpense';


import './styles.css';

const App = props => {
  const [selected, setSelected] = useState('Category');
  return (
    <>
      <header className="header">
        <h1>Personal Inflation Index</h1>
      </header>
      <main>

        <div className='sidebar'>
          <AddExpense/>
          <div>
            <Dropdown selected={selected} setSelected={setSelected}/>
          </div>
          HELLO WORLD
        </div>

        <div className='graphics'>

        </div>
      </main>
    </>
  );
};

export default App;