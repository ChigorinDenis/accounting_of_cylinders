import React, { useEffect, useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Label } from 'semantic-ui-react';


const ChartSurvival = ({data}) => {
  return (
    <>
      <Label attached='top' color='blue'>Статистика вероятности безотказной работы</Label>
      <ResponsiveContainer width="100%" height="100%" minWidth="300px"  minHeight="350px">
        <LineChart data={data} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" label={{ value: 'Время(мес.)', position: 'insideBottomRight' }}/>
          <YAxis label={{ value: 'Вероятность', angle: -90, position: 'insideBottom' }}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="St" stroke="#34495e" name="Кривая безотказной работы"/>
        </LineChart>
      </ResponsiveContainer>
    </>
    );
};


export default ChartSurvival;

