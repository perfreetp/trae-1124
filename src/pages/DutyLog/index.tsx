import { useState } from 'react';
import { Plus, Clock, User, FileText, Building2, Star, ChevronRight, Calendar, Phone } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { dutyRecordsData, supplierRecordsData } from '@/data/dutyLog';
import { cn } from '@/lib/utils';

const tabs = [
  { key: 'records', label: '值班记录' },
  { key: 'handover', label: '值班交接' },
  { key: 'supplier', label: '供应商记录' },
];

const shiftLabels = {
  morning: '早班',
  afternoon: '中班',
  night: '夜班',
};

const shiftColors = {
  morning: 'bg-amber-100 text-amber-700',
  afternoon: 'bg-blue-100 text-blue-700',
  night: 'bg-indigo-100 text-indigo-700',
};

const eventTypeColors = {
  normal: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  fault: 'bg-red-100 text-red-700',
};

const eventTypeLabels = {
  normal: '正常',
  warning: '预警',
  fault: '故障',
};

export default function DutyLog() {
  const [activeTab, setActiveTab] = useState('records');
  const [selectedRecord, setSelectedRecord] = useState(dutyRecordsData[0]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="值班日志"
        description="记录值班情况，管理交接班和供应商服务记录"
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            新建记录
          </button>
        }
      />
      
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{dutyRecordsData.length}</p>
              <p className="text-xs text-slate-500">值班记录</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">
                {dutyRecordsData.filter(r => r.shift === 'morning').length}
              </p>
              <p className="text-xs text-slate-500">早班记录</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{supplierRecordsData.length}</p>
              <p className="text-xs text-slate-500">供应商记录</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">4.5</p>
              <p className="text-xs text-slate-500">平均评分</p>
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
        
        {activeTab === 'records' && (
          <div className="grid grid-cols-3 gap-0">
            <div className="border-r border-slate-100 max-h-[600px] overflow-y-auto">
              {dutyRecordsData.map((record) => (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className={cn(
                    'cursor-pointer border-b border-slate-50 p-4 transition-colors hover:bg-slate-50',
                    selectedRecord?.id === record.id && 'bg-blue-50/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-900">{formatDate(record.date)}</span>
                    </div>
                    <span className={cn(
                      'inline-flex rounded px-2 py-0.5 text-xs font-medium',
                      shiftColors[record.shift]
                    )}>
                      {shiftLabels[record.shift]}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <User className="h-3.5 w-3.5" />
                    值班员：{record.operator}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {record.events.slice(0, 3).map((event, idx) => (
                      <span key={idx} className={cn(
                        'inline-flex rounded px-1.5 py-0.5 text-xs',
                        eventTypeColors[event.type]
                      )}>
                        {eventTypeLabels[event.type]}
                      </span>
                    ))}
                    {record.events.length > 3 && (
                      <span className="text-xs text-slate-400">+{record.events.length - 3}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="col-span-2 max-h-[600px] overflow-y-auto p-6">
              {selectedRecord && (
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-slate-900">{formatDate(selectedRecord.date)}</h3>
                        <span className={cn(
                          'inline-flex rounded px-3 py-1 text-sm font-medium',
                          shiftColors[selectedRecord.shift]
                        )}>
                          {shiftLabels[selectedRecord.shift]}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">
                        值班员：{selectedRecord.operator}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-slate-900">值班事件</h4>
                    <div className="mt-3 space-y-3">
                      {selectedRecord.events.map((event, idx) => (
                        <div key={idx} className="flex gap-4 rounded-lg border border-slate-100 p-3">
                          <div className="flex-shrink-0">
                            <span className={cn(
                              'inline-flex rounded px-2 py-0.5 text-xs font-medium',
                              eventTypeColors[event.type]
                            )}>
                              {event.time}
                            </span>
                          </div>
                          <p className="flex-1 text-sm text-slate-700">{event.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 rounded-lg bg-slate-50 p-4">
                    <h4 className="font-medium text-slate-900">交接班备注</h4>
                    <p className="mt-2 text-sm text-slate-600">{selectedRecord.handoverNotes}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="text-slate-500">接班人：{selectedRecord.nextShiftOperator}</span>
                      <span className="text-slate-500">记录编号：{selectedRecord.id}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'handover' && (
          <div className="p-6">
            <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-slate-300" />
              <h4 className="mt-4 font-medium text-slate-700">值班交接功能</h4>
              <p className="mt-1 text-sm text-slate-500">选择值班记录进行交接班操作，或创建新的交接记录</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                <Plus className="h-4 w-4" />
                创建交接班记录
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'supplier' && (
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {supplierRecordsData.map((record) => (
              <div key={record.id} className="p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-slate-900">{record.name}</h4>
                      <span className="inline-flex rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                        {record.serviceType}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-4 w-4',
                              i < record.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        联系人：{record.contactPerson}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {record.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        到达：{formatTime(record.arrivalTime)}
                      </span>
                      {record.departureTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          离开：{formatTime(record.departureTime)}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        登记人：{record.operator}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">服务内容：{record.serviceContent}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
