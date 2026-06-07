import { useState } from 'react';
import { Plus, Search, Package, AlertTriangle, ArrowLeftRight, FileText, ChevronDown, Clock, User, MapPin } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { sparePartsData, transfersData, getLowStockParts } from '@/data/spareParts';
import { cn } from '@/lib/utils';

const tabs = [
  { key: 'inventory', label: '库存总览' },
  { key: 'transfer', label: '备件调拨' },
];

export default function SpareParts() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const lowStockParts = getLowStockParts();
  const categories = Array.from(new Set(sparePartsData.map(p => p.category)));
  
  const filteredParts = sparePartsData.filter(part => {
    const matchSearch = part.name.toLowerCase().includes(searchText.toLowerCase()) ||
                        part.code.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const statusConfig = {
    pending: { label: '待审批', className: 'bg-amber-100 text-amber-700' },
    approved: { label: '已批准', className: 'bg-blue-100 text-blue-700' },
    rejected: { label: '已拒绝', className: 'bg-red-100 text-red-700' },
    completed: { label: '已完成', className: 'bg-green-100 text-green-700' },
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="备件周转"
        description="管理备件库存，处理备件调拨申请"
        actions={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <FileText className="h-4 w-4" />
              出入库记录
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              新建调拨
            </button>
          </div>
        }
      />
      
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{sparePartsData.length}</p>
              <p className="text-xs text-slate-500">备件品类</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{lowStockParts.length}</p>
              <p className="text-xs text-slate-500">库存预警</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">
                {transfersData.filter(t => t.status === 'pending').length}
              </p>
              <p className="text-xs text-slate-500">待审批调拨</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <ArrowLeftRight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {transfersData.filter(t => t.status === 'completed').length}
              </p>
              <p className="text-xs text-slate-500">已完成调拨</p>
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
          
          {activeTab === 'inventory' && (
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索备件名称/编码..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="h-9 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-9 appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-3 pr-8 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="all">全部分类</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          )}
        </div>
        
        {activeTab === 'inventory' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">备件编码</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">备件名称</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">分类</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">库存数量</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">最低库存</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">单位</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">存放位置</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">更新时间</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredParts.map((part) => {
                  const isLowStock = part.quantity <= part.minStock;
                  return (
                    <tr key={part.id} className="transition-colors hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-sm text-slate-900">{part.code}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{part.name}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                          {part.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'text-sm font-semibold',
                            isLowStock ? 'text-red-600' : 'text-slate-900'
                          )}>
                            {part.quantity}
                          </span>
                          {isLowStock && (
                            <span className="inline-flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
                              <AlertTriangle className="h-3 w-3" />
                              库存不足
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{part.minStock}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{part.unit}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{part.location}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{formatTime(part.lastUpdate)}</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          申请调拨
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        
        {activeTab === 'transfer' && (
          <div className="divide-y divide-slate-100">
            {transfersData.map((transfer) => (
              <div key={transfer.id} className="p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-slate-500">{transfer.id}</span>
                      <span className={cn(
                        'inline-flex rounded px-2 py-0.5 text-xs font-medium',
                        statusConfig[transfer.status].className
                      )}>
                        {statusConfig[transfer.status].label}
                      </span>
                    </div>
                    <h4 className="mt-2 font-medium text-slate-900">{transfer.partName}</h4>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <ArrowLeftRight className="h-3.5 w-3.5" />
                        {transfer.fromLocation} → {transfer.toLocation}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="h-3.5 w-3.5" />
                        {transfer.quantity} 件
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        申请人：{transfer.applicant}
                      </span>
                      {transfer.approver && (
                        <span className="flex items-center gap-1">
                          <User className="h-3.5 w-3.5" />
                          审批人：{transfer.approver}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatTime(transfer.createdAt)}
                      </span>
                    </div>
                  </div>
                  {transfer.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100">
                        批准
                      </button>
                      <button className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100">
                        拒绝
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
