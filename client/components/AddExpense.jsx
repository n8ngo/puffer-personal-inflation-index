import React, { Component, Suspense } from 'react';
import { useState, useEffect } from "react";

function AddExpense ({categories,expenseName,expenseAmount,expenseDate,category,expenseNote,setCategories,setExpenseName,setExpenseAmount,setExpenseDate,setCategory,setExpenseNote}) {

//DECLARE STATE
// const [categories, setCategories] = useState([]);
// const [expenseName, setExpenseName] = useState('');
// const [expenseAmount, setExpenseAmount] = useState('');
// const [expenseDate, setExpenseDate] = useState('');
// const [category, setCategory] = useState('')
// const [expenseNote, setExpenseNote] = useState('');
// const [newExpense, ]

//GET ALL CATEGORIES FROM CATEGORY TABLE. STORE IN STATE (CATEGORIES)
  useEffect(() => {
    fetch('/solo/cats')
    .then(response => response.json())
    .then((data) => {
      setCategories(data);
    })
    .catch((error) => console.log('Fetch Error AddExpense.jsx useEffect: ', error));
  }, [])

//MAP ALL CATEGORIES TO OPTIONS ELEMENTS
  const fetchedCategories = categories.map( (object, index) => {
    return (
      <option key={index} value={object._id}>{object.category}</option>
    )
  })
  fetchedCategories.unshift((<option>Pick One...</option>))

//HANDLE FORM SUBMIT EVENT
  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {exp_name: expenseName, exp_amt: Number(expenseAmount), exp_created: expenseDate, exp_category: category, exp_note: expenseNote};
    categories.forEach(object => {
      if (object.category === category) {
        expense.category = category
      }
    })

    //FETCH POST TO CREATE ROW IN EXPENSE TABLE
    fetch('/solo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    }).then(() => {
      console.log('New Expense Added!')
      setExpenseName('');
      setExpenseAmount('');
      setExpenseDate('');
      setCategory('');
      setExpenseNote('');
    })


  }


  return (
    <div className='createExpense'>
      <h2>Add a New Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>Expense Name</label>
        <input 
          type='text'
          required
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <label>Expense Amount</label>
        <input
          type='number'
          min='0.00'
          step='0.01'
          required
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />
        <label htmlFor='start'>Date of Purchase</label>
        <input
          type='date'
          id='start'
          value={expenseDate}
          onChange={(e) => setExpenseDate(e.target.value)}
        />
        <label>Category</label>
        <select id='category dropdown' value={category} onChange={(e) => setCategory(e.target.value)}>
          {fetchedCategories}
        </select>
        <label htmlFor='note'>Add a Note <small>(optional)</small></label>
        <textarea value={expenseNote} onChange={(e) => setExpenseNote(e.target.value)}>
        </textarea>
        <button>Add Expense</button>
      </form>
    </div>



  );
}

export default AddExpense;