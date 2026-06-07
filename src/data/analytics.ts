import type { AnalyticsDataPoint, DeviceReliability, KPIData } from '@/types';
import { devicesData, getDeviceStats } from './devices';
import { ticketsData, getTicketStats } from './tickets';

export function generateAnalyticsData(): AnalyticsDataPoint[] {
  const data: AnalyticsDataPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseFault = 3 + Math.random() * 5;
    const dayFactor = date.getDay() === 0 || date.getDay() === 6 ? 1.3 : 1;
    
    data.push({
      date: date.toISOString().split('T')[0],
      faultCount: Math.floor(baseFault * dayFactor),
      avgRepairTime: 45 + Math.random() * 60,
      availability: 97 + Math.random() * 2.5,
      ticketCount: Math.floor((baseFault * dayFactor) * (1 + Math.random() * 0.5)),
    });
  }

  return data;
}

export const analyticsData: AnalyticsDataPoint[] = generateAnalyticsData();

export function generateDeviceReliability(): DeviceReliability[] {
  const ranked = [...devicesData]
    .sort((a, b) => {
      const aScore = a.lastFaultCount * 1000 - a.runHours / 100;
      const bScore = b.lastFaultCount * 1000 - b.runHours / 100;
      return aScore - bScore;
    })
    .slice(0, 15);

  return ranked.map((device, index) => ({
    rank: index + 1,
    deviceName: device.name,
    deviceType: device.type,
    station: device.station,
    mtbf: Math.floor(1000 + Math.random() * 8000),
    faultCount: device.lastFaultCount,
    availability: parseFloat((98 + Math.random() * 1.9).toFixed(2)),
  }));
}

export const deviceReliabilityData: DeviceReliability[] = generateDeviceReliability();

export function getKPIData(): KPIData {
  const deviceStats = getDeviceStats();
  const ticketStats = getTicketStats();
  
  const completedToday = ticketsData.filter(t => {
    const completedDate = t.completedAt;
    if (!completedDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return completedDate.split('T')[0] === today;
  }).length;

  const avgRepairTime = ticketsData
    .filter(t => t.completedAt)
    .map(t => {
      const start = new Date(t.createdAt).getTime();
      const end = new Date(t.completedAt!).getTime();
      return (end - start) / 60000;
    })
    .reduce((a, b) => a + b, 0) / Math.max(1, ticketsData.filter(t => t.completedAt).length);

  return {
    totalDevices: deviceStats.total,
    onlineDevices: deviceStats.normal + deviceStats.warning,
    onlineRate: parseFloat(deviceStats.onlineRate),
    pendingTickets: ticketStats.pending + ticketStats.assigned + ticketStats.processing,
    completedTicketsToday: completedToday,
    avgRepairTime: parseFloat(avgRepairTime.toFixed(1)),
    avgRepairTimeTrend: -5.2,
    pendingTicketsTrend: 3.1,
  };
}

export function getFaultTypeDistribution() {
  const escalatorFaults = ticketsData.filter(t => t.deviceType === 'escalator').length;
  const gateFaults = ticketsData.filter(t => t.deviceType === 'gate').length;
  const doorFaults = ticketsData.filter(t => t.deviceType === 'platform-door').length;

  return [
    { name: '扶梯故障', value: escalatorFaults, color: '#165DFF' },
    { name: '闸机故障', value: gateFaults, color: '#00B42A' },
    { name: '屏蔽门故障', value: doorFaults, color: '#FF7D00' },
  ];
}

export function getStationFaultDistribution() {
  const stationMap = new Map<string, number>();
  ticketsData.forEach(t => {
    stationMap.set(t.station, (stationMap.get(t.station) || 0) + 1);
  });
  
  return Array.from(stationMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

export function getMonthlyTrend() {
  return analyticsData.slice(-30).map(d => ({
    date: d.date.slice(5),
    faultCount: d.faultCount,
    ticketCount: d.ticketCount,
  }));
}
