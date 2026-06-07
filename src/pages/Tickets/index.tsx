import { useState } from 'react';
import { Plus, Search, Filter, Clock, User, MapPin, AlertTriangle, ChevronRight, MoreHorizontal, Eye } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { StatusBadge, ImpactBadge } from '@/components/StatusBadge';
import { ticketsData, getTicketStats } from '@/data/tickets';
import type { Ticket, TicketStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusTabs: { key: 'all' | TicketStatus; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待派修' },
  { key: 'assigned', label: '已派修' },
  { key: 'processing', label: '处理中' },
  { key: 'completed', label: '已完成' },
  { key: 'closed', label: '已闭环' },
];

export default function Tickets() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchText, setSearchText] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  
  const stats = getTicketStats();
  
  const filteredTickets = ticketsData.filter(ticket => {
    const matchStatus = activeTab === 'all' || ticket.status === activeTab;
    const matchSearch = ticket.title.toLowerCase().includes(searchText.toLowerCase()) ||
                        ticket.id.toLowerCase().includes(searchText.toLowerCase()) ||
                        ticket.station.toLowerCase().includes(searchText.toLowerCase());
    return matchStatus && matchSearch;
  });

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="故障工单"
        description="管理设备故障工单，跟踪维修进度，保障设备稳定运行"
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            新建工单
          </button>
        }
      />
      
      <div className="grid grid-cols-6 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">工单总数</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">待派修</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">处理中</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{stats.assigned + stats.processing}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">已完成</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{stats.completed}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">已闭环</p>
          <p className="mt-1 text-2xl font-bold text-slate-600">{stats.closed}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">紧急工单</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{stats.urgent}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {statusTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                      activeTab === tab.key
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索工单..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="h-9 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredTickets.slice(0, 10).map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={cn(
                  'cursor-pointer p-4 transition-colors hover:bg-slate-50',
                  selectedTicket?.id === ticket.id && 'bg-blue-50/50'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge type="priority" status={ticket.priority} />
                      <StatusBadge type="ticket" status={ticket.status} />
                      <ImpactBadge level={ticket.passengerImpact} />
                    </div>
                    <h4 className="mt-2 font-medium text-slate-900">{ticket.title}</h4>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="font-mono text-slate-400">{ticket.id}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {ticket.station}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {ticket.reporter}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatTime(ticket.createdAt)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>处理进度</span>
                    <span className="font-medium text-slate-700">{ticket.progress}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        ticket.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                      )}
                      style={{ width: `${ticket.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          {selectedTicket ? (
            <div className="h-full">
              <div className="border-b border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">工单详情</h3>
                  <button className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-[550px] space-y-4 overflow-y-auto p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <StatusBadge type="priority" status={selectedTicket.priority} />
                    <StatusBadge type="ticket" status={selectedTicket.status} />
                  </div>
                  <h4 className="mt-3 text-lg font-semibold text-slate-900">{selectedTicket.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">{selectedTicket.id}</p>
                </div>
                
                <div className="space-y-3 rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">所属设备</span>
                    <span className="font-medium text-slate-700">{selectedTicket.deviceName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">所属车站</span>
                    <span className="font-medium text-slate-700">{selectedTicket.station}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">上报人</span>
                    <span className="font-medium text-slate-700">{selectedTicket.reporter}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">上报时间</span>
                    <span className="font-medium text-slate-700">{formatTime(selectedTicket.createdAt)}</span>
                  </div>
                  {selectedTicket.assignedTo && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">处理人</span>
                      <span className="font-medium text-slate-700">{selectedTicket.assignedTo}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h5 className="mb-2 text-sm font-medium text-slate-700">故障描述</h5>
                  <p className="text-sm text-slate-600">{selectedTicket.description}</p>
                </div>
                
                <div>
                  <h5 className="mb-2 text-sm font-medium text-slate-700">客流影响</h5>
                  <div className="flex items-center gap-2">
                    <ImpactBadge level={selectedTicket.passengerImpact} />
                    <span className="text-sm text-slate-600">{selectedTicket.passengerImpactDesc}</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="mb-3 text-sm font-medium text-slate-700">处理进度</h5>
                  <div className="relative space-y-0">
                    {selectedTicket.progressTimeline.map((step, idx) => (
                      <div key={idx} className="relative flex gap-3 pb-4">
                        {idx < selectedTicket.progressTimeline.length - 1 && (
                          <div className="absolute left-2.5 top-5 h-full w-px bg-slate-200"></div>
                        )}
                        <div className="relative z-10 mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 border-blue-500 bg-white"></div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{step.status}</p>
                          <p className="text-xs text-slate-500">{step.description}</p>
                          <p className="mt-1 text-xs text-slate-400">{formatTime(step.time)} · {step.operator}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    处理工单
                  </button>
                  <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <AlertTriangle className="h-8 w-8 text-slate-400" />
              </div>
              <h4 className="mt-4 font-medium text-slate-700">选择工单查看详情</h4>
              <p className="mt-1 text-sm text-slate-500">点击左侧列表中的工单查看详细信息</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
