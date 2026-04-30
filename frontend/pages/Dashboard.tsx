import React from 'react';
import { motion } from 'framer-motion';
import { SensorData, AQILevel } from '../types';
import { getAQIColor, getAQILevel, generateForecastData } from '../constants';
import { Thermometer, Droplets, Wind, Activity, AlertTriangle, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface DashboardProps {
  data: SensorData;
}

const StatCard: React.FC<{ label: string; value: string | number; unit: string; icon: React.ReactNode; trend?: string }> = ({ label, value, unit, icon, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6 flex flex-col justify-between h-full hover:border-gray-400 dark:hover:border-neutral-600 transition-colors"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300">
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span className="ml-1">2%</span>
        </div>
      )}
    </div>
    <div>
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{label}</h3>
      <div className="flex items-baseline mt-1">
        <span className="text-3xl font-bold font-mono text-gray-900 dark:text-white">{value}</span>
        <span className="ml-1 text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  </motion.div>
);

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const aqiColor = getAQIColor(data.level);
  
  // Get forecast for next hour (index 1, as index 0 is current)
  const forecast = generateForecastData()[1]; 
  const forecastLevel = getAQILevel(forecast.aqi);
  const forecastColor = getAQIColor(forecastLevel);

  const precautions = [
    { level: AQILevel.UNHEALTHY, text: "Wear an N95 mask outdoors." },
    { level: AQILevel.UNHEALTHY_SENSITIVE, text: "Sensitive groups should reduce outdoor exertion." },
    { level: AQILevel.MODERATE, text: "Keep windows closed if possible." },
    { level: AQILevel.GOOD, text: "Great day for outdoor activities!" }
  ];

  const currentPrecaution = precautions.find(p => data.level === p.level) || precautions[0];

  const scrollToForecast = () => {
    const element = document.getElementById('forecast');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 dark:border-neutral-800 pb-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Real-Time Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Last updated: <span className="font-mono">{new Date(data.timestamp).toLocaleTimeString()}</span>
          </p>
        </div>
        <div className="mt-4 md:mt-0 px-3 py-1 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-xs font-mono uppercase">
          Live Stream Active
        </div>
      </motion.div>

      {/* Main AQI Display and Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          layoutId="aqi-card"
          className="lg:col-span-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
        >
          {/* Color Bar Indicator */}
          <div className="absolute top-0 left-0 w-2 h-full" style={{ backgroundColor: aqiColor }} />
          
          <div className="z-10 flex-1">
             <div className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2">Air Quality Index</div>
             <div className="text-7xl md:text-8xl font-bold font-mono text-gray-900 dark:text-white" style={{ color: aqiColor }}>
               {data.aqi}
             </div>
             <div className="text-2xl font-medium mt-2 text-gray-700 dark:text-gray-200">{data.level}</div>
          </div>

          <div className="z-10 mt-6 md:mt-0 md:pl-10 border-l-0 md:border-l border-gray-200 dark:border-neutral-800 w-full md:w-auto">
             <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
               <AlertTriangle size={20} className="text-gray-500" />
               Action Required
             </h4>
             <ul className="space-y-3">
               <li className="flex items-start gap-3">
                 <div className="w-1.5 h-1.5 mt-2 bg-black dark:bg-white" />
                 <span className="text-sm text-gray-600 dark:text-gray-300">{currentPrecaution.text}</span>
               </li>
               <li className="flex items-start gap-3">
                 <div className="w-1.5 h-1.5 mt-2 bg-black dark:bg-white" />
                 <span className="text-sm text-gray-600 dark:text-gray-300">Run air purifier on high mode.</span>
               </li>
               {(data.aqi > 150) && (
                 <li className="flex items-start gap-3">
                   <div className="w-1.5 h-1.5 mt-2 bg-red-500" />
                   <span className="text-sm font-bold text-red-600 dark:text-red-400">AVOID OUTDOOR EXERCISE</span>
                 </li>
               )}
             </ul>
          </div>
        </motion.div>

        {/* Prediction Card - Clickable to go to Forecast */}
        <motion.div 
          onClick={scrollToForecast}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-8 flex flex-col justify-center cursor-pointer hover:border-black dark:hover:border-white transition-colors group relative overflow-hidden"
        >
          {/* Subtle indicator strip */}
          <div className="absolute top-0 right-0 w-2 h-full transition-colors duration-500" style={{ backgroundColor: forecastColor }} />

           <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300">
                <TrendingUp size={24} />
              </div>
              <div className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 text-xs font-mono uppercase tracking-wider text-gray-500">
                +1 Hour
              </div>
           </div>
           
           <div>
             <div className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1">Forecast</div>
             <div className="text-5xl font-bold font-mono text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
               {forecast.aqi}
             </div>
             <div className="text-sm font-medium mt-2 text-gray-500 dark:text-gray-400">
               Expecting <span style={{ color: forecastColor }}>{forecastLevel}</span> conditions
             </div>
           </div>
           <div className="mt-4 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 group-hover:text-indigo-500 transition-colors">
              View full analysis <ArrowUpRight size={12} />
           </div>
        </motion.div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          label="PM2.5 Concentration" 
          value={data.pm25} 
          unit="µg/m³" 
          icon={<Wind size={20} />} 
          trend="up"
        />
        <StatCard 
          label="PM10 Concentration" 
          value={data.pm10} 
          unit="µg/m³" 
          icon={<Wind size={20} />} 
          trend="down"
        />
        <StatCard 
          label="VOCs" 
          value={data.voc} 
          unit="ppb" 
          icon={<Activity size={20} />} 
        />
        <StatCard 
          label="Temperature" 
          value={data.temp} 
          unit="°C" 
          icon={<Thermometer size={20} />} 
        />
        <StatCard 
          label="Humidity" 
          value={data.humidity} 
          unit="%" 
          icon={<Droplets size={20} />} 
        />
      </div>

      {/* Warning Banner if High */}
      {data.aqi > 150 && (
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-600 text-white p-4 flex items-center justify-center gap-4 border border-red-800"
        >
          <AlertTriangle className="animate-bounce" />
          <span className="font-bold tracking-wide uppercase">Hazardous Air Quality Alert - Take Immediate Action</span>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;