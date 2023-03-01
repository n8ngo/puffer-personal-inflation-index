import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from "react";


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

function ChartData() {
  //DECLARE STATE
  const[data, setData] = useState([]);

  useEffect(() => {
    fetch('/solo')
    .then(response => response.json())
    .then((data) => {
      //sort by date
      data.sort(( a , b ) => b.exp_created - a.exp_created)

      setData(data);
    })
  }, [])

  console.log("Chart DATA", data)

  // useEffect(() => {
  //   fetch('/favorite')
  //   .then(response => response.json())
  //   .then(data => setFavoriteMovies(data))
  //   .then(console.log('FAV MOVIES IN THEN CHAIN', favoriteMovies))
  //   .catch((e) => console.log(e))
  // }, []);

  // console.log('fav movies outside useeffect', favoriteMovies)

    return (
        <ResponsiveContainer id='chart' width="100%" >
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
 
    );
  }



export default ChartData