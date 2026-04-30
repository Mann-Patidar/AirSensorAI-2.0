export enum AQILevel {
  GOOD = 'Good',
  MODERATE = 'Moderate',
  UNHEALTHY_SENSITIVE = 'Unhealthy for Sensitive Groups',
  UNHEALTHY = 'Unhealthy',
  VERY_UNHEALTHY = 'Very Unhealthy',
  HAZARDOUS = 'Hazardous',
}

export interface SensorData {
  timestamp: string;
  pm25: number;
  pm10: number;
  voc: number;
  temp: number;
  humidity: number;
  aqi: number;
  level: AQILevel;
}

export interface ForecastPoint {
  time: string;
  aqi: number;
  confidenceLower: number;
  confidenceUpper: number;
}

export interface DeviceHealth {
  status: 'online' | 'offline' | 'maintenance';
  lastSeen: string;
  battery: number;
  signalStrength: number;
  sensorStatus: {
    pm: boolean;
    voc: boolean;
    dht: boolean;
  };
}

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  icon: string;
}
