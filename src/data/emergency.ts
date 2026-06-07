import type { EmergencyPlan, ServiceStopRecord, EventReview } from '@/types';
import { devicesData } from './devices';

const emergencyPlans: EmergencyPlan[] = [
  {
    id: 'YA-001',
    title: '扶梯故障应急预案',
    type: 'equipment-fault',
    level: 'level-2',
    content: '当扶梯发生故障时，值班人员应立即按停急停按钮，设置警示标志，疏散乘客，上报维修中心。',
    steps: [
      '发现扶梯异常，立即按下最近的急停按钮',
      '在扶梯入口处设置警示标志和围栏',
      '引导乘客绕行，避免人员拥挤',
      '上报维修中心，说明故障位置和现象',
      '记录故障发生时间和现场情况',
      '维修人员到达后配合处理'
    ],
    contacts: [
      { name: '维修中心', role: '调度', phone: '010-12345678' },
      { name: '安保部', role: '值班', phone: '010-12345679' },
      { name: '站区长', role: '负责人', phone: '13800138001' }
    ],
    updatedAt: '2026-03-15T10:00:00Z'
  },
  {
    id: 'YA-002',
    title: '闸机大面积故障应急预案',
    type: 'equipment-fault',
    level: 'level-2',
    content: '当多台闸机同时故障导致乘客滞留时，应开放人工通道，增派人员疏导，紧急报修。',
    steps: [
      '立即开放所有人工通道，安排人员值守',
      '通过广播向乘客说明情况，安抚情绪',
      '增派站务人员到出入口疏导客流',
      '上报维修中心和控制中心',
      '必要时联系公安协助维持秩序',
      '记录故障设备编号和数量'
    ],
    contacts: [
      { name: '维修中心', role: '调度', phone: '010-12345678' },
      { name: '控制中心', role: '调度', phone: '010-12345680' },
      { name: '公安驻站', role: '值班', phone: '010-12345681' }
    ],
    updatedAt: '2026-03-10T14:30:00Z'
  },
  {
    id: 'YA-003',
    title: '屏蔽门无法关闭应急预案',
    type: 'equipment-fault',
    level: 'level-1',
    content: '屏蔽门无法关闭时存在安全隐患，须立即派员到场处理，必要时人工值守。',
    steps: [
      '立即报告行车调度，说明故障屏蔽门位置',
      '安排人员到故障屏蔽门处值守，提醒乘客注意安全',
      '设置警示标志，防止乘客靠近',
      '维修人员到达后配合处理',
      '如需切除该屏蔽门，按规定程序操作',
      '做好记录，事后分析故障原因'
    ],
    contacts: [
      { name: '行车调度', role: 'OCC', phone: '010-12345682' },
      { name: '维修中心', role: '调度', phone: '010-12345678' },
      { name: '站区长', role: '负责人', phone: '13800138001' }
    ],
    updatedAt: '2026-04-01T09:15:00Z'
  },
  {
    id: 'YA-004',
    title: '乘客摔倒受伤应急预案',
    type: 'passenger-incident',
    level: 'level-2',
    content: '乘客在站内摔倒受伤时，应立即施救，保护现场，必要时拨打120。',
    steps: [
      '立即赶到现场，查看乘客伤势',
      '如伤势较轻，移至安全区域处理',
      '如伤势较重，不要移动伤者，拨打120',
      '保护现场，寻找目击证人',
      '上报站区长和安保部',
      '做好事件记录和取证'
    ],
    contacts: [
      { name: '急救中心', role: '急救', phone: '120' },
      { name: '安保部', role: '值班', phone: '010-12345679' },
      { name: '站区长', role: '负责人', phone: '13800138001' }
    ],
    updatedAt: '2026-02-20T16:45:00Z'
  },
  {
    id: 'YA-005',
    title: '车站火灾应急预案',
    type: 'fire',
    level: 'level-1',
    content: '车站发生火灾时，立即启动消防系统，组织疏散，上报消防部门。',
    steps: [
      '发现火情立即按下手动报警按钮',
      '拨打119报警，说明火灾位置和燃烧物质',
      '启动车站排烟系统和消防水泵',
      '组织乘客从最近的安全出口疏散',
      '关闭相关区域的空调和通风',
      '派人在出入口引导消防车'
    ],
    contacts: [
      { name: '火警', role: '消防', phone: '119' },
      { name: '控制中心', role: 'OCC', phone: '010-12345680' },
      { name: '公安驻站', role: '值班', phone: '010-12345681' }
    ],
    updatedAt: '2026-01-15T11:00:00Z'
  },
  {
    id: 'YA-006',
    title: '大面积停电应急预案',
    type: 'power-outage',
    level: 'level-1',
    content: '车站大面积停电时，启用应急照明，组织疏散，保障乘客安全。',
    steps: [
      '立即启用应急照明和疏散指示',
      '通过广播安抚乘客，说明情况',
      '组织乘客有序疏散出站',
      '关闭电梯，确认扶梯内无人员滞留',
      '派人在出入口劝阻乘客进站',
      '上报控制中心和电力部门'
    ],
    contacts: [
      { name: '电力抢修', role: '供电', phone: '95598' },
      { name: '控制中心', role: 'OCC', phone: '010-12345680' },
      { name: '站区长', role: '负责人', phone: '13800138001' }
    ],
    updatedAt: '2026-03-25T08:30:00Z'
  }
];

