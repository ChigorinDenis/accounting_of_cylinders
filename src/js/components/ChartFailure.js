import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Label } from 'semantic-ui-react';


const ChartFailure = ({data}) => {
    return (
      <>
      <Label attached='top' color='blue' >Статистика отказов сосудов</Label>
      <ResponsiveContainer width="100%" height="100%" minWidth="300px"  minHeight="300px">
        <BarChart
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
          <XAxis dataKey="time"  label={{ value: 'Время(мес.)', position: 'insideBottomRight' }}/>
          <YAxis label={{ value: 'Количество', angle: -90, position: 'insideBottom' }}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#a29bfe" name="Общее число"/>
          <Bar dataKey="dead" fill="#ff7675" name="Отказы" />
          
        </BarChart>
      </ResponsiveContainer>
      </>
    );
}

export default ChartFailure;