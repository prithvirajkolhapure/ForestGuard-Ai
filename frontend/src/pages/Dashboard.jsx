import React, { useState, useEffect } from 'react';
import {
    AlertTriangle, Shield, Radio, TreePine,
    TrendingUp, TrendingDown, Activity, Eye, Zap, Target
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const threatData = [
    { time: '00:00', threats: 2, resolved: 1 },
    { time: '03:00', threats: 1, resolved: 1 },
    { time: '06:00', threats: 5, resolved: 3 },
    { time: '09:00', threats: 8, resolved: 6 },
    { time: '12:00', threats: 12, resolved: 9 },
    { time: '15:00', threats: 7, resolved: 5 },
    { time: '18:00', threats: 15, resolved: 10 },
    { time: '21:00', threats: 9, resolved: 7 },
];

const regionData = [
    { name: 'North', risk: 85 },
    { name: 'South', risk: 45 },
    { name: 'East', risk: 72 },
    { name: 'West', risk: 30 },
    { name: 'Central', risk: 60 },
    { name: 'Delta', risk: 90 },
];

const incidents = [
    { id: 'INC-4821', type: 'Logging Truck', severity: 'Critical', location: 'Sector Delta-9', time: '2m ago', status: 'Tracking', confidence: 98, ai: 'YOLOv8' },
    { id: 'INC-4820', type: 'Chainsaw Audio', severity: 'High', location: 'Northern Ridge', time: '14m ago', status: 'Drone Deployed', confidence: 94, ai: 'AudioCNN' },
    { id: 'INC-4819', type: 'Human Activity', severity: 'High', location: 'River Crossing B', time: '38m ago', status: 'Investigating', confidence: 91, ai: 'YOLOv8' },
    { id: 'INC-4818', type: 'Vegetation Loss', severity: 'Medium', location: 'Old Growth W', time: '1h ago', status: 'Confirmed', confidence: 87, ai: 'Satellite' },
    { id: 'INC-4817', type: 'Sensor Anomaly', severity: 'Low', location: 'Checkpoint 7', time: '2h ago', status: 'Resolved', confidence: 72, ai: 'Anomaly ML' },
];

const severityColor = {
    Critical: 'bg-red-500',
    High: 'bg-orange-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-blue-500',
};

const severityBg = {
    Critical: 'bg-red-500/10 text-red-400 border-red-500/20',
    High: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    Low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

const statusColor = {
    Tracking: 'text-red-400',
    'Drone Deployed': 'text-orange-400',
    Investigating: 'text-yellow-400',
    Confirmed: 'text-blue-400',
    Resolved: 'text-emerald-400',
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass rounded-lg p-3 border border-white/10 text-xs">
                <p className="text-white font-semibold mb-1">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color }} className="font-medium">
                        {p.name}: {p.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    const [liveCount, setLiveCount] = useState(0);

    useEffect(() => {
        const target = 14;
        let current = 0;
        const interval = setInterval(() => {
            current += 1;
            setLiveCount(current);
            if (current >= target) clearInterval(interval);
        }, 80);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { label: 'Active Threats', value: liveCount, trend: '+3', up: true, icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', glow: 'shadow-red-500/10' },
        { label: 'Sensors Online', value: '1,402', trend: '100%', up: true, icon: Radio, color: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/10' },
        { label: 'AI Accuracy', value: '99.4%', trend: '+0.2%', up: true, icon: Target, color: 'text-indigo-400', bg: 'bg-indigo-500/10', glow: 'shadow-indigo-500/10' },
        { label: 'Forest Coverage', value: '12.8M ha', trend: 'Stable', up: true, icon: TreePine, color: 'text-emerald-400', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/10' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Command Center</h1>
                    <p className="text-sm text-text-muted mt-1">Real-time surveillance across 42 monitored sectors</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm font-medium text-text-muted hover:text-white hover:bg-white/[0.06] transition">
                        <Activity size={15} /> System Health
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition">
                        <Zap size={15} /> Initiate Drone Scan
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className={`glass rounded-2xl p-5 hover:border-white/10 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl ${stat.glow} animate-fade-in stagger-${i + 1}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                                    <Icon size={18} className={stat.color} />
                                </div>
                                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                    {stat.trend}
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-white animate-count-up">{stat.value}</p>
                            <p className="text-xs text-text-muted mt-1 font-medium">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Threat Timeline Chart */}
                <div className="xl:col-span-2 glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-white">Threat Activity Timeline</h3>
                            <p className="text-xs text-text-muted mt-0.5">Detections & resolutions over 24 hours</p>
                        </div>
                        <div className="flex gap-4 text-xs">
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" /> Threats</span>
                            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Resolved</span>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={threatData}>
                            <defs>
                                <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="resolveGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#475569' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} fill="url(#threatGrad)" name="Threats" />
                            <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fill="url(#resolveGrad)" name="Resolved" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Regional Risk */}
                <div className="glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-1">Regional Risk Index</h3>
                    <p className="text-xs text-text-muted mb-6">Threat density by sector</p>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={regionData} layout="vertical">
                            <XAxis type="number" tick={{ fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={50} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="risk" name="Risk %" radius={[0, 6, 6, 0]} fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Incident Table */}
            <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white">Live Incident Feed</h3>
                        <p className="text-xs text-text-muted mt-0.5">AI-generated threat intelligence pipeline</p>
                    </div>
                    <button className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider transition">
                        View All →
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[10px] font-bold text-text-dim uppercase tracking-[0.1em] border-b border-white/[0.04]">
                                <th className="pb-3 pr-4">ID</th>
                                <th className="pb-3 pr-4">Detection</th>
                                <th className="pb-3 pr-4">Sector</th>
                                <th className="pb-3 pr-4">AI Model</th>
                                <th className="pb-3 pr-4">Confidence</th>
                                <th className="pb-3 pr-4">Status</th>
                                <th className="pb-3 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {incidents.map((inc, i) => (
                                <tr key={inc.id} className={`border-b border-white/[0.03] hover:bg-white/[0.015] transition group animate-fade-in stagger-${i + 1}`}>
                                    <td className="py-4 pr-4">
                                        <span className="font-mono text-xs text-text-muted">{inc.id}</span>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className={`w-2 h-2 rounded-full ${severityColor[inc.severity]} ${inc.severity === 'Critical' ? 'animate-pulse-ring' : ''}`} />
                                            <span className="font-semibold text-white">{inc.type}</span>
                                            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${severityBg[inc.severity]}`}>
                                                {inc.severity}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4 text-text-muted text-xs">{inc.location}</td>
                                    <td className="py-4 pr-4">
                                        <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                            {inc.ai}
                                        </span>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-20 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000"
                                                    style={{ width: `${inc.confidence}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono text-text-muted">{inc.confidence}%</span>
                                        </div>
                                    </td>
                                    <td className="py-4 pr-4">
                                        <span className={`text-xs font-semibold ${statusColor[inc.status]}`}>{inc.status}</span>
                                    </td>
                                    <td className="py-4 text-right text-xs text-text-muted">{inc.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
