import React, { PureComponent, Suspense } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";

function ChartData() {
  //DECLARE STATE
  const [categories, setCategories] = useState([]);
  const[data, setData] = useState([]);
  const[selectCat, setSelectCat] = useState('')

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
        if (selectCat === '' || selectCat === object.exp_category)
          newData.push({Created: date, Amount: dollar, Category: object.category_name, Percent_Change: Number(percentChange)})
   
      })
      console.log('SELECT CAT', selectCat)

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

  console.log("Chart DATA", data)

  useEffect(() => {
    fetch('/solo/cats')
    .then(response => response.json())
    .then((data) => {
      setCategories(data);
    })
    .catch((error) => console.log('Fetch Error AddExpense.jsx useEffect: ', error));
  }, [])

  const fetchedCategories = categories.map( (object, index) => {
    return (
      <option key={index} value={object._id}>{object.category}</option>
    )
  })
  fetchedCategories.unshift((<option>Pick One...</option>))

    return (
      <>
        <div>
          <form >
            <label>View by Category</label>
              <select onChange={(e) => setSelectCat(e.target.value)}>
                {fetchedCategories}
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
            <Line type="monotone" dataKey="Amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Percent_Change" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }



export default ChartData

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];