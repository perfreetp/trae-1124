import { Cpu, TicketCheck, Clock, TrendingUp, TrendingDown, AlertTriangle, Users, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { getKPIData } from '@/data/analytics';
import { linesData } from '@/data/stations';
import { getPendingTickets } from '@/data/tickets';
import { cn } from '@/lib/utils';

const kpiData = getKPIData();
const pendingTickets = getPendingTickets();

function KPICard({ title, value, unit, icon: Icon, trend, trendText, color }: {
  title: string;
  value: string | number;
  unit?: string;
  icon: any;
  trend?: 'up' | 'down';
  trendText?: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">{value}</span>
            {unit && <span className="text-sm text-slate-500">{unit}</span>}
          </div>
          {trendText && (
            <div className="mt-2 flex items-center gap-1 text-xs">
              {trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-red-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-green-500" />
              )}
              <span className={cn(trend === 'up' ? 'text-red-600' : 'text-green-600')}>
                {trendText}
              </span>
              <span className="text-slate-400">较上周</span>
            </div>
          )}
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', color)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="线路总览"
        description="实时监控全线设备运行状态，快速响应故障告警"
      />
      
      <div className="grid grid-cols-4 gap-5">
        <KPICard
          title="设备在线率"
          value={kpiData.onlineRate}
          unit="%"
          icon={Cpu}
          trend="down"
          trendText="0.3%"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <KPICard
          title="待处理工单"
          value={kpiData.pendingTickets}
          unit="件"
          icon={TicketCheck}
          trend="up"
          trendText={`${kpiData.pendingTicketsTrend}%`}
          color="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <KPICard
          title="今日已处理"
          value={kpiData.completedTicketsToday}
          unit="件"
          icon={TicketCheck}
          color="bg-gradient-to-br from-green-500 to-emerald-500"
        />
        <KPICard
          title="平均修复时长"
          value={kpiData.avgRepairTime}
          unit="分钟"
          icon={Clock}
          trend="down"
          trendText={`${Math.abs(kpiData.avgRepairTimeTrend)}%`}
          color="bg-gradient-to-br from-indigo-500 to-purple-500"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">线路运行图</h3>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                <span className="text-slate-600">正常</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                <span className="text-slate-600">预警</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                <span className="text-slate-600">故障</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-96 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 p-6">
            <svg className="h-full w-full" viewBox="0 0 850 350">
              {linesData.map((line) => (
                <g key={line.id}>
                  <line
                    x1={line.stations[0].position.x}
                    y1={line.stations[0].position.y}
                    x2={line.stations[line.stations.length - 1].position.x}
                    y2={line.stations[line.stations.length - 1].position.y}
                    stroke={line.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                  {line.stations.map((station, idx) => {
                    const hasFault = station.faultCount > 0;
                    const hasWarning = station.faultCount > 2;
                    return (
                      <g key={station.id} className="cursor-pointer">
                        <circle
                          cx={station.position.x}
                          cy={station.position.y}
                          r={hasWarning ? 12 : hasFault ? 10 : 8}
                          fill={hasWarning ? '#F59E0B' : hasFault ? '#EF4444' : '#10B981'}
                          className="transition-all hover:r-12"
                        />
                        <circle
                          cx={station.position.x}
                          cy={station.position.y}
                          r={hasWarning ? 16 : hasFault ? 14 : 12}
                          fill="none"
                          stroke={hasWarning ? '#F59E0B' : hasFault ? '#EF4444' : '#10B981'}
                          strokeWidth="2"
                          opacity="0.4"
                        />
                        <text
                          x={station.position.x}
                          y={station.position.y + 28}
                          textAnchor="middle"
                          fill="#94A3B8"
                          fontSize="11"
                          className="pointer-events-none"
                        >
                          {station.name}
                        </text>
                        {station.faultCount > 0 && (
                          <g>
                            <circle
                              cx={station.position.x + 10}
                              cy={station.position.y - 10}
                              r="9"
                              fill="#EF4444"
                            />
                            <text
                              x={station.position.x + 10}
                              y={station.position.y - 6}
                              textAnchor="middle"
                              fill="white"
                              fontSize="10"
                              fontWeight="bold"
                            >
                              {station.faultCount}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              ))}
            </svg>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4">
            {linesData.map((line) => (
              <div key={line.id} className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="h-3 w-12 rounded-full" style={{ backgroundColor: line.color }}></div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{line.name}</p>
                  <p className="text-xs text-slate-500">{line.stations.length} 个车站</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              实时告警
            </h3>
            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
              {pendingTickets.length} 条
            </span>
          </div>
          <div className="max-h-96 space-y-2 overflow-y-auto p-3">
            {pendingTickets.slice(0, 8).map((ticket) => (
              <div
                key={ticket.id}
                className="group rounded-lg border border-slate-100 p-3 transition-all hover:border-slate-200 hover:bg-slate-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge type="priority" status={ticket.priority} />
                      <span className="text-xs text-slate-400">{ticket.id}</span>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-slate-800">{ticket.title}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {ticket.station}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {ticket.reporter}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{ width: `${ticket.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-900">客流影响概览</h3>
          <div className="space-y-3">
            {['火车站', '人民广场', '解放路', '会展中心', '东站'].map((station, idx) => (
              <div key={station} className="flex items-center gap-4">
                <span className="w-20 text-sm text-slate-600">{station}</span>
                <div className="flex-1">
                  <div className="h-6 overflow-hidden rounded-lg bg-slate-100">
                    <div
                      className={cn(
                        'h-full rounded-lg transition-all',
                        idx === 0
                          ? 'bg-gradient-to-r from-red-400 to-red-500'
                          : idx === 2
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                          : 'bg-gradient-to-r from-blue-400 to-blue-500'
                      )}
                      style={{ width: `${85 - idx * 15}%` }}
                    ></div>
                  </div>
                </div>
                <span className="w-16 text-right text-sm font-medium text-slate-700">
                  {idx === 0 ? '严重' : idx === 2 ? '中度' : '轻微'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-slate-900">设备状态分布</h3>
          <div className="flex items-center justify-center gap-8">
            <div className="relative h-44 w-44">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="12" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="12"
                  strokeDasharray={`${parseFloat(kpiData.onlineRate) * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">{kpiData.onlineRate}%</span>
                <span className="text-xs text-slate-500">设备在线率</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span className="text-sm text-slate-600">正常运行</span>
                <span className="ml-2 text-sm font-semibold text-slate-800">
                  {kpiData.onlineDevices} 台
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                <span className="text-sm text-slate-600">预警状态</span>
                <span className="ml-2 text-sm font-semibold text-slate-800">
                  {Math.floor(kpiData.totalDevices * 0.12)} 台
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="text-sm text-slate-600">故障停机</span>
                <span className="ml-2 text-sm font-semibold text-slate-800">
                  {kpiData.totalDevices - kpiData.onlineDevices} 台
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                <span className="text-sm text-slate-600">维护保养</span>
                <span className="ml-2 text-sm font-semibold text-slate-800">
                  {Math.floor(kpiData.totalDevices * 0.03)} 台
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
