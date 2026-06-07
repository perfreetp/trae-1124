import type { Device, DeviceStatus, DeviceType } from '@/types';
import { allStations } from './stations';

const brands = ['迅达', '奥的斯', '通力', '三菱', '蒂森克虏伯'];
const escalatorModels = ['SWE-3000', 'OTIS-9300', 'KONE-Trans', 'ML-EX', 'TS-200'];
const gateModels = ['GAT-500', 'OTIS-E300', 'KG-700', 'ML-Gate', 'TS-900'];
const doorModels = ['PSD-800', 'OTIS-P600', 'KD-1200', 'ML-Door', 'TS-1500'];

const locations = ['站台东端', '站台西端', '站厅A口', '站厅B口', '换乘通道', '出站口', '进站口', '站台中部'];

function randomStatus(): DeviceStatus {
  const rand = Math.random();
  if (rand < 0.78) return 'normal';
  if (rand < 0.90) return 'warning';
  if (rand < 0.97) return 'fault';
  return 'maintenance';
}

function generateDevices(): Device[] {
  const devices: Device[] = [];
  let idCounter = 1;

  allStations.forEach(station => {
    const escalatorCount = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < escalatorCount; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      devices.push({
        id: `FT-${String(idCounter++).padStart(4, '0')}`,
        name: `${station.name}-扶梯-${String(i + 1).padStart(2, '0')}`,
        type: 'escalator',
        station: station.name,
        stationId: station.id,
        location: locations[i % locations.length],
        status: randomStatus(),
        runHours: 8000 + Math.floor(Math.random() * 15000),
        lastMaintenance: `2026-${String(1 + Math.floor(Math.random() * 5)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
        brand,
        model: escalatorModels[Math.floor(Math.random() * escalatorModels.length)],
        installDate: `202${1 + Math.floor(Math.random() * 5)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
        lastFaultCount: Math.floor(Math.random() * 8),
      });
    }

    const gateCount = 12 + Math.floor(Math.random() * 7);
    for (let i = 0; i < gateCount; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      devices.push({
        id: `ZJ-${String(idCounter++).padStart(4, '0')}`,
        name: `${station.name}-闸机-${String(i + 1).padStart(2, '0')}`,
        type: 'gate',
        station: station.name,
        stationId: station.id,
        location: locations[i % locations.length],
        status: randomStatus(),
        runHours: 10000 + Math.floor(Math.random() * 20000),
        lastMaintenance: `2026-${String(1 + Math.floor(Math.random() * 5)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
        brand,
        model: gateModels[Math.floor(Math.random() * gateModels.length)],
        installDate: `202${1 + Math.floor(Math.random() * 5)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
        lastFaultCount: Math.floor(Math.random() * 6),
      });
    }

    const doorCount = 24 + Math.floor(Math.random() * 9);
    for (let i = 0; i < doorCount; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)];
      devices.push({
        id: `PBM-${String(idCounter++).padStart(4, '0')}`,
        name: `${station.name}-屏蔽门-${String(i + 1).padStart(2, '0')}`,
        type: 'platform-door',
        station: station.name,
        stationId: station.id,
        location: `站台${i < doorCount / 2 ? '上行' : '下行'}-${String((i % (doorCount / 2)) + 1).padStart(2, '0')}号门`,
        status: randomStatus(),
        runHours: 12000 + Math.floor(Math.random() * 18000),
        lastMaintenance: `2026-${String(1 + Math.floor(Math.random() * 5)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
        brand,
        model: doorModels[Math.floor(Math.random() * doorModels.length)],
        installDate: `202${1 + Math.floor(Math.random() * 5)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
        lastFaultCount: Math.floor(Math.random() * 5),
      });
    }
  });

  return devices;
}

export const devicesData: Device[] = generateDevices();

export function getDevicesByType(type: DeviceType): Device[] {
  return devicesData.filter(d => d.type === type);
}

export function getDevicesByStation(stationId: string): Device[] {
  return devicesData.filter(d => d.stationId === stationId);
}

export function getDeviceStats() {
  const total = devicesData.length;
  const normal = devicesData.filter(d => d.status === 'normal').length;
  const warning = devicesData.filter(d => d.status === 'warning').length;
  const fault = devicesData.filter(d => d.status === 'fault').length;
  const maintenance = devicesData.filter(d => d.status === 'maintenance').length;
  const escalator = devicesData.filter(d => d.type === 'escalator').length;
  const gate = devicesData.filter(d => d.type === 'gate').length;
  const platformDoor = devicesData.filter(d => d.type === 'platform-door').length;
  
  return { 
    total, 
    normal, 
    warning, 
    fault, 
    maintenance, 
    escalator, 
    gate, 
    platformDoor,
    onlineRate: ((normal + warning) / total * 100).toFixed(1) 
  };
}
