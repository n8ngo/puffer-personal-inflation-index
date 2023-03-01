import React, { Component } from 'react';
import { useState } from "react";


function Dropdown ({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ['Gas', 'Groceries', 'Electricity', 'Restaurants', 'Entertainment'];

  const optComponents = options.map((option) => {
    return (<div key={option} className='dropdown-item' onClick={(e) => {
      setSelected(option)
      setIsActive(false)
    }}>
      {option}
    </div>)
  });

  return (
    <>
      <div className="dropdown">
        <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>{selected}</div>
        <span className='fas fa-caret-down'></span>
        {isActive && (
          <div className='dropdown-content'>
            {optComponents}
          </div>
        )}
      </div>
    </>
  );
}

export default Dropdown;