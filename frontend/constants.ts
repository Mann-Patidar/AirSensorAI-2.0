import { AQILevel, SensorData, ForecastPoint, DeviceHealth } from './types';
import { CloudRain, Wind, Droplets, Thermometer, Activity, Zap } from 'lucide-react';

export const AQI_THRESHOLDS = {
  GOOD: 50,
  MODERATE: 100,
  UNHEALTHY_SENSITIVE: 150,
  UNHEALTHY: 200,
  VERY_UNHEALTHY: 300,
};

export const getAQILevel = (aqi: number): AQILevel => {
  if (aqi <= 50) return AQILevel.GOOD;
  if (aqi <= 100) return AQILevel.MODERATE;
  if (aqi <= 150) return AQILevel.UNHEALTHY_SENSITIVE;
  if (aqi <= 200) return AQILevel.UNHEALTHY;
  if (aqi <= 300) return AQILevel.VERY_UNHEALTHY;
  return AQILevel.HAZARDOUS;
};

export const getAQIColor = (level: AQILevel): string => {
  switch (level) {
    case AQILevel.GOOD: return '#10b981';
    case AQILevel.MODERATE: return '#fbbf24';
    case AQILevel.UNHEALTHY_SENSITIVE: return '#f97316';
    case AQILevel.UNHEALTHY: return '#ef4444';
    case AQILevel.VERY_UNHEALTHY: return '#a855f7';
    case AQILevel.HAZARDOUS: return '#881337';
    default: return '#9ca3af';
  }
};

export const generateMockSensorData = (): SensorData => {
  const pm25 = Math.floor(Math.random() * 150); // Random PM2.5
  const pm10 = Math.floor(pm25 * 1.5 + Math.random() * 20);
  const voc = Math.floor(Math.random() * 500);
  const temp = 20 + Math.random() * 10;
  const humidity = 40 + Math.random() * 40;
  
  // Simplified AQI calculation based on PM2.5
  const aqi = pm25 * 1.5; 

  return {
    timestamp: new Date().toISOString(),
    pm25,
    pm10,
    voc,
    temp: parseFloat(temp.toFixed(1)),
    humidity: Math.floor(humidity),
    aqi: Math.floor(aqi),
    level: getAQILevel(aqi),
  };
};

export const generateForecastData = (): ForecastPoint[] => {
  const now = new Date();
  const data: ForecastPoint[] = [];
  let baseAQI = 80; // Starting baseline

  for (let i = 0; i < 6; i++) {
    const time = new Date(now.getTime() + i * 3600000);
    const fluctuation = Math.random() * 20 - 5;
    baseAQI += fluctuation;
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      aqi: Math.floor(baseAQI),
      confidenceLower: Math.floor(baseAQI - 10),
      confidenceUpper: Math.floor(baseAQI + 10),
    });
  }
  return data;
};

export const INITIAL_DEVICE_STATUS: DeviceHealth = {
  status: 'online',
  lastSeen: new Date().toISOString(),
  battery: 87,
  signalStrength: -65,
  sensorStatus: {
    pm: true,
    voc: true,
    dht: true,
  },
};
