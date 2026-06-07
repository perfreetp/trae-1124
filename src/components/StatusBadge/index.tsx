import { cn } from '@/lib/utils';
import type { DeviceStatus, TicketPriority, TicketStatus } from '@/types';

interface StatusBadgeProps {
  type: 'device' | 'priority' | 'ticket';
  status: DeviceStatus | TicketPriority | TicketStatus;
  className?: string;
}

const deviceStatusConfig = {
  normal: { label: '正常', className: 'bg-green-100 text-green-700 border-green-200' },
  warning: { label: '预警', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  fault: { label: '故障', className: 'bg-red-100 text-red-700 border-red-200' },
  maintenance: { label: '维护中', className: 'bg-blue-100 text-blue-700 border-blue-200' },
};

const priorityConfig = {
  low: { label: '低', className: 'bg-slate-100 text-slate-600 border-slate-200' },
  medium: { label: '中', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  high: { label: '高', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  urgent: { label: '紧急', className: 'bg-red-100 text-red-700 border-red-200' },
};

const ticketStatusConfig = {
  pending: { label: '待派修', className: 'bg-amber-100 text-amber-700 border-amber-200' },
  assigned: { label: '已派修', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  processing: { label: '处理中', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  completed: { label: '已完成', className: 'bg-green-100 text-green-700 border-green-200' },
  closed: { label: '已闭环', className: 'bg-slate-100 text-slate-600 border-slate-200' },
};

export function StatusBadge({ type, status, className }: StatusBadgeProps) {
  let config;
  
  if (type === 'device') {
    config = deviceStatusConfig[status as DeviceStatus];
  } else if (type === 'priority') {
    config = priorityConfig[status as TicketPriority];
  } else {
    config = ticketStatusConfig[status as TicketStatus];
  }

  return (
    <span className={cn(
      'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
      config.className,
      className
    )}>
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current opacity-60"></span>
      {config.label}
    </span>
  );
}

interface ImpactBadgeProps {
  level: 'none' | 'minor' | 'moderate' | 'severe';
}

const impactConfig = {
  none: { label: '无影响', className: 'bg-green-100 text-green-700' },
  minor: { label: '轻微', className: 'bg-blue-100 text-blue-700' },
  moderate: { label: '中度', className: 'bg-amber-100 text-amber-700' },
  severe: { label: '严重', className: 'bg-red-100 text-red-700' },
};

export function ImpactBadge({ level }: ImpactBadgeProps) {
  const config = impactConfig[level];
  return (
    <span className={cn(
      'inline-flex items-center rounded px-2 py-0.5 text-xs font-medium',
      config.className
    )}>
      {config.label}
    </span>
  );
}
