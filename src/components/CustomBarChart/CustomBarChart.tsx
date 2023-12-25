import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {BarChartData} from '../../../types'

export type BarProps = {
  data: BarChartData[];

  colors: string[]
};

 
 const CustomBarChart: React.FC<BarProps> = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height="35%">
     <BarChart
       data={data}
       margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 40, // Увеличьте отступ снизу
      }}
     
     >
      {/* <XAxis dataKey="name" /> */}
      <XAxis 
      dataKey="name"
      tick={({ x, y, payload }) => (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" dominantBaseline="central"  fill="#666" >
            {payload.value}
          </text>
          <text x={0} y={20} dy={16} textAnchor="end" dominantBaseline="central" fill="green">
            {data[payload.index].gems}
          </text>
          {/* <text x={0} y={35} dy={16} textAnchor="end" dominantBaseline="central" fill="#666">
            камней
          </text> */}
        </g>
      )}
      />
      <YAxis />
       <Bar dataKey="uv" fill="#8884d8" label={{ position: 'top' }}>
         {data.map((_, index) => (
           <Cell key={`cell-${index}`} fill={colors[index % 20]} />
         ))}
       </Bar>
     </BarChart>
   </ResponsiveContainer>
  );
 }

export default CustomBarChart