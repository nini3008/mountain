import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface BMIChartProps {
  bmi: number;
}

export function BMIChart({ bmi }: BMIChartProps) {
  // BMI categories data
  const data = [
    { name: 'Underweight', range: '< 18.5', min: 0, max: 18.5, color: '#93C5FD' },
    { name: 'Normal', range: '18.5-24.9', min: 18.5, max: 24.9, color: '#4ADE80' },
    { name: 'Overweight', range: '25-29.9', min: 25, max: 29.9, color: '#FCD34D' },
    { name: 'Obese', range: '≥ 30', min: 30, max: 40, color: '#F87171' }
  ];

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 40]} />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="max" fill="#8884d8" minPointSize={5}>
            {data.map((entry, index) => (
              <Bar key={`bar-${index}`} dataKey="max" fill={entry.color} />
            ))}
          </Bar>
          <ReferenceLine
            x={bmi}
            stroke="#000"
            strokeWidth={2}
            label={{ value: `Your BMI: ${bmi}`, position: 'top' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}