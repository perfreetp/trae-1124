import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cpu, 
  TicketCheck, 
  ClipboardList, 
  AlertTriangle, 
  Package, 
  FileText, 
  BarChart3,
  Train
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { path: '/dashboard', label: '线路总览', icon: LayoutDashboard },
  { path: '/devices', label: '车站设备', icon: Cpu },
  { path: '/tickets', label: '故障工单', icon: TicketCheck },
  { path: '/inspection', label: '例行巡检', icon: ClipboardList },
  { path: '/emergency', label: '应急处置', icon: AlertTriangle },
  { path: '/spare-parts', label: '备件周转', icon: Package },
  { path: '/duty-log', label: '值班日志', icon: FileText },
  { path: '/analytics', label: '运营分析', icon: BarChart3 },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 bg-slate-900 text-white">
      <div className="flex h-16 items-center gap-3 border-b border-slate-700 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <Train className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">轨交运维</h1>
          <p className="text-xs text-slate-400">设备运维管理系统</p>
        </div>
      </div>
      
      <nav className="mt-4 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'group mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )
              }
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold">
            值
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">张明</p>
            <p className="truncate text-xs text-slate-400">车站值班员</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
