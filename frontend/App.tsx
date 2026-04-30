import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Trends from './pages/Trends';
import Forecast from './pages/Forecast';
import Awareness from './pages/Awareness';
import DeviceStatus from './pages/DeviceStatus';
import { generateMockSensorData } from './constants';
import { SensorData } from './types';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // State to hold the latest sensor data
  const [currentData, setCurrentData] = useState<SensorData>(generateMockSensorData());

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(generateMockSensorData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout 
      darkMode={darkMode} 
      toggleDarkMode={() => setDarkMode(!darkMode)} 
      currentData={currentData}
    >
      <section id="dashboard" className="scroll-mt-24 min-h-[calc(100vh-100px)] py-4">
        <Dashboard data={currentData} />
      </section>

      <div className="w-full h-px bg-gray-200 dark:bg-neutral-800 my-12" />

      <section id="device" className="scroll-mt-24 min-h-[80vh] py-4">
        <DeviceStatus />
      </section>

      <div className="w-full h-px bg-gray-200 dark:bg-neutral-800 my-12" />
      
      <section id="trends" className="scroll-mt-24 min-h-[80vh] py-4">
        <Trends />
      </section>

      <div className="w-full h-px bg-gray-200 dark:bg-neutral-800 my-12" />

      <section id="forecast" className="scroll-mt-24 min-h-[80vh] py-4">
        <Forecast />
      </section>

      <div className="w-full h-px bg-gray-200 dark:bg-neutral-800 my-12" />

      <section id="awareness" className="scroll-mt-24 min-h-[80vh] py-4">
        <Awareness />
      </section>
    </Layout>
  );
};

export default App;