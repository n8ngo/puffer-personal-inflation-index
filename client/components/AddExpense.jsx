import React, { Component } from 'react';
import { useState } from "react";

function AddExpense () {


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

      </form>
    </div>



  );
}

export default AddExpense;