import React, { useState } from 'react';
import { Bell, BellOff, CheckCircle, Clock, AlertTriangle, XCircle, ChevronDown, Filter } from 'lucide-react';

const alerts = [
    { id: 'ALT-901', message: 'Critical: Logging truck detected in restricted Zone Delta-9', severity: 'Critical', time: '2 minutes ago', read: false, source: 'YOLOv8', action: 'Drone deployed' },
    { id: 'ALT-900', message: 'High: Chainsaw audio pattern confirmed near Northern Ridge Sensor SN-004', severity: 'High', time: '14 minutes ago', read: false, source: 'AudioCNN', action: 'Ranger notified' },
    { id: 'ALT-899', message: 'High: Unauthorized personnel detected at River Crossing checkpoint', severity: 'High', time: '38 minutes ago', read: true, source: 'YOLOv8', action: 'Under investigation' },
    { id: 'ALT-898', message: 'Medium: Unusual vibration patterns detected in Old Growth sector', severity: 'Medium', time: '1 hour ago', read: true, source: 'Anomaly ML', action: 'Monitoring' },
    { id: 'ALT-897', message: 'Low: Sensor SN-005 battery below 25%, maintenance required', severity: 'Low', time: '2 hours ago', read: true, source: 'System', action: 'Scheduled' },
    { id: 'ALT-896', message: 'Medium: Satellite detected possible canopy loss in Eastern quadrant', severity: 'Medium', time: '3 hours ago', read: true, source: 'Satellite', action: 'Verified' },
    { id: 'ALT-895', message: 'High: Multiple human signatures detected near protected boundary', severity: 'High', time: '5 hours ago', read: true, source: 'YOLOv8', action: 'Patrol dispatched' },
    { id: 'ALT-894', message: 'Low: Sensor SN-007 went offline, possible hardware failure', severity: 'Low', time: '1 day ago', read: true, source: 'System', action: 'Replacement ordered' },
];

const severityConfig = {
    Critical: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: XCircle, iconColor: 'text-red-400' },
    High: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', icon: AlertTriangle, iconColor: 'text-orange-400' },
    Medium: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: Clock, iconColor: 'text-yellow-400' },
    Low: { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: CheckCircle, iconColor: 'text-blue-400' },
};

export default function Alerts() {
    const [filterSeverity, setFilterSeverity] = useState('All');
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    const filteredAlerts = alerts.filter((a) => {
        if (filterSeverity !== 'All' && a.severity !== filterSeverity) return false;
        if (showUnreadOnly && a.read) return false;
        return true;
    });

    const unreadCount = alerts.filter(a => !a.read).length;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Alert Center</h1>
                    <p className="text-sm text-text-muted mt-1">
                        {unreadCount} unread alert{unreadCount !== 1 ? 's' : ''} requiring attention
                    </p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${showUnreadOnly
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : 'bg-white/[0.03] text-text-muted border-white/[0.06] hover:text-white'
                            }`}
                    >
                        {showUnreadOnly ? <Bell size={13} /> : <BellOff size={13} />}
                        {showUnreadOnly ? 'Unread Only' : 'Show All'}
                    </button>
                    {['All', 'Critical', 'High', 'Medium', 'Low'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterSeverity(s)}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition ${filterSeverity === s
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                    : 'bg-white/[0.03] text-text-muted border-white/[0.06] hover:text-white'
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Alert List */}
            <div className="space-y-3">
                {filteredAlerts.map((alert, i) => {
                    const config = severityConfig[alert.severity];
                    const SevIcon = config.icon;
                    return (
                        <div
                            key={alert.id}
                            className={`glass rounded-2xl p-5 transition-all duration-200 hover:translate-y-[-1px] animate-fade-in stagger-${(i % 4) + 1} ${!alert.read ? 'border-l-2 border-l-emerald-400' : ''
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-2.5 rounded-xl ${config.bg} flex-shrink-0 mt-0.5`}>
                                    <SevIcon size={18} className={config.iconColor} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="font-mono text-[10px] text-text-dim">{alert.id}</span>
                                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${config.bg} ${config.color} ${config.border}`}>
                                            {alert.severity}
                                        </span>
                                        {!alert.read && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                                    </div>
                                    <p className="text-sm font-medium text-white leading-relaxed">{alert.message}</p>
                                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                                        <span className="text-[10px] text-text-dim font-medium">Source: <span className="text-text-muted font-mono">{alert.source}</span></span>
                                        <span className="text-[10px] text-text-dim font-medium">Action: <span className="text-emerald-400">{alert.action}</span></span>
                                        <span className="text-[10px] text-text-dim">{alert.time}</span>
                                    </div>
                                </div>
                                <button className="text-text-dim hover:text-white transition flex-shrink-0 mt-1">
                                    <ChevronDown size={16} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredAlerts.length === 0 && (
                <div className="glass rounded-2xl p-16 text-center">
                    <CheckCircle size={48} className="mx-auto text-emerald-400/30 mb-4" />
                    <p className="text-lg font-semibold text-white">All clear!</p>
                    <p className="text-sm text-text-muted mt-1">No alerts match your current filters.</p>
                </div>
            )}
        </div>
    );
}
