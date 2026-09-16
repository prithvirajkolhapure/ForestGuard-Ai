import React, { useState } from 'react';
import { Radio, Battery, Wifi, WifiOff, Thermometer, Volume2, Camera, Activity } from 'lucide-react';

const sensorTypes = {
    Acoustic: { icon: Volume2, color: 'text-violet-400', bg: 'bg-violet-500/10' },
    Motion: { icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    Camera: { icon: Camera, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    Vibration: { icon: Thermometer, color: 'text-rose-400', bg: 'bg-rose-500/10' },
};

const sensors = [
    { id: 'SN-001', type: 'Acoustic', zone: 'Sector Alpha', status: 'Active', battery: 92, signal: 'Strong', lastPing: '2s ago', alerts: 3 },
    { id: 'SN-002', type: 'Camera', zone: 'Northern Ridge', status: 'Active', battery: 78, signal: 'Strong', lastPing: '5s ago', alerts: 1 },
    { id: 'SN-003', type: 'Motion', zone: 'Delta Reserve', status: 'Active', battery: 85, signal: 'Medium', lastPing: '12s ago', alerts: 0 },
    { id: 'SN-004', type: 'Vibration', zone: 'River Crossing', status: 'Active', battery: 67, signal: 'Strong', lastPing: '3s ago', alerts: 5 },
    { id: 'SN-005', type: 'Acoustic', zone: 'Old Growth W', status: 'Maintenance', battery: 23, signal: 'Weak', lastPing: '5m ago', alerts: 0 },
    { id: 'SN-006', type: 'Camera', zone: 'Eastern Grove', status: 'Active', battery: 95, signal: 'Strong', lastPing: '1s ago', alerts: 2 },
    { id: 'SN-007', type: 'Motion', zone: 'Core Reserve', status: 'Inactive', battery: 0, signal: 'None', lastPing: '2d ago', alerts: 0 },
    { id: 'SN-008', type: 'Acoustic', zone: 'Checkpoint 7', status: 'Active', battery: 88, signal: 'Strong', lastPing: '4s ago', alerts: 1 },
];

export default function Sensors() {
    const [filter, setFilter] = useState('All');
    const [selectedSensor, setSelectedSensor] = useState(null);

    const filteredSensors = filter === 'All' ? sensors : sensors.filter(s => s.status === filter);

    const statusCounts = {
        All: sensors.length,
        Active: sensors.filter(s => s.status === 'Active').length,
        Maintenance: sensors.filter(s => s.status === 'Maintenance').length,
        Inactive: sensors.filter(s => s.status === 'Inactive').length,
    };

    const getBatteryColor = (level) => {
        if (level > 60) return 'text-emerald-400';
        if (level > 30) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getSignalIcon = (signal) => {
        if (signal === 'None') return <WifiOff size={13} className="text-red-400" />;
        return <Wifi size={13} className={signal === 'Strong' ? 'text-emerald-400' : 'text-yellow-400'} />;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Field Sensors</h1>
                    <p className="text-sm text-text-muted mt-1">IoT network monitoring and health diagnostics</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(statusCounts).map(([status, count]) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`glass rounded-xl p-4 text-left transition-all hover:translate-y-[-2px] ${filter === status ? 'border-emerald-500/30 bg-emerald-500/5' : ''
                            }`}
                    >
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{status}</p>
                        <p className="text-2xl font-bold text-white mt-1">{count}</p>
                    </button>
                ))}
            </div>

            {/* Sensor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {filteredSensors.map((sensor, i) => {
                    const typeInfo = sensorTypes[sensor.type];
                    const Icon = typeInfo.icon;
                    const isActive = sensor.status === 'Active';
                    const isSelected = selectedSensor?.id === sensor.id;

                    return (
                        <button
                            key={sensor.id}
                            onClick={() => setSelectedSensor(sensor)}
                            className={`glass rounded-2xl p-5 text-left transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg animate-fade-in stagger-${(i % 4) + 1} ${isSelected ? 'border-emerald-500/30 shadow-emerald-500/10' : ''
                                }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2.5 rounded-xl ${typeInfo.bg}`}>
                                    <Icon size={18} className={typeInfo.color} />
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : sensor.status === 'Maintenance' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${isActive ? 'text-emerald-400' : sensor.status === 'Maintenance' ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {sensor.status}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm font-bold text-white mb-0.5">{sensor.id}</p>
                            <p className="text-[11px] text-text-muted mb-4">{sensor.zone}</p>

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-white/[0.03] rounded-lg py-2 border border-white/[0.04]">
                                    <Battery size={12} className={`mx-auto mb-0.5 ${getBatteryColor(sensor.battery)}`} />
                                    <p className="text-[10px] font-bold text-white">{sensor.battery}%</p>
                                </div>
                                <div className="bg-white/[0.03] rounded-lg py-2 border border-white/[0.04]">
                                    <div className="flex justify-center mb-0.5">{getSignalIcon(sensor.signal)}</div>
                                    <p className="text-[10px] font-bold text-white">{sensor.signal}</p>
                                </div>
                                <div className="bg-white/[0.03] rounded-lg py-2 border border-white/[0.04]">
                                    <Radio size={12} className="mx-auto mb-0.5 text-text-dim" />
                                    <p className="text-[10px] font-bold text-white">{sensor.lastPing}</p>
                                </div>
                            </div>

                            {sensor.alerts > 0 && (
                                <div className="mt-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                                    <p className="text-[10px] font-bold text-red-400">{sensor.alerts} alert{sensor.alerts > 1 ? 's' : ''} triggered</p>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
