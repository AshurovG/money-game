import React from 'react'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';

export type LineProps = {
    data: {
        uv: number, 
    }[];
};

const CustomLineChart: React.FC<LineProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 50,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="custom-tooltip">
                  <p className="label">{`${label}`}</p>
                  <p className="desc">{`${payload[0].value}`}</p>
                </div>
              );
            }

              return null;
            }} />
            <ReferenceLine label="Max" stroke="red" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      );
}

export default CustomLineChart