import { useState } from 'react';
import { Cpu, Filter, Search, ChevronDown, Clock, Wrench, AlertCircle, Plus } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { devicesData, getDeviceStats } from '@/data/devices';
import type { Device, DeviceType } from '@/types';
import { cn } from '@/lib/utils';

const tabs = [
  { key: 'all', label: '全部设备', icon: Cpu },
  { key: 'escalator', label: '扶梯', icon: Cpu },
  { key: 'gate', label: '闸机', icon: Cpu },
  { key: 'platform-door', label: '屏蔽门', icon: Cpu },
];

export default function Devices() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [selectedStation, setSelectedStation] = useState('all');
  
  const stats = getDeviceStats();
  
  const filteredDevices = devicesData.filter(device => {
    const matchType = activeTab === 'all' || device.type === activeTab;
    const matchSearch = device.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        device.id.toLowerCase().includes(searchText.toLowerCase());
    const matchStation = selectedStation === 'all' || device.station === selectedStation;
    return matchType && matchSearch && matchStation;
  });

  const stations = Array.from(new Set(devicesData.map(d => d.station)));

  const typeLabel = (type: DeviceType) => {
    switch (type) {
      case 'escalator': return '扶梯';
      case 'gate': return '闸机';
      case 'platform-door': return '屏蔽门';
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="车站设备"
        description="管理全线车站的扶梯、闸机、屏蔽门等设备，查看设备状态和详细信息"
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            快速报修
          </button>
        }
      />
      
      <div className="grid grid-cols-5 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
              <p className="text-xs text-slate-500">设备总数</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.normal}</p>
              <p className="text-xs text-slate-500">正常运行</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{stats.warning}</p>
              <p className="text-xs text-slate-500">预警状态</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.fault}</p>
              <p className="text-xs text-slate-500">故障停机</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.maintenance}</p>
              <p className="text-xs text-slate-500">维护中</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                  activeTab === tab.key
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="搜索设备编号或名称..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            
            <div className="relative">
              <select
                value={selectedStation}
                onChange={(e) => setSelectedStation(e.target.value)}
                className="h-9 appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-3 pr-8 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">全部车站</option>
                {stations.map(station => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">设备编号</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">设备名称</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">类型</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">所属车站</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">位置</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">状态</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">运行时长</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">品牌/型号</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDevices.slice(0, 15).map((device) => (
                <tr key={device.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm font-medium text-slate-900">{device.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-slate-900">{device.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {typeLabel(device.type)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{device.station}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{device.location}</td>
                  <td className="px-4 py-3">
                    <StatusBadge type="device" status={device.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      {device.runHours.toLocaleString()} 小时
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {device.brand} / {device.model}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
          <p className="text-sm text-slate-500">
            显示 <span className="font-medium text-slate-700">1</span>-<span className="font-medium text-slate-700">{Math.min(15, filteredDevices.length)}</span> 条，共 <span className="font-medium text-slate-700">{filteredDevices.length}</span> 条记录
          </p>
          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">上一页</button>
            <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white">1</button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">2</button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">3</button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
}
