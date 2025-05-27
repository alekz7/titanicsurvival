import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SurvivalByEmbarkedData } from '../../../types';

interface SurvivalByEmbarkedChartProps {
  data: SurvivalByEmbarkedData[];
}

const SurvivalByEmbarkedChart: React.FC<SurvivalByEmbarkedChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-md shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-1">{item.portName} ({item.port})</p>
          <p className="text-sm text-gray-700">
            Survived: <span className="font-medium text-primary-600">{item.survived}</span> ({item.survivalRate}%)
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
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="portName" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            label={{ 
              value: 'Number of Passengers', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#6b7280',
              fontSize: 12
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            name="Survived" 
            dataKey="survived" 
            fill="#2563eb" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar 
            name="Died" 
            dataKey="died" 
            fill="#ef4444" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationDelay={300}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SurvivalByEmbarkedChart;