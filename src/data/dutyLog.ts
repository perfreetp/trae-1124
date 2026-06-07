import type { DutyRecord, SupplierRecord } from '@/types';

const operators = ['张明', '李华', '王芳', '刘强', '陈静', '赵伟'];
const nextShiftOperators = ['李华', '王芳', '刘强', '陈静', '赵伟', '张明'];
const shiftNames = ['morning', 'afternoon', 'night'] as const;
const shiftLabels = { morning: '早班', afternoon: '中班', night: '夜班' };

const eventContents = [
  { content: '设备运行正常，无异常情况', type: 'normal' as const },
  { content: '1号扶梯扶手带轻微磨损，已登记', type: 'warning' as const },
  { content: 'A口闸机读卡器偶发故障，重启后恢复', type: 'warning' as const },
  { content: '收到设备保养通知，明天进行例行保养', type: 'normal' as const },
  { content: '3号屏蔽门开关有异响，已上报工单', type: 'fault' as const },
  { content: '早高峰客流平稳，设备运行正常', type: 'normal' as const },
  { content: '晚高峰出现设备故障报警，已处理完成', type: 'fault' as const },
  { content: '进行了消防设备检查，状态良好', type: 'normal' as const },
];

function generateDutyRecords(): DutyRecord[] {
  const records: DutyRecord[] = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(Date.now() - i * 86400000);
    const shiftIdx = i % 3;
    const shift = shiftNames[shiftIdx];
    const operator = operators[i % operators.length];

    const events = [];
    const eventCount = 2 + Math.floor(Math.random() * 4);
    for (let j = 0; j < eventCount; j++) {
      const event = eventContents[Math.floor(Math.random() * eventContents.length)];
      const hour = 6 + shiftIdx * 6 + Math.floor(Math.random() * 6);
      events.push({
        time: `${String(hour).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        content: event.content,
        type: event.type,
      });
    }

    records.push({
      id: `ZB-${String(20260001 + i).padStart(8, '0')}`,
      date: date.toISOString().split('T')[0],
      shift,
      operator,
      events: events.sort((a, b) => a.time.localeCompare(b.time)),
      handoverNotes: i % 5 === 0 ? '注意关注2号扶梯运行状态，有异常及时上报' : '设备运行正常，按规定进行巡检',
      nextShiftOperator: nextShiftOperators[i % nextShiftOperators.length],
      createdAt: date.toISOString(),
    });
  }

  return records;
}

const supplierNames = [
  { name: '迅达电梯服务有限公司', contact: '王经理', phone: '13800138001', type: '扶梯维保' },
  { name: '奥的斯机电设备有限公司', contact: '李工', phone: '13800138002', type: '扶梯维保' },
  { name: '上海三菱电梯有限公司', contact: '张工', phone: '13800138003', type: '电梯维保' },
  { name: '广州广电运通', contact: '刘经理', phone: '13800138004', type: '闸机维保' },
  { name: '深圳方大自动化', contact: '陈工', phone: '13800138005', type: '屏蔽门维保' },
  { name: '北京地铁设备维修中心', contact: '赵主任', phone: '13800138006', type: '综合维修' },
];

const serviceContents = [
  '扶梯例行保养', '扶梯故障抢修', '闸机系统升级', '屏蔽门传感器更换',
  '设备季度检查', '年度安全检测', '零部件更换', '设备调试',
];

function generateSupplierRecords(): SupplierRecord[] {
  const records: SupplierRecord[] = [];

  for (let i = 0; i < 20; i++) {
    const supplier = supplierNames[i % supplierNames.length];
    const date = new Date(Date.now() - i * 86400000 * 2);
    const arrivalHour = 9 + Math.floor(Math.random() * 6);
    const departureHour = arrivalHour + 2 + Math.floor(Math.random() * 4);

    records.push({
      id: `GYS-${String(2026001 + i).padStart(7, '0')}`,
      name: supplier.name,
      contactPerson: supplier.contact,
      phone: supplier.phone,
      serviceType: supplier.type,
      arrivalTime: new Date(date.getTime() + arrivalHour * 3600000).toISOString(),
      departureTime: new Date(date.getTime() + departureHour * 3600000).toISOString(),
      serviceContent: serviceContents[Math.floor(Math.random() * serviceContents.length)],
      rating: 3 + Math.floor(Math.random() * 3),
      operator: operators[i % operators.length],
      createdAt: date.toISOString(),
    });
  }

  return records.sort((a, b) => new Date(b.arrivalTime).getTime() - new Date(a.arrivalTime).getTime());
}

export const dutyRecordsData: DutyRecord[] = generateDutyRecords();
export const supplierRecordsData: SupplierRecord[] = generateSupplierRecords();

export function getTodayDutyRecord(): DutyRecord | undefined {
  const today = new Date().toISOString().split('T')[0];
  return dutyRecordsData.find(r => r.date === today);
}
