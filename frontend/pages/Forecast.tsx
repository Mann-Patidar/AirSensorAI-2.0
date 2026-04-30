import React from 'react';
import { ForecastChart } from '../components/Charts';
import { generateForecastData } from '../constants';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertCircle } from 'lucide-react';

const Forecast: React.FC = () => {
  const forecastData = generateForecastData();
  const nextHourAQI = forecastData[1].aqi;
  const trend = nextHourAQI > forecastData[0].aqi ? "Rising" : "Falling";

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
           <div className="flex items-center gap-2 text-indigo-500 mb-2">
              <Brain size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">ML Powered Prediction</span>
           </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">AI Air Quality Forecast</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6"
        >
          <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">Predicted AQI (Next 6 Hours)</h3>
          <ForecastChart data={forecastData} />
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-500">
             <div className="flex items-center gap-2">
               <div className="w-3 h-1 bg-amber-400" /> Prediction
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-1 border-t border-dashed border-amber-400" /> Confidence Interval
             </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-indigo-600 p-6 text-white"
          >
             <div className="flex items-start justify-between">
                <div>
                  <div className="text-indigo-200 text-sm uppercase tracking-wider mb-1">Outlook</div>
                  <div className="text-3xl font-bold">{trend} Trend</div>
                </div>
                <TrendingUp size={32} className="text-indigo-300" />
             </div>
             <p className="mt-4 text-indigo-100 text-sm leading-relaxed">
               Based on current traffic patterns and meteorological data, we expect PM2.5 levels to {trend.toLowerCase()} slightly over the next hour.
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6"
          >
             <h4 className="font-bold flex items-center gap-2 mb-3">
               <AlertCircle size={18} />
               Recommendation
             </h4>
             <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
               {nextHourAQI > 100 
                 ? "Conditions are expected to deteriorate. Plan your commute accordingly or carry a mask." 
                 : "Air quality is expected to remain stable. Safe for outdoor activities."}
             </p>
             <div className="w-full bg-gray-200 dark:bg-neutral-700 h-1">
               <div className="bg-indigo-500 h-1" style={{ width: '85%' }} />
             </div>
             <div className="text-right text-xs text-gray-500 mt-1">85% Prediction Confidence</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
