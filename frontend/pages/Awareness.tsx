import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Skull, Beaker, ShieldCheck, Activity } from 'lucide-react';

const Card: React.FC<{ title: string; desc: string; icon: React.ReactNode; delay: number }> = ({ title, desc, icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 p-6 hover:border-black dark:hover:border-white transition-colors group"
  >
    <div className="mb-4 text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
      {desc}
    </p>
  </motion.div>
);

const Awareness: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Understanding The Invisible</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Air pollution is the single largest environmental health risk. Learn about what you are breathing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          delay={0.1}
          icon={<Wind size={32} />}
          title="Particulate Matter 2.5"
          desc="Fine inhalable particles, with diameters that are generally 2.5 micrometers and smaller. They can penetrate deep into the lungs and enter the bloodstream, causing cardiovascular and respiratory impacts."
        />
        <Card 
          delay={0.2}
          icon={<Wind size={32} />}
          title="Particulate Matter 10"
          desc="Inhalable particles, with diameters that are generally 10 micrometers and smaller. These include dust, pollen, and mold. They irritate the eyes, nose, and throat."
        />
        <Card 
          delay={0.3}
          icon={<Beaker size={32} />}
          title="Volatile Organic Compounds"
          desc="VOCs are emitted as gases from certain solids or liquids like paints and cleaners. Long-term exposure can cause damage to the liver, kidney, and central nervous system."
        />
      </div>

      <div className="bg-black dark:bg-white text-white dark:text-black p-8 md:p-12">
         <div className="flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1">
             <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest">Health Impacts</h2>
             <ul className="space-y-4">
               <li className="flex items-start gap-4">
                 <Skull className="shrink-0 mt-1" />
                 <div>
                   <span className="font-bold block text-lg">Respiratory Disease</span>
                   <span className="opacity-80 text-sm">Aggravates asthma and decreases lung function.</span>
                 </div>
               </li>
               <li className="flex items-start gap-4">
                 <Activity className="shrink-0 mt-1" />
                 <div>
                   <span className="font-bold block text-lg">Cardiovascular Damage</span>
                   <span className="opacity-80 text-sm">Linked to heart attacks, strokes, and irregular heart rhythms.</span>
                 </div>
               </li>
             </ul>
           </div>
           <div className="flex-1 border-l border-gray-700 dark:border-gray-300 pl-0 md:pl-8">
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest">How to Stay Safe</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-white/10 dark:bg-black/10 p-4 backdrop-blur-sm">
                    <ShieldCheck className="mb-2" />
                    <span className="font-bold">Check AQI Daily</span>
                 </div>
                 <div className="bg-white/10 dark:bg-black/10 p-4 backdrop-blur-sm">
                    <Wind className="mb-2" />
                    <span className="font-bold">Use Air Purifiers</span>
                 </div>
              </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Awareness;