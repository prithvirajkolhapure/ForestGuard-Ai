import React from 'react';
import { TrendingUp, TrendingDown, ShieldCheck, TreePine, Bug, Clock } from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, RadialBarChart, RadialBar
} from 'recharts';

const monthlyData = [
    { month: 'Jul', incidents: 32, resolved: 28, falseAlarms: 4 },
    { month: 'Aug', incidents: 45, resolved: 38, falseAlarms: 7 },
    { month: 'Sep', incidents: 28, resolved: 25, falseAlarms: 3 },
    { month: 'Oct', incidents: 52, resolved: 44, falseAlarms: 8 },
    { month: 'Nov', incidents: 38, resolved: 35, falseAlarms: 3 },
    { month: 'Dec', incidents: 61, resolved: 50, falseAlarms: 11 },
    { month: 'Jan', incidents: 42, resolved: 39, falseAlarms: 3 },
    { month: 'Feb', incidents: 35, resolved: 32, falseAlarms: 3 },
];

const detectionBreakdown = [
    { name: 'Tree Cutting', value: 38, color: '#ef4444' },
    { name: 'Chainsaw Audio', value: 25, color: '#f97316' },
    { name: 'Unauthorized Human', value: 20, color: '#eab308' },
    { name: 'Logging Truck', value: 12, color: '#6366f1' },
    { name: 'Sensor Anomaly', value: 5, color: '#06b6d4' },
];

const aiModelPerformance = [
    { name: 'YOLOv8', accuracy: 99.4, fill: '#10b981' },
    { name: 'AudioCNN', accuracy: 96.2, fill: '#6366f1' },
    { name: 'Anomaly ML', accuracy: 92.8, fill: '#f59e0b' },
    { name: 'Satellite', accuracy: 94.1, fill: '#3b82f6' },
];

const kpiCards = [
    { label: 'Total Incidents', value: '333', change: '-12%', up: false, icon: Bug, color: 'text-red-400', bg: 'bg-red-500/10' },
    { label: 'Resolution Rate', value: '93.4%', change: '+2.1%', up: true, icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Avg Response Time', value: '4.2m', change: '-18%', up: false, icon: Clock, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Forest Saved', value: '842 ha', change: '+24%', up: true, icon: TreePine, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#0f172a] border border-white/10 rounded-lg p-3 text-xs shadow-xl">
                <p className="text-white font-semibold mb-1">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color || p.fill }} className="font-medium">
                        {p.name}: {p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function Analytics() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Analytics</h1>
                <p className="text-sm text-text-muted mt-1">Operational intelligence and trend analysis</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {kpiCards.map((kpi, i) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={kpi.label} className={`glass rounded-2xl p-5 animate-fade-in stagger-${i + 1}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                                    <Icon size={18} className={kpi.color} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-bold ${kpi.up ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {kpi.change}
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-white">{kpi.value}</p>
                            <p className="text-xs text-text-muted mt-1">{kpi.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Monthly Trends */}
                <div className="xl:col-span-2 glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-1">Monthly Incident Trends</h3>
                    <p className="text-xs text-text-muted mb-6">8-month operational overview</p>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={monthlyData}>
                            <defs>
                                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} fill="url(#incGrad)" name="Incidents" />
                            <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fill="url(#resGrad)" name="Resolved" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Detection Breakdown Pie */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-1">Detection Types</h3>
                    <p className="text-xs text-text-muted mb-4">Distribution by category</p>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={detectionBreakdown}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                dataKey="value"
                                stroke="none"
                            >
                                {detectionBreakdown.map((entry) => (
                                    <Cell key={entry.name} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-2">
                        {detectionBreakdown.map((d) => (
                            <div key={d.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                                    <span className="text-text-muted">{d.name}</span>
                                </div>
                                <span className="font-semibold text-white">{d.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* AI Model Performance */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-1">AI Model Performance</h3>
                    <p className="text-xs text-text-muted mb-6">Accuracy metrics across detection engines</p>
                    <div className="space-y-5">
                        {aiModelPerformance.map((model) => (
                            <div key={model.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-white">{model.name}</span>
                                    <span className="text-sm font-bold" style={{ color: model.fill }}>{model.accuracy}%</span>
                                </div>
                                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${model.accuracy}%`, backgroundColor: model.fill }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* False Alarm Analysis */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-1">False Alarm Rates</h3>
                    <p className="text-xs text-text-muted mb-6">Monthly false positive tracking</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={monthlyData}>
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="falseAlarms" name="False Alarms" radius={[6, 6, 0, 0]} fill="#6366f1" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
