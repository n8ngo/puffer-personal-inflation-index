import React, { PureComponent, Suspense } from 'react';
import { useState, useEffect } from "react";

const ListFiles = ({data, setData}) => {

  const [lineItems, setLineItems] = useState([]);

  // console.log('INSIDE LIST FILES', data)
  // console.log('setdata inside listfiles', setData)

  useEffect(() => {
    fetch('/solo')
    .then(response => response.json())
    .then((data) => {
      setLineItems(data.reverse())
      // console.log('lineItemData', data)
    })
  },[data])

  const handleDelete = (e) => {
    console.log('EVENT', e.target.id)
    fetch(`/solo/${e.target.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(data => {
      const newLineItems = lineItems.filter(object => object._id !== data.url.slice(-2))
      setLineItems([...newLineItems]);
    })
  }
  
  const lineItemComponents = lineItems.map((object, index) => {
    return (
      <tr>
        <td>{object.category_name}</td>
        <td>{object.exp_name}</td>
        <td>{object.exp_amt}</td>
        <td>{object.exp_created.slice(0,10)}</td>
        <td>{object.exp_note}</td>
        <td><button id={object._id} onClick={handleDelete}>X</button></td>
      </tr>
    )
  })

  return (
    <>
      <table className='lineItemContainer'>
        <tr>
          <th>Category</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Created</th>
          <th>Note</th>
          <th></th>
        </tr>
        {lineItemComponents}
      </table>

    </>
  )
}

export default ListFiles;