import type { SparePart, SparePartTransfer } from '@/types';

const sparePartNames = [
  { name: '扶梯驱动电机', code: 'FT-MOT-001', category: '电机类', unit: '台' },
  { name: '扶梯扶手带', code: 'FT-BEL-001', category: '传动类', unit: '条' },
  { name: '扶梯梯级链', code: 'FT-CHN-001', category: '传动类', unit: '条' },
  { name: '扶梯梳齿板', code: 'FT-PLT-001', category: '结构类', unit: '块' },
  { name: '闸机读卡器模块', code: 'ZJ-RDR-001', category: '电子类', unit: '个' },
  { name: '闸机通道电机', code: 'ZJ-MOT-001', category: '电机类', unit: '台' },
  { name: '闸机挡板组件', code: 'ZJ-BRD-001', category: '结构类', unit: '套' },
  { name: '闸机显示屏', code: 'ZJ-DSP-001', category: '电子类', unit: '块' },
  { name: '屏蔽门驱动电机', code: 'PBM-MOT-001', category: '电机类', unit: '台' },
  { name: '屏蔽门控制器', code: 'PBM-CTL-001', category: '电子类', unit: '个' },
  { name: '屏蔽门传感器', code: 'PBM-SNS-001', category: '电子类', unit: '个' },
  { name: '屏蔽门密封条', code: 'PBM-SEAL-001', category: '密封类', unit: '米' },
  { name: '变频器', code: 'COM-INV-001', category: '电子类', unit: '台' },
  { name: 'PLC控制器', code: 'COM-PLC-001', category: '电子类', unit: '个' },
  { name: '光电传感器', code: 'COM-SNS-001', category: '电子类', unit: '个' },
  { name: '接触器', code: 'COM-CTR-001', category: '电气类', unit: '个' },
  { name: '继电器', code: 'COM-REL-001', category: '电气类', unit: '个' },
  { name: '编码器', code: 'COM-ENC-001', category: '电子类', unit: '个' },
  { name: '轴承套件', code: 'COM-BRG-001', category: '机械类', unit: '套' },
  { name: '润滑油', code: 'COM-OIL-001', category: '耗材类', unit: '桶' },
  { name: '保险丝', code: 'COM-FUS-001', category: '电气类', unit: '盒' },
  { name: '按钮开关', code: 'COM-BTN-001', category: '电气类', unit: '个' },
];

const locations = ['中心仓库A区', '中心仓库B区', '中心仓库C区', '1号线维修站', '2号线维修站', '3号线维修站'];

export function generateSpareParts(): SparePart[] {
  return sparePartNames.map((item, index) => {
    const minStock = 5 + Math.floor(Math.random() * 10);
    const quantity = minStock - 2 + Math.floor(Math.random() * 15);
    return {
      id: `BJ-${String(index + 1).padStart(4, '0')}`,
      name: item.name,
      code: item.code,
      category: item.category,
      quantity,
      minStock,
      unit: item.unit,
      location: locations[Math.floor(Math.random() * locations.length)],
      lastUpdate: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
    };
  });
}

export const sparePartsData: SparePart[] = generateSpareParts();

const applicants = ['张工', '李工', '王工', '刘工', '陈工'];

export function generateTransfers(): SparePartTransfer[] {
  const transfers: SparePartTransfer[] = [];
  const statuses: ('pending' | 'approved' | 'rejected' | 'completed')[] = ['pending', 'approved', 'rejected', 'completed'];

  for (let i = 0; i < 25; i++) {
    const part = sparePartsData[Math.floor(Math.random() * sparePartsData.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const fromIdx = Math.floor(Math.random() * locations.length);
    let toIdx = Math.floor(Math.random() * locations.length);
    while (toIdx === fromIdx) {
      toIdx = Math.floor(Math.random() * locations.length);
    }

    transfers.push({
      id: `DB-${String(2026001 + i).padStart(7, '0')}`,
      partId: part.id,
      partName: part.name,
      fromLocation: locations[fromIdx],
      toLocation: locations[toIdx],
      quantity: 1 + Math.floor(Math.random() * 5),
      applicant: applicants[Math.floor(Math.random() * applicants.length)],
      approver: status !== 'pending' ? applicants[Math.floor(Math.random() * applicants.length)] : undefined,
      status,
      createdAt: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
      approvedAt: status !== 'pending' ? new Date(Date.now() - Math.random() * 86400000 * 25).toISOString() : undefined,
    });
  }

  return transfers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export const transfersData: SparePartTransfer[] = generateTransfers();

export function getLowStockParts(): SparePart[] {
  return sparePartsData.filter(p => p.quantity <= p.minStock);
}
