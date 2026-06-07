import { useState } from 'react';
import { Plus, Calendar, MapPin, CheckCircle2, Circle, Clock, User, ChevronRight, FileText } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { inspectionTasksData } from '@/data/inspection';
import type { InspectionTask } from '@/types';
import { cn } from '@/lib/utils';

const statusConfig = {
  pending: { label: '待执行', className: 'bg-amber-100 text-amber-700' },
  'in-progress': { label: '进行中', className: 'bg-blue-100 text-blue-700' },
  completed: { label: '已完成', className: 'bg-green-100 text-green-700' },
};

export default function Inspection() {
  const [selectedTask, setSelectedTask] = useState<InspectionTask | null>(inspectionTasksData[0]);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="例行巡检"
        description="管理巡检任务，执行点位签到，记录巡检结果"
        actions={
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            新建巡检计划
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
              <p className="text-2xl font-bold text-slate-900">{inspectionTasksData.length}</p>
              <p className="text-xs text-slate-500">巡检任务</p>
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
                {inspectionTasksData.filter(t => t.status === 'pending').length}
              </p>
              <p className="text-xs text-slate-500">待执行</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">
                {inspectionTasksData.filter(t => t.status === 'in-progress').length}
              </p>
              <p className="text-xs text-slate-500">进行中</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {inspectionTasksData.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-xs text-slate-500">已完成</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-5">
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4">
            <h3 className="font-semibold text-slate-900">巡检任务列表</h3>
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {inspectionTasksData.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={cn(
                  'cursor-pointer p-4 transition-colors hover:bg-slate-50',
                  selectedTask?.id === task.id && 'bg-blue-50/50'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'inline-flex rounded px-2 py-0.5 text-xs font-medium',
                        statusConfig[task.status].className
                      )}>
                        {statusConfig[task.status].label}
                      </span>
                    </div>
                    <h4 className="mt-2 font-medium text-slate-900">{task.name}</h4>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(task.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {task.inspector}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        {task.completedPoints.length}/{task.points.length} 点位
                      </span>
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${(task.completedPoints.length / task.points.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-2 rounded-xl border border-slate-200 bg-white shadow-sm">
          {selectedTask ? (
            <div className="h-full">
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedTask.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(selectedTask.date)} · {selectedTask.inspector}
                  </p>
                </div>
                <span className={cn(
                  'inline-flex rounded px-3 py-1 text-sm font-medium',
                  statusConfig[selectedTask.status].className
                )}>
                  {statusConfig[selectedTask.status].label}
                </span>
              </div>
              
              <div className="max-h-[550px] overflow-y-auto p-4">
                <div className="mb-6 rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">巡检进度</span>
                    <span className="text-sm font-semibold text-slate-900">
                      {selectedTask.completedPoints.length}/{selectedTask.points.length}
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all"
                      style={{ width: `${(selectedTask.completedPoints.length / selectedTask.points.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <h4 className="mb-4 font-medium text-slate-900">巡检点位</h4>
                <div className="space-y-3">
                  {selectedTask.points.map((point, idx) => {
                    const isCompleted = selectedTask.completedPoints.includes(point.id);
                    return (
                      <div
                        key={point.id}
                        className={cn(
                          'flex items-center gap-4 rounded-lg border p-4 transition-all',
                          isCompleted
                            ? 'border-green-200 bg-green-50/50'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        )}
                      >
                        <div className="flex-shrink-0">
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          ) : (
                            <Circle className="h-6 w-6 text-slate-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">{idx + 1}. {point.name}</span>
                            {point.checkResult === 'abnormal' && (
                              <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">异常</span>
                            )}
                            {point.checkResult === 'normal' && (
                              <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">正常</span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {point.location}
                            </span>
                            <span className="inline-flex rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                              {point.deviceType === 'escalator' ? '扶梯' : point.deviceType === 'gate' ? '闸机' : '屏蔽门'}
                            </span>
                          </div>
                          {point.remark && (
                            <p className="mt-2 text-sm text-slate-600">备注：{point.remark}</p>
                          )}
                        </div>
                        {!isCompleted && (
                          <button className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
                            签到
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {selectedTask.status !== 'completed' && (
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700">
                      继续巡检
                    </button>
                    <button className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      提交巡检报告
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <h4 className="mt-4 font-medium text-slate-700">选择巡检任务</h4>
              <p className="mt-1 text-sm text-slate-500">点击左侧列表查看任务详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
