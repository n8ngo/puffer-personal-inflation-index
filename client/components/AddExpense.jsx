import React, { Component } from 'react';
import { useState } from "react";

function AddExpense () {

  fetch('/solo/cats')
  .then(response => response.json())
  .then((data) => console.log('REACT FETCH', data))
  .catch((error) => console.log('FETCH ERROR', error))


  const options = ['Gas', 'Groceries', 'Electricity', 'Restaurants', 'Entertainment'];
  const selectOptions = options.map((element, index) => {
    console.log(element)
    return (
      <option key={index} value={element.toLowerCase()}>{element}</option>
    )
  })


  return (
    <div className='createExpense'>
      <h2>Add a New Expense</h2>
      <form>
        <label>Expense Name</label>
        <input 
          type='text'
          required
        />
        <label>Expense Amount</label>
        <input
          type='number'
          min='0.00'
          step='0.01'
          required
        />
        <label htmlFor='start'>Date of Purchase</label>
        <input
          type='date'
          id='start'
        />
        <label>Category</label>
        <select id='category dropdown'>
          {selectOptions}
        </select>
      </form>
    </div>



  );
}

export default AddExpense;