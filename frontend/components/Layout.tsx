import React, { useState, useEffect } from 'react';
import { Menu, X, Wind, BarChart2, TrendingUp, Info, Activity, Moon, Sun, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGeminiResponse } from '../services/geminiService';
import { SensorData } from '../types';

interface LayoutProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentData: SensorData;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ darkMode, toggleDarkMode, currentData, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: "Hello! I'm AeroBot. Ask me about the current air quality or health tips." }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems = [
    { name: 'Dashboard', id: 'dashboard', icon: Wind },
    { name: 'Device', id: 'device', icon: Activity },
    { name: 'Trends', id: 'trends', icon: BarChart2 },
    { name: 'Forecast', id: 'forecast', icon: TrendingUp },
    { name: 'Awareness', id: 'awareness', icon: Info },
  ];

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    const context = `Current AQI is ${currentData.aqi} (${currentData.level}). PM2.5: ${currentData.pm25}, Temp: ${currentData.temp}°C.`;
    const response = await getGeminiResponse(userMsg, context);

    setChatHistory(prev => [...prev, { role: 'bot', text: response }]);
    setIsChatLoading(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of the sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  // ScrollSpy logic to update active tab on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset triggers

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-neutral-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('dashboard')}>
              <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center">
                <Wind className="text-white dark:text-black w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">AEROSENSE</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-1 items-center">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors uppercase tracking-wider ${
                    activeSection === item.id
                    ? 'bg-black text-white dark:bg-white dark:text-black' 
                    : 'hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className="ml-4 p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
               <button
                onClick={toggleDarkMode}
                className="mr-2 p-2 text-gray-600 dark:text-gray-300"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-900"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-3 text-base font-medium flex items-center gap-2 ${
                      activeSection === item.id
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 AeroSense. Smart IoT Air Monitoring.
          </div>
          <div className="flex space-x-6 text-sm font-medium text-gray-600 dark:text-gray-300">
             <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Chat Bot Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-black dark:bg-white text-white dark:text-black w-14 h-14 flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-transparent"
        >
          {chatOpen ? <X /> : <MessageCircle />}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-2xl z-40 flex flex-col max-h-[500px]"
          >
            <div className="p-4 border-b border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 flex justify-between items-center">
              <h3 className="font-bold text-lg">AeroBot AI</h3>
              <span className="text-xs uppercase bg-green-500 text-white px-2 py-0.5">Online</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-black text-white dark:bg-white dark:text-black' 
                      : 'bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-neutral-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-neutral-800 p-3 text-sm animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-200 dark:border-neutral-700 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about AQI..."
                className="flex-1 bg-transparent border border-gray-300 dark:border-neutral-600 p-2 text-sm focus:outline-none focus:border-black dark:focus:border-white transition-colors"
              />
              <button 
                type="submit"
                disabled={!chatInput || isChatLoading}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 text-sm font-bold uppercase disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Layout;