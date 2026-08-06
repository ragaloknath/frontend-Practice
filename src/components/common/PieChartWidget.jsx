import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#6366F1', '#06B6D4', '#F59E0B', '#10B981', '#EF4444'];

export default function PieChartWidget({ data = [] }) {
  return (
    <div className="glass-card rounded-2xl p-4 bg-white dark:bg-[#071024]">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Category Share</h3>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
