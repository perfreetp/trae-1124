import { useState } from 'react';
import { 
  AlertTriangle, Shield, Clock, MapPin, User, Phone, 
  ChevronRight, Play, FileCheck, BookOpen, RefreshCw 
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { emergencyPlansData, stopRecordsData, eventReviewsData } from '@/data/emergency';
import type { EmergencyPlan, ServiceStopRecord } from '@/types';
import { cn } from '@/lib/utils';

const tabs = [
  { key: 'plans', label: '应急预案', icon: BookOpen },
  { key: 'stops', label: '停运登记', icon: AlertTriangle },
  { key: 'reviews', label: '事件复盘', icon: FileCheck },
];

const levelConfig = {
  'level-1': { label: '一级', className: 'bg-red-100 text-red-700' },
  'level-2': { label: '二级', className: 'bg-orange-100 text-orange-700' },
  'level-3': { label: '三级', className: 'bg-amber-100 text-amber-700' },
};

const typeConfig = {
  'equipment-fault': '设备故障',
  'passenger-incident': '乘客事件',
  'fire': '火灾',
  'power-outage': '停电',
  'other': '其他',
};

export default function Emergency() {
  const [activeTab, setActiveTab] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState<EmergencyPlan | null>(null);
  
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('zh-CN', { 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="应急处置"
        description="应急预案管理、停运登记、复开确认和事件复盘"
      />
      
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{emergencyPlansData.length}</p>
              <p className="text-xs text-slate-500">应急预案</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {stopRecordsData.filter(r => r.status === 'stopped').length}
              </p>
              <p className="text-xs text-slate-500">停运中</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {stopRecordsData.filter(r => r.status === 'recovered').length}
              </p>
              <p className="text-xs text-slate-500">已复开</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{eventReviewsData.length}</p>
              <p className="text-xs text-slate-500">事件复盘</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    activeTab === tab.key
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {activeTab === 'plans' && (
          <div className="grid grid-cols-3 gap-0">
            <div className="border-r border-slate-100">
              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {emergencyPlansData.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={cn(
                      'cursor-pointer p-4 transition-colors hover:bg-slate-50',
                      selectedPlan?.id === plan.id && 'bg-blue-50/50'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'inline-flex rounded px-2 py-0.5 text-xs font-medium',
                            levelConfig[plan.level].className
                          )}>
                            {levelConfig[plan.level].label}
                          </span>
                          <span className="text-xs text-slate-400">{typeConfig[plan.type]}</span>
                        </div>
                        <h4 className="mt-2 font-medium text-slate-900">{plan.title}</h4>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-500">{plan.content}</p>
                      </div>
                      <ChevronRight className="mt-2 h-5 w-5 flex-shrink-0 text-slate-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-2">
              {selectedPlan ? (
                <div className="max-h-[600px] overflow-y-auto p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'inline-flex rounded px-3 py-1 text-sm font-medium',
                          levelConfig[selectedPlan.level].className
                        )}>
                          <Shield className="mr-1 h-4 w-4" />
                          {levelConfig[selectedPlan.level].label}预案
                        </span>
                        <span className="text-sm text-slate-500">{typeConfig[selectedPlan.type]}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold text-slate-900">{selectedPlan.title}</h3>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                      <Play className="h-4 w-4" />
                      启动预案
                    </button>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold text-slate-900">预案说明</h4>
                    <p className="mt-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                      {selectedPlan.content}
                    </p>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="mb-3 font-semibold text-slate-900">处置步骤</h4>
                    <div className="space-y-3">
                      {selectedPlan.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-4 rounded-lg border border-slate-100 p-4">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                            {idx + 1}
                          </div>
                          <p className="flex-1 text-sm text-slate-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="mb-3 font-semibold text-slate-900">联络方式</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedPlan.contacts.map((contact, idx) => (
                        <div key={idx} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <Phone className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{contact.name}</p>
                            <p className="text-xs text-slate-500">{contact.role} · {contact.phone}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                    <BookOpen className="h-8 w-8 text-slate-400" />
                  </div>
                  <h4 className="mt-4 font-medium text-slate-700">选择应急预案</h4>
                  <p className="mt-1 text-sm text-slate-500">点击左侧列表查看预案详情</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'stops' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">记录编号</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">设备名称</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">所属车站</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">停运原因</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">停运时间</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">影响范围</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">预计恢复</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">状态</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stopRecordsData.map((record) => (
                  <tr key={record.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-sm text-slate-900">{record.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{record.deviceName}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{record.station}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{record.reason}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{formatTime(record.stopTime)}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{record.impactScope}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{formatTime(record.estimatedRecovery)}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        'inline-flex rounded px-2 py-0.5 text-xs font-medium',
                        record.status === 'stopped' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-green-100 text-green-700'
                      )}>
                        {record.status === 'stopped' ? '停运中' : '已恢复'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {record.status === 'stopped' ? (
                        <button className="text-sm font-medium text-green-600 hover:text-green-700">
                          复开确认
                        </button>
                      ) : (
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          查看详情
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {eventReviewsData.map((review) => (
              <div key={review.id} className="p-5 transition-colors hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-slate-900">{review.eventTitle}</h4>
                      <span className="inline-flex rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                        {review.eventType}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatTime(review.eventTime)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {review.responsiblePerson}
                      </span>
                      <span>参与人员：{review.participants.join('、')}</span>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs font-semibold text-slate-500">事件描述</h5>
                        <p className="mt-1 text-sm text-slate-700">{review.description}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-slate-500">原因分析</h5>
                        <p className="mt-1 text-sm text-slate-700">{review.causeAnalysis}</p>
                      </div>
                      <div>
                        <h5 className="text-xs font-semibold text-slate-500">改进措施</h5>
                        <p className="mt-1 text-sm text-slate-700">{review.improvementMeasures}</p>
                      </div>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    查看详情
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
