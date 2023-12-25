import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export type BarProps = {
  data: {
    name: string,
    uv: number,
  }[];

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
         bottom: 5,
       }}
     >
       <XAxis dataKey="name" />
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