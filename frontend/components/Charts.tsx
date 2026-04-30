import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface TrendChartProps {
  data: any[];
  dataKey: string;
  color: string;
  label: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, dataKey, color, label }) => {
  return (
    <div className="w-full" style={{ minHeight: 250, height: 260, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={260} minHeight={250} minWidth={0}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#525252" opacity={0.2} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#888' }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#888' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#171717', 
              borderColor: '#404040', 
              color: '#f5f5f5',
              borderRadius: '0px',
              border: '1px solid #404040'
            }}
            itemStyle={{ color: color }}
            cursor={{ stroke: '#888', strokeWidth: 1 }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#color${dataKey})`} 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

interface ForecastChartProps {
  data: any[];
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  return (
    <div className="w-full" style={{ minHeight: 250, height: 260, minWidth: 0 }}>
      <ResponsiveContainer width="100%" height={260} minHeight={250} minWidth={0}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#525252" opacity={0.2} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#888' }} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#888' }} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
             contentStyle={{ 
              backgroundColor: '#171717', 
              borderColor: '#404040', 
              color: '#f5f5f5',
              borderRadius: '0px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="aqi" 
            stroke="#fbbf24" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#fbbf24', strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          {/* Confidence interval simulated as dashed lines for this demo */}
          <Line 
            type="monotone" 
            dataKey="confidenceUpper" 
            stroke="#fbbf24" 
            strokeDasharray="5 5" 
            strokeOpacity={0.5} 
            dot={false} 
          />
          <Line 
            type="monotone" 
            dataKey="confidenceLower" 
            stroke="#fbbf24" 
            strokeDasharray="5 5" 
            strokeOpacity={0.5} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
