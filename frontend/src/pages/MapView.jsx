import React, { useState } from 'react';
import { MapPin, Layers, ZoomIn, ZoomOut, Maximize2, Filter } from 'lucide-react';

const zones = [
    { id: 1, name: 'Sector Alpha', lat: 28, lng: 32, risk: 'Critical', incidents: 8, color: '#ef4444' },
    { id: 2, name: 'Northern Ridge', lat: 45, lng: 55, risk: 'High', incidents: 5, color: '#f97316' },
    { id: 3, name: 'Delta Reserve', lat: 65, lng: 20, risk: 'Medium', incidents: 3, color: '#eab308' },
    { id: 4, name: 'Eastern Grove', lat: 30, lng: 75, risk: 'Low', incidents: 1, color: '#3b82f6' },
    { id: 5, name: 'River Crossing', lat: 55, lng: 60, risk: 'High', incidents: 6, color: '#f97316' },
    { id: 6, name: 'Core Reserve', lat: 50, lng: 40, risk: 'Critical', incidents: 12, color: '#ef4444' },
];

export default function MapView() {
    const [selectedZone, setSelectedZone] = useState(null);
    const [layer, setLayer] = useState('heatmap');

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Satellite Map</h1>
                    <p className="text-sm text-text-muted mt-1">GIS visualization with real-time threat overlays</p>
                </div>
                <div className="flex gap-2">
                    {['heatmap', 'satellite', 'terrain'].map((l) => (
                        <button
                            key={l}
                            onClick={() => setLayer(l)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${layer === l
                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-white/[0.03] text-text-muted border border-white/[0.06] hover:text-white'
                                }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                {/* Map Area */}
                <div className="xl:col-span-3 glass rounded-2xl overflow-hidden relative" style={{ minHeight: '520px' }}>
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#071018]">
                        {/* Grid Lines */}
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                                backgroundSize: '60px 60px'
                            }}
                        />
                        {/* Forest texture overlay */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=30')] bg-cover opacity-[0.06] mix-blend-lighten" />

                        {/* Zone markers */}
                        {zones.map((zone) => (
                            <button
                                key={zone.id}
                                onClick={() => setSelectedZone(zone)}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                                style={{ top: `${zone.lat}%`, left: `${zone.lng}%` }}
                            >
                                <div className="relative">
                                    {/* Pulse ring */}
                                    <div
                                        className="absolute -inset-4 rounded-full animate-ping opacity-20"
                                        style={{ backgroundColor: zone.color }}
                                    />
                                    {/* Glow */}
                                    <div
                                        className="absolute -inset-6 rounded-full blur-xl opacity-15"
                                        style={{ backgroundColor: zone.color }}
                                    />
                                    {/* Dot */}
                                    <div
                                        className="w-4 h-4 rounded-full border-2 border-white/80 relative z-10 transition-transform group-hover:scale-150"
                                        style={{ backgroundColor: zone.color }}
                                    />
                                </div>
                                {/* Label on hover */}
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
                                    <p className="text-[10px] font-bold text-white">{zone.name}</p>
                                    <p className="text-[9px] text-text-muted">{zone.incidents} incidents</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                        {[ZoomIn, ZoomOut, Maximize2, Layers].map((Icon, i) => (
                            <button key={i} className="w-9 h-9 glass rounded-lg flex items-center justify-center text-text-muted hover:text-white transition">
                                <Icon size={15} />
                            </button>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 glass rounded-xl p-4 z-20">
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Threat Levels</p>
                        <div className="space-y-1.5">
                            {[
                                { label: 'Critical', color: '#ef4444' },
                                { label: 'High', color: '#f97316' },
                                { label: 'Medium', color: '#eab308' },
                                { label: 'Low', color: '#3b82f6' },
                            ].map((l) => (
                                <div key={l.label} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                                    <span className="text-[11px] text-text-muted">{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Zone Details Panel */}
                <div className="space-y-4">
                    <div className="glass rounded-2xl p-5">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Filter size={14} className="text-emerald-400" /> Zone Intelligence
                        </h3>
                        {selectedZone ? (
                            <div className="animate-fade-in space-y-4">
                                <div>
                                    <p className="text-xl font-bold text-white">{selectedZone.name}</p>
                                    <p className="text-xs text-text-muted mt-0.5">Risk: <span style={{ color: selectedZone.color }} className="font-semibold">{selectedZone.risk}</span></p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.04]">
                                        <p className="text-xs text-text-muted">Incidents</p>
                                        <p className="text-lg font-bold text-white">{selectedZone.incidents}</p>
                                    </div>
                                    <div className="bg-white/[0.03] rounded-lg p-3 border border-white/[0.04]">
                                        <p className="text-xs text-text-muted">Drones</p>
                                        <p className="text-lg font-bold text-white">2</p>
                                    </div>
                                </div>
                                <button className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition">
                                    Deploy Patrol Unit
                                </button>
                            </div>
                        ) : (
                            <p className="text-xs text-text-dim text-center py-8">Click a zone on the map to view details</p>
                        )}
                    </div>

                    {/* Active Zones List */}
                    <div className="glass rounded-2xl p-5">
                        <h3 className="text-sm font-bold text-white mb-4">Active Zones</h3>
                        <div className="space-y-2">
                            {zones.map((z) => (
                                <button
                                    key={z.id}
                                    onClick={() => setSelectedZone(z)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition ${selectedZone?.id === z.id ? 'bg-white/[0.06]' : 'hover:bg-white/[0.03]'
                                        }`}
                                >
                                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: z.color }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-white truncate">{z.name}</p>
                                        <p className="text-[10px] text-text-dim">{z.incidents} incidents</p>
                                    </div>
                                    <MapPin size={12} className="text-text-dim flex-shrink-0" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
