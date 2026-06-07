import type { InspectionTask, InspectionPoint } from '@/types';
import { allStations } from './stations';

const inspectors = ['张明', '李华', '王芳', '刘强', '陈静'];

const pointNames = [
  '扶梯主驱动检查', '扶梯扶手带检查', '扶梯梯级检查', '扶梯紧急按钮测试',
  '闸机通道测试', '闸机读卡器测试', '闸机显示屏检查', '闸机闸杆检查',
  '屏蔽门开关测试', '屏蔽门传感器检查', '屏蔽门指示灯检查', '屏蔽门密封条检查'
];

function generatePoints(station: typeof allStations[0]): InspectionPoint[] {
  const points: InspectionPoint[] = [];
  let idx = 0;

  const locations = ['站台东端', '站台西端', '站厅A口', '站厅B口'];
  const types: ('escalator' | 'gate' | 'platform-door')[] = ['escalator', 'gate', 'platform-door'];

  for (let i = 0; i < 12; i++) {
    points.push({
      id: `XJ-${station.id}-${String(i + 1).padStart(3, '0')}`,
      name: pointNames[i % pointNames.length],
      station: station.name,
      location: locations[i % locations.length],
      deviceType: types[Math.floor(i / 4)],
      checked: Math.random() > 0.4,
      checkResult: Math.random() > 0.4 ? (Math.random() > 0.85 ? 'abnormal' : 'normal') : undefined,
      remark: Math.random() > 0.7 ? '运行正常，无异常' : undefined,
    });
  }

  return points;
}

function generateTasks(): InspectionTask[] {
  const tasks: InspectionTask[] = [];
  const statuses: ('pending' | 'in-progress' | 'completed')[] = ['pending', 'in-progress', 'completed'];

  for (let i = 0; i < 20; i++) {
    const station = allStations[i % allStations.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const points = generatePoints(station);
    const date = new Date(Date.now() - Math.random() * 86400000 * 14);

    const completedPoints = status === 'completed' 
      ? points.map(p => p.id) 
      : status === 'in-progress' 
        ? points.slice(0, Math.floor(points.length * 0.6)).map(p => p.id)
        : [];

    tasks.push({
      id: `RW-${String(20260001 + i).padStart(8, '0')}`,
      name: `${station.name}${['日检', '周检', '专项巡检'][i % 3]}任务`,
      date: date.toISOString().split('T')[0],
      inspector: inspectors[i % inspectors.length],
      points,
      completedPoints,
      status,
      startedAt: status !== 'pending' ? new Date(date.getTime() + 28800000).toISOString() : undefined,
      completedAt: status === 'completed' ? new Date(date.getTime() + 32400000).toISOString() : undefined,
    });
  }

  return tasks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export const inspectionTasksData: InspectionTask[] = generateTasks();

export function getTodayTasks(): InspectionTask[] {
  const today = new Date().toISOString().split('T')[0];
  return inspectionTasksData.filter(t => t.date === today);
}

export function getPendingTasks(): InspectionTask[] {
  return inspectionTasksData.filter(t => t.status === 'pending' || t.status === 'in-progress');
}
