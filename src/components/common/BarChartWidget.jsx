import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function BarChartWidget({ data = [] }) {
  return (
    <div className="glass-card rounded-2xl p-4 bg-white dark:bg-[#071024]">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Monthly Orders</h3>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.06} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
