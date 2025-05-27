import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { SurvivalByAgeData } from '../../../types';

interface SurvivalByAgeChartProps {
  data: SurvivalByAgeData[];
}

const SurvivalByAgeChart: React.FC<SurvivalByAgeChartProps> = ({ data }) => {
  // Calculate overall survival rate for reference line
  const totalSurvived = data.reduce((acc, item) => acc + item.survived, 0);
  const totalPassengers = data.reduce((acc, item) => acc + item.total, 0);
  const overallSurvivalRate = (totalSurvived / totalPassengers) * 100;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-md shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-1">{label} years</p>
          <p className="text-sm text-gray-700">
            Survival Rate: <span className="font-medium text-primary-600">{item.survivalRate}%</span>
          </p>
          <p className="text-sm text-gray-700">
            Survived: <span className="font-medium text-primary-600">{item.survived}</span>
          </p>
          <p className="text-sm text-gray-700">
            Died: <span className="font-medium text-error-600">{item.died}</span>
          </p>
          <p className="text-sm text-gray-700">
            Total: <span className="font-medium">{item.total}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="ageGroup" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            label={{ 
              value: 'Survival Rate (%)', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#6b7280',
              fontSize: 12
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine 
            y={overallSurvivalRate} 
            stroke="#9CA3AF" 
            strokeDasharray="3 3"
            label={{ 
              value: 'Overall Average', 
              position: 'insideBottomRight',
              fill: '#6b7280',
              fontSize: 10
            }}
          />
          <Bar 
            name="Survival Rate (%)" 
            dataKey="survivalRate" 
            fill="#0d9488" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SurvivalByAgeChart;