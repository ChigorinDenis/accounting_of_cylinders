import React, { useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';


// const data = [
//   { time: 0, f: 1 },
//   { time: 5, f: 0.99 },
//   { time: 11, f: 0.99 },
//   { time: 17, f: 0.97 },
//   { time: 23, f: 0.91 },
//   { time: 28, f: 0.88 },
//   { time: 34, f: 0.87 },
//   { time: 40, f: 0.82 },
//   { time: 45, f: 0.79 },
//   { time: 51, f: 0.75 },
//   { time: 56, f: 0.73 },
//   { time: 62, f: 0.71 },
//   { time: 68, f: 0.70 },
//   { time: 73, f: 0.67 },
//   { time: 79, f: 0.65 },
//   { time: 85, f: 0.63 },
//   { time: 91, f: 0.62 },
//   { time: 97, f: 0.60 },
//   { time: 103, f: 0.59 },
//   { time: 109, f: 0.56 },
//   { time: 115, f: 0.55 },
//   { time: 120, f: 0.54 },
//   { time: 126, f: 0.50 },
//   { time: 132, f: 0.48 },
//   { time: 139, f: 0.47 },
//   { time: 145, f: 0.46 },
//   { time: 150, f: 0.42 },
//   { time: 156, f: 0.40 },
//   { time: 161, f: 0.39 },
// ]


const ChartSurvival = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth="300px"  minHeight="300px">
      <LineChart data={data} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" label={{ value: 'Время', position: 'bottom' }}/>
        <YAxis label={{ value: 'Вероятность безотказной работы', angle: -90, position: 'insideLBottomLeft' }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="St" stroke="#8884d8" name="Кривая безотказной работы"/>
      </LineChart>
    </ResponsiveContainer>
    );
};


export default ChartSurvival;

