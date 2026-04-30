import React from 'react';
import { TrendChart } from '../components/Charts';
import { generateForecastData } from '../constants';
import { Download, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Trends: React.FC = () => {
  // Use mock forecast data as historical for demo purposes
  const data = generateForecastData().map((d, i) => ({ ...d, pm25: d.aqi / 1.5, pm10: d.aqi }));
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pollution Trends</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Analyze historical air quality patterns.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
            <Calendar size={16} />
            Last 24 Hours
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-medium uppercase tracking-wider hover:opacity-90 transition-opacity">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <div className="w-3 h-3 bg-indigo-500" />
            PM 2.5 Trends (Last 6h)
          </h3>
          <TrendChart data={data} dataKey="pm25" color="#6366f1" label="PM 2.5" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <div className="w-3 h-3 bg-emerald-500" />
            PM 10 Trends (Last 6h)
          </h3>
          <TrendChart data={data} dataKey="pm10" color="#10b981" label="PM 10" />
        </motion.div>
      </div>
    </div>
  );
};

export default Trends;