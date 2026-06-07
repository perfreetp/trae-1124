import type { Ticket, TicketPriority, TicketStatus, TicketProgress } from '@/types';
import { devicesData } from './devices';

const reporters = ['张明', '李华', '王芳', '刘强', '陈静', '赵伟', '孙丽', '周杰'];
const assignees = ['张工程师', '李技术员', '王维修', '刘师傅', '陈工'];

const faultTitles = [
  '扶梯运行异响', '闸机刷卡无反应', '屏蔽门无法关闭', '扶梯急停触发',
  '闸机显示屏黑屏', '屏蔽门开关卡顿', '扶梯扶手带磨损', '闸机通道挡板故障',
  '屏蔽门传感器异常', '扶梯速度异常', '闸机语音提示失效', '屏蔽门指示灯故障',
  '扶梯梯级缺失', '闸机闸杆不复位', '屏蔽门玻璃裂纹', '扶梯梳齿板损坏',
  '闸机读卡器故障', '屏蔽门驱动电机异响'
];

const impactDescs = [
  '无客流影响，设备可继续使用',
  '轻微影响，部分功能受限',
  '中度影响，客流通行效率下降',
  '严重影响，设备停用需绕行'
];

function generateProgressTimeline(status: TicketStatus): TicketProgress[] {
  const timeline: TicketProgress[] = [];
  const baseTime = new Date(Date.now() - Math.random() * 86400000 * 3);
  
  timeline.push({
    time: baseTime.toISOString(),
    status: '工单创建',
    operator: reporters[Math.floor(Math.random() * reporters.length)],
    description: '值班员上报设备故障'
  });

  if (status !== 'pending') {
    timeline.push({
      time: new Date(baseTime.getTime() + 300000 + Math.random() * 600000).toISOString(),
      status: '已派修',
      operator: '调度中心',
      description: `已指派 ${assignees[Math.floor(Math.random() * assignees.length)]} 前往处理`
    });
  }

  if (status === 'processing' || status === 'completed' || status === 'closed') {
    timeline.push({
      time: new Date(baseTime.getTime() + 1800000 + Math.random() * 1800000).toISOString(),
      status: '维修中',
      operator: assignees[Math.floor(Math.random() * assignees.length)],
      description: '工程师已到达现场，开始故障排查'
    });
  }

  if (status === 'completed' || status === 'closed') {
    timeline.push({
      time: new Date(baseTime.getTime() + 5400000 + Math.random() * 3600000).toISOString(),
      status: '修复完成',
      operator: assignees[Math.floor(Math.random() * assignees.length)],
      description: '故障已排除，设备恢复正常运行'
    });
  }

  if (status === 'closed') {
    timeline.push({
      time: new Date(baseTime.getTime() + 7200000 + Math.random() * 1800000).toISOString(),
      status: '工单闭环',
      operator: reporters[Math.floor(Math.random() * reporters.length)],
      description: '值班员确认设备恢复正常，工单已闭环'
    });
  }

  return timeline;
}

function generateTickets(): Ticket[] {
  const tickets: Ticket[] = [];
  const statuses: TicketStatus[] = ['pending', 'assigned', 'processing', 'completed', 'closed'];
  const priorities: TicketPriority[] = ['low', 'medium', 'high', 'urgent'];
  const passengerImpacts: ('none' | 'minor' | 'moderate' | 'severe')[] = ['none', 'minor', 'moderate', 'severe'];

  const faultDevices = devicesData.filter(d => d.status === 'fault' || d.status === 'warning');
  
  for (let i = 0; i < 65; i++) {
    const device = faultDevices[i % faultDevices.length] || devicesData[i % devicesData.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const passengerImpact = passengerImpacts[Math.floor(Math.random() * passengerImpacts.length)];
    const createdAt = new Date(Date.now() - Math.random() * 86400000 * 7).toISOString();

    let progress = 0;
    if (status === 'assigned') progress = 20;
    else if (status === 'processing') progress = 40 + Math.floor(Math.random() * 40);
    else if (status === 'completed') progress = 90;
    else if (status === 'closed') progress = 100;

    tickets.push({
      id: `GD-${String(20260001 + i).padStart(8, '0')}`,
      title: faultTitles[Math.floor(Math.random() * faultTitles.length)],
      description: '设备出现异常，需要检修处理。请尽快安排人员到场处理，注意安全防护措施。',
      deviceId: device.id,
      deviceName: device.name,
      deviceType: device.type,
      station: device.station,
      reporter: reporters[Math.floor(Math.random() * reporters.length)],
      priority,
      status,
      passengerImpact,
      passengerImpactDesc: impactDescs[passengerImpacts.indexOf(passengerImpact)],
      createdAt,
      assignedTo: status !== 'pending' ? assignees[Math.floor(Math.random() * assignees.length)] : undefined,
      estimatedArrival: status !== 'pending' ? new Date(Date.now() + 1800000 + Math.random() * 1800000).toISOString() : undefined,
      completedAt: (status === 'completed' || status === 'closed') ? new Date(Date.now() - Math.random() * 86400000).toISOString() : undefined,
      progress,
      progressTimeline: generateProgressTimeline(status),
      photos: []
    });
  }

  return tickets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const ticketsData: Ticket[] = generateTickets();

export function getTicketsByStatus(status: TicketStatus): Ticket[] {
  return ticketsData.filter(t => t.status === status);
}

export function getPendingTickets(): Ticket[] {
  return ticketsData.filter(t => t.status === 'pending' || t.status === 'assigned' || t.status === 'processing');
}

export function getTicketStats() {
  const total = ticketsData.length;
  const pending = ticketsData.filter(t => t.status === 'pending').length;
  const assigned = ticketsData.filter(t => t.status === 'assigned').length;
  const processing = ticketsData.filter(t => t.status === 'processing').length;
  const completed = ticketsData.filter(t => t.status === 'completed').length;
  const closed = ticketsData.filter(t => t.status === 'closed').length;
  const urgent = ticketsData.filter(t => t.priority === 'urgent' && (t.status === 'pending' || t.status === 'assigned')).length;

  return { total, pending, assigned, processing, completed, closed, urgent };
}
