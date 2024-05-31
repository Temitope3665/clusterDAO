'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianAxis,
} from 'recharts';

interface IGraph {
  graphData: { title: string; value: string }[];
}
const Graph = ({ graphData }: IGraph) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className="pb-14">
      <LineChart
        width={500}
        height={400}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          // left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="7 7"
          vertical={false}
          stroke="#292929CC"
        />
        <CartesianAxis tickSize={20} />
        <XAxis
          dataKey="title"
          axisLine={false}
          className="md:py-4"
          fontWeight={300}
          fontSize={13}
        />
        <YAxis
          className="text-[#9C9C9C]"
          axisLine={false}
          fontWeight={300}
          fontSize={13}
        />

        <Tooltip
          cursor={{ stroke: '#C098F9', strokeWidth: 1.5, strokeDasharray: 5 }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#9050E9"
          activeDot={{ r: 8 }}
          strokeWidth={1.5}
        />
        <Line
          type="monotone"
          dataKey="orders"
          stroke="#0080FF"
          activeDot={{ r: 8 }}
          strokeWidth={1.5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
