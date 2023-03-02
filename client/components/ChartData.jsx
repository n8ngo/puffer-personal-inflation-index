import React, { PureComponent, Suspense } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState, useEffect } from "react";

function ChartData() {
  //DECLARE STATE
  const [categories, setCategories] = useState([]);
  const[data, setData] = useState([]);
  const[selectCat, setSelectCat] = useState('')
  const[time, setTime] = useState('')

  //USE EFFECT FOR CATEGORY CHANGES
  useEffect(() => {
    fetch('/solo')
    .then(response => response.json())
    .then((data) => {
      //sort by date
      data.sort(( a , b ) => (a.exp_created < b.exp_created) ? -1 : ((a.exp_created > b.exp_created) ? 1 : 0))
      const newData = [];
      data.forEach( (object, i) => {

        //CALC DATE FROM ISO AND DOLLAR FROM STRING
        let date = isoToDate(object.exp_created)
        let dollar = Number(object.exp_amt.replace(/[^0-9.-]+/g,""))

        //CALC PERCENT CHANGE
        let percentChange;
        let currentVal = Number(object.exp_amt.replace(/[^0-9.-]+/g,""));
        let pastVal;
        if (i === 0) percentChange = 0;
        if (i > 0) {
          pastVal = Number(data[i-1].exp_amt.replace(/[^0-9.-]+/g,""))
          percentChange = (((currentVal - pastVal) / pastVal) * 100).toFixed(2);
      };

        //PUSH TO NEW ARRAY
        if (selectCat === '' || selectCat === object.exp_category || selectCat === 'All')
          newData.push({Created: date, Amount: dollar, Category: object.category_name, Percent_Change: Number(percentChange)})
      })
      setData(newData);
    })
  }, [selectCat])



  function isoToDate (ISOString) {
    let date = new Date(ISOString);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    if (dt < 10) dt = '0' + dt
    if (month < 10) month = '0' + month
   return (year+'-' + month + '-' + dt);
  }

  //USEEFFECT FOR GETTING CATEGORIES
  useEffect(() => {
    fetch('/solo/cats')
    .then(response => response.json())
    .then((data) => {
      setCategories(data);
    })
    .catch((error) => console.log('Fetch Error AddExpense.jsx useEffect: ', error));
  }, [time])

  const fetchedCategories = categories.map( (object, index) => {
    return (
      <option key={index} value={object._id}>{object.category}</option>
    )
  })
  fetchedCategories.unshift((<option>All</option>))
  fetchedCategories.unshift((<option>Pick One...</option>))

  //USEEFFECT FOR TIME CHANGE
  useEffect(() => {
    console.log('time changed')
    const newData = [];
    const cache = {};
    data.forEach(object => {
      if (!cache.hasOwnProperty(object.Created.slice(0,7))) {
        cache[object.Created.slice(0,7)] = object.Amount;
      } else {
        cache[object.Created.slice(0,7)] += object.Amount;  
      }
    })
    Object.keys(cache).forEach(key => {
      newData.push({
        Created: key,
        Amount: cache[key]
      })
    })
    newData.forEach((object,i) => {
      let percentChange;
      let currentVal = Number(object.Amount.toString().replace(/[^0-9.-]+/g,""));
      let pastVal;
      if (i === 0) percentChange = 0;
      if (i > 0) {
        pastVal = Number(newData[i-1].Amount.toString().replace(/[^0-9.-]+/g,""))
        percentChange = (((currentVal - pastVal) / pastVal) * 100).toFixed(2);
        object.Percent_Change = percentChange;
      }
    })
    console.log("Chart DATA", newData)
    setData(newData);
  }, [time])



    return (
      <>
        <div className='view-selector'>
          <form>
            <label>View by Category</label>
              <select onChange={(e) => setSelectCat(e.target.value)}>
                {fetchedCategories}
              </select>
            <label>Time Group</label>
              <select onChange={(e) => setTime(e.target.value)}>
                <option>All Time</option>
                <option>By Month</option>
              </select>
          </form>
        </div>
        <ResponsiveContainer id='chart' width="100%" aspect={2} >
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Created" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Amount" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={4}/>
            <Line type="monotone" dataKey="Percent_Change" stroke="#82ca9d" strokeWidth={2}/>
            <ReferenceLine y={0} stroke="#000000"/>
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }



export default ChartData