const stopReasons = [
  '设备故障停运', '计划检修停运', '安全检查停运', '应急演练停运'
];

const impactScopes = [
  '单台设备', '同侧站台', '整侧站台', '全站影响'
];

function generateStopRecords(): ServiceStopRecord[] {
  const records: ServiceStopRecord[] = [];
  const faultDevices = devicesData.filter(d => d.status === 'fault' || d.status === 'maintenance');

  for (let i = 0; i < 18; i++) {
    const device = faultDevices[i % faultDevices.length] || devicesData[i % devicesData.length];
    const isRecovered = Math.random() > 0.35;
    const stopTime = new Date(Date.now() - Math.random() * 86400000 * 10);

    records.push({
      id: `TZ-${String(2026001 + i).padStart(7, '0')}`,
      deviceId: device.id,
      deviceName: device.name,
      station: device.station,
      stopTime: stopTime.toISOString(),
      reason: stopReasons[Math.floor(Math.random() * stopReasons.length)],
      impactScope: impactScopes[Math.floor(Math.random() * impactScopes.length)],
      estimatedRecovery: new Date(stopTime.getTime() + 3600000 * (2 + Math.random() * 6)).toISOString(),
      actualRecovery: isRecovered ? new Date(stopTime.getTime() + 3600000 * (1 + Math.random() * 5)).toISOString() : undefined,
      operator: ['张明', '李华', '王芳'][i % 3],
      status: isRecovered ? 'recovered' : 'stopped'
    });
  }

  return records.sort((a, b) => new Date(b.stopTime).getTime() - new Date(a.stopTime).getTime());
}

const eventReviewTitles = [
  '早高峰扶梯故障事件复盘', '闸机读卡器批量故障事件分析',
  '屏蔽门传感器误触发事件总结', '大客流设备故障应急处置复盘',
  '雨季设备受潮故障预防分析', '新设备试运行故障总结'
];

function generateEventReviews(): EventReview[] {
  return eventReviewTitles.map((title, i) => ({
    id: `FP-${String(2026001 + i).padStart(7, '0')}`,
    eventTitle: title,
    eventTime: new Date(Date.now() - 86400000 * (5 + i * 10)).toISOString(),
    eventType: ['设备故障', '运营事件', '应急处置'][i % 3],
    description: '事件发生在早晚高峰期间，设备出现异常，值班人员及时处置，未造成人员伤亡。',
    causeAnalysis: '经分析，故障原因主要为设备老化、维护不及时、环境因素影响等。',
    improvementMeasures: '1. 增加设备巡检频次；2. 制定老化设备更新计划；3. 加强人员应急培训。',
    responsiblePerson: ['张主任', '李工', '王站'][i % 3],
    participants: ['张明', '李华', '王芳', '刘强', '陈静'].slice(0, 3 + (i % 3)),
    createdAt: new Date(Date.now() - 86400000 * (3 + i * 8)).toISOString()
  }));
}

export const emergencyPlansData: EmergencyPlan[] = emergencyPlans;
export const stopRecordsData: ServiceStopRecord[] = generateStopRecords();
export const eventReviewsData: EventReview[] = generateEventReviews();
