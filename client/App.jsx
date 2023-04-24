import React, {Component, Suspense} from 'react';
import {useState} from 'react';
import {AppContainer} from 'react-hot-loader';
import Dropdown from './components/Dropdown';
import AddExpense from './components/AddExpense';
import ChartData from './components/ChartData';
import ListFiles from './components/ListFiles';
import './styles.css';
import {getComponentTree} from 'react-component-tree';
const componentTree = getComponentTree(<App />);
const componentNames = componentTree.children.map((child) => child.name);
console.log('REACT COMPONENT TREE', componentNames);

/*
 GOALS:
 ADD AREA TO DELETE EXPENSES
 ADD STYLING
 ADD PIE CHART
*/

const App = (props) => {
  //FOR ADD EXPENSE
  const [categories, setCategories] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [category, setCategory] = useState('');
  const [expenseNote, setExpenseNote] = useState('');

  //FOR CHARTDATA
  const [data, setData] = useState([]);

  const [selected, setSelected] = useState('Category');
  return (
    <>
      <Suspense fallback={<div>LOADING</div>}>
        <header className="header">
          <img src="./puffer.png" alt="" />
          <h1>
            Puffer <span>A personalized inflation tracking tool!</span>
          </h1>
        </header>
        <main>
          <div className="graphics">
            <ChartData
              expenseNote={expenseNote}
              data={data}
              setData={setData}
            />
          </div>
          <div className="sidebar">
            <AddExpense
              categories={categories}
              expenseName={expenseName}
              expenseAmount={expenseAmount}
              expenseDate={expenseDate}
              category={category}
              expenseNote={expenseNote}
              setCategories={setCategories}
              setExpenseName={setExpenseName}
              setExpenseAmount={setExpenseAmount}
              setExpenseDate={setExpenseDate}
              setCategory={setCategory}
              setExpenseNote={setExpenseNote}
            />
          </div>
        </main>
        <footer>
          <div className="footer">
            <ListFiles data={data} setData={setData} />
          </div>
        </footer>
        <div className="whywhywhy">
          <Dropdown selected={selected} setSelected={setSelected} />
        </div>
      </Suspense>
    </>
  );
};

export default App;
