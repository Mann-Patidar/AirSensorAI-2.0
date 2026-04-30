import React from 'react';
import { INITIAL_DEVICE_STATUS } from '../constants';
import { Wifi, Battery, Server, Cpu, CheckCircle, XCircle } from 'lucide-react';

const DeviceStatus: React.FC = () => {
  const status = INITIAL_DEVICE_STATUS;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">System Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Main Status */}
         <div className="md:col-span-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-8 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">Device ID: ESP32-AQM-001</div>
              <div className="flex items-center gap-3">
                 <div className={`w-4 h-4 rounded-full ${status.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                 <span className="text-3xl font-bold uppercase">{status.status}</span>
              </div>
            </div>
            <div className="text-right">
               <div className="text-gray-500 text-sm">Uptime</div>
               <div className="font-mono text-xl">14d 2h 12m</div>
            </div>
         </div>

         {/* Detailed Stats */}
         <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold flex items-center gap-2"><Wifi size={18} /> Connectivity</h3>
               <span className="text-green-500 font-mono">{status.signalStrength} dBm</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-neutral-700 h-2">
               <div className="bg-green-500 h-2" style={{ width: '80%' }} />
            </div>
         </div>

         <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold flex items-center gap-2"><Battery size={18} /> Power</h3>
               <span className="text-indigo-500 font-mono">{status.battery}%</span>
            </div>
             <div className="w-full bg-gray-200 dark:bg-neutral-700 h-2">
               <div className="bg-indigo-500 h-2" style={{ width: `${status.battery}%` }} />
            </div>
         </div>

         <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold flex items-center gap-2"><Server size={18} /> Storage</h3>
               <span className="text-blue-500 font-mono">45%</span>
            </div>
             <div className="w-full bg-gray-200 dark:bg-neutral-700 h-2">
               <div className="bg-blue-500 h-2" style={{ width: '45%' }} />
            </div>
         </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-8">
         <h3 className="font-bold mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-neutral-700 pb-4">
            <Cpu size={20} /> Sensor Diagnostics
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-between">
               <span className="font-mono">SDS011 (PM)</span>
               <CheckCircle className="text-green-500" />
            </div>
             <div className="flex items-center justify-between">
               <span className="font-mono">BME280 (Env)</span>
               <CheckCircle className="text-green-500" />
            </div>
             <div className="flex items-center justify-between">
               <span className="font-mono">CCS811 (VOC)</span>
               <CheckCircle className="text-green-500" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default DeviceStatus;
