import { useState } from 'react';
import { TrendingUp, Clock, AlertTriangle, CheckCircle, BarChart3, PieChart, LineChart } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import { PageHeader } from '@/components/PageHeader';
import { analyticsData, deviceReliabilityData, getKPIData, getFaultTypeDistribution } from '@/data/analytics';
import { getDeviceStats } from '@/data/devices';
import { cn } from '@/lib/utils';

const tabs = [
  { key: 'overview', label: '综合概览' },
  { key: 'reliability', label: '可靠性排名' },
  { key: 'faults', label: '故障分析' },
];

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const kpiData = getKPIData();
  const deviceStats = getDeviceStats();
  
  const dailyData = analyticsData.map(d => ({
    ...d,
    inspectionCompleted: Math.floor(d.ticketCount * (1.5 + Math.random())),
  }));
  
  const deviceReliabilityRanking = deviceReliabilityData.map((item, index) => ({
    id: `rank-${index}`,
    name: item.deviceName,
    code: `DEV-${String(index + 1).padStart(4, '0')}`,
    type: item.deviceType,
    station: item.station,
    runningHours: Math.floor(item.mtbf * 0.8),
    faultCount: item.faultCount,
    reliability: item.availability / 100,
  }));
  
  const getDeviceTypeDistribution = () => ({
    escalator: deviceStats.escalator,
    gate: deviceStats.gate,
    platformDoor: deviceStats.platformDoor,
  });
  
  const getFaultTrendData = () => {
    const dates = dailyData.slice(-14).map(d => d.date.slice(5));
    return {
      dates,
      escalator: dates.map(() => Math.floor(2 + Math.random() * 4)),
      gate: dates.map(() => Math.floor(3 + Math.random() * 5)),
      platformDoor: dates.map(() => Math.floor(1 + Math.random() * 3)),
    };
  };

  const lineChartOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1e293b' },
    },
    legend: {
      data: ['工单数量', '巡检完成数'],
      top: 0,
      textStyle: { color: '#64748b', fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dailyData.map(d => d.date.slice(5)),
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    series: [
      {
        name: '工单数量',
        type: 'line',
        smooth: true,
        data: dailyData.map(d => d.ticketCount),
        lineStyle: { color: '#3b82f6', width: 2 },
        itemStyle: { color: '#3b82f6' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.2)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.02)' },
            ],
          },
        },
      },
      {
        name: '巡检完成数',
        type: 'line',
        smooth: true,
        data: dailyData.map(d => d.inspectionCompleted),
        lineStyle: { color: '#10b981', width: 2 },
        itemStyle: { color: '#10b981' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.2)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.02)' },
            ],
          },
        },
      },
    ],
  };

  const pieChartOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1e293b' },
      formatter: '{b}: {c} 台 ({d}%)',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      textStyle: { color: '#64748b', fontSize: 12 },
      formatter: (name: string) => {
        const data = [
          { value: deviceStats.escalator, name: '扶梯' },
          { value: deviceStats.gate, name: '闸机' },
          { value: deviceStats.platformDoor, name: '屏蔽门' },
        ];
        const item = data.find(d => d.name === name);
        return item ? `${name}  ${item.value}台` : name;
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%',
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#1e293b',
          },
        },
        labelLine: { show: false },
        data: [
          { value: deviceStats.escalator, name: '扶梯', itemStyle: { color: '#3b82f6' } },
          { value: deviceStats.gate, name: '闸机', itemStyle: { color: '#10b981' } },
          { value: deviceStats.platformDoor, name: '屏蔽门', itemStyle: { color: '#f59e0b' } },
        ],
      },
    ],
  };

  const barChartOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1e293b' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: deviceReliabilityRanking.slice(0, 10).map(d => d.name).reverse(),
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    series: [
      {
        type: 'bar',
        data: deviceReliabilityRanking.slice(0, 10).map(d => d.reliability * 100).reverse(),
        barWidth: 16,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#60a5fa' },
            ],
          },
          borderRadius: [0, 4, 4, 0],
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          fontSize: 11,
          color: '#64748b',
        },
      },
    ],
  };

  const faultTrendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      textStyle: { color: '#1e293b' },
    },
    legend: {
      data: ['扶梯故障', '闸机故障', '屏蔽门故障'],
      top: 0,
      textStyle: { color: '#64748b', fontSize: 12 },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: getFaultTrendData().dates,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#f1f5f9' } },
      axisLabel: { color: '#64748b', fontSize: 11 },
    },
    series: [
      {
        name: '扶梯故障',
        type: 'bar',
        data: getFaultTrendData().escalator,
        itemStyle: { color: '#3b82f6', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: '闸机故障',
        type: 'bar',
        data: getFaultTrendData().gate,
        itemStyle: { color: '#10b981', borderRadius: [4, 4, 0, 0] },
      },
      {
        name: '屏蔽门故障',
        type: 'bar',
        data: getFaultTrendData().platformDoor,
        itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  const kpis = {
    completionRate: 0.895,
    averageReliability: kpiData.onlineRate / 100,
    averageRepairTime: 2.8,
    overdueCount: 8,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="运营分析"
        description="设备运维数据分析，辅助决策优化"
      />
      
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{(kpis.completionRate * 100).toFixed(1)}%</p>
              <p className="text-xs text-slate-500">工单完成率</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{(kpis.averageReliability * 100).toFixed(1)}%</p>
              <p className="text-xs text-slate-500">设备可靠性</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{kpis.averageRepairTime}h</p>
              <p className="text-xs text-slate-500">平均修复时长</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{kpis.overdueCount}</p>
              <p className="text-xs text-slate-500">超时工单</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
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
        </div>
        
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            <div>
              <h4 className="mb-4 flex items-center gap-2 font-medium text-slate-900">
                <LineChart className="h-4 w-4 text-blue-600" />
                工单与巡检趋势
              </h4>
              <div className="h-72">
                <ReactECharts option={lineChartOption} style={{ height: '100%', width: '100%' }} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="mb-4 flex items-center gap-2 font-medium text-slate-900">
                  <PieChart className="h-4 w-4 text-blue-600" />
                  设备类型分布
                </h4>
                <div className="h-64">
                  <ReactECharts option={pieChartOption} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>
              <div>
                <h4 className="mb-4 flex items-center gap-2 font-medium text-slate-900">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  设备可靠性 TOP10
                </h4>
                <div className="h-64">
                  <ReactECharts option={barChartOption} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reliability' && (
          <div className="p-6">
            <h4 className="mb-4 font-medium text-slate-900">设备可靠性排名</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">排名</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">设备名称</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">设备编号</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">类型</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">所属车站</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">运行小时</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">故障次数</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">可靠性</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {deviceReliabilityRanking.map((device, index) => (
                    <tr key={device.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <span className={cn(
                          'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
                          index < 3 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                        )}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{device.name}</td>
                      <td className="px-4 py-3 font-mono text-sm text-slate-600">{device.code}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                          {device.type === 'escalator' ? '扶梯' : device.type === 'gate' ? '闸机' : '屏蔽门'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{device.station}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{device.runningHours}h</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{device.faultCount}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-blue-500"
                              style={{ width: `${device.reliability * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-blue-600">
                            {(device.reliability * 100).toFixed(1)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'faults' && (
          <div className="p-6 space-y-6">
            <div>
              <h4 className="mb-4 flex items-center gap-2 font-medium text-slate-900">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                故障趋势分析（按设备类型）
              </h4>
              <div className="h-72">
                <ReactECharts option={faultTrendOption} style={{ height: '100%', width: '100%' }} />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <h5 className="text-sm font-medium text-slate-700">扶梯常见故障</h5>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">安全回路触发</span>
                    <span className="font-medium text-slate-900">32次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">扶手带速度异常</span>
                    <span className="font-medium text-slate-900">28次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">梳齿板异物卡入</span>
                    <span className="font-medium text-slate-900">19次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">驱动链故障</span>
                    <span className="font-medium text-slate-900">14次</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <h5 className="text-sm font-medium text-slate-700">闸机常见故障</h5>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">闸门卡滞</span>
                    <span className="font-medium text-slate-900">45次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">读卡器故障</span>
                    <span className="font-medium text-slate-900">38次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">传感器误报</span>
                    <span className="font-medium text-slate-900">25次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">通道异物遮挡</span>
                    <span className="font-medium text-slate-900">21次</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <h5 className="text-sm font-medium text-slate-700">屏蔽门常见故障</h5>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">门体开关不到位</span>
                    <span className="font-medium text-slate-900">22次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">光幕故障</span>
                    <span className="font-medium text-slate-900">18次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">门锁异常</span>
                    <span className="font-medium text-slate-900">15次</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">指示灯故障</span>
                    <span className="font-medium text-slate-900">11次</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
