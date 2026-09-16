import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Map, Radio, Bell, BarChart3,
    Shield, ChevronRight, Search, Moon, Sun,
    TreePine, Menu, X, LogOut, Settings, User
} from 'lucide-react';

const navItems = [
    { path: '/', label: 'Command Center', icon: LayoutDashboard },
    { path: '/map', label: 'Satellite Map', icon: Map },
    { path: '/sensors', label: 'Field Sensors', icon: Radio },
    { path: '/alerts', label: 'Alert Center', icon: Bell },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const location = useLocation();
    const [now, setNow] = useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (d) => d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formatDate = (d) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="flex h-screen overflow-hidden bg-[#020617]">
            {/* ─── Sidebar ─── */}
            <aside
                className={`${sidebarOpen ? 'w-72' : 'w-20'} transition-all duration-300 ease-in-out flex flex-col border-r border-white/[0.04] bg-[#0a101f] relative z-50`}
            >
                {/* Logo */}
                <div className={`flex items-center ${sidebarOpen ? 'px-7' : 'px-5 justify-center'} h-20 border-b border-white/[0.04]`}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
                        <TreePine size={20} className="text-white" />
                    </div>
                    {sidebarOpen && (
                        <div className="ml-3 animate-fade-in">
                            <h1 className="text-base font-bold tracking-tight text-white">ForestGuard</h1>
                            <p className="text-[10px] font-semibold text-emerald-400 tracking-widest uppercase">AI Platform</p>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {sidebarOpen && (
                        <p className="text-[10px] font-bold text-text-dim uppercase tracking-[0.15em] px-4 mb-3">Main Navigation</p>
                    )}
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3.5 ${sidebarOpen ? 'px-4' : 'px-0 justify-center'} py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
                  ${isActive
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'text-text-muted hover:bg-white/[0.03] hover:text-white'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-emerald-400" />
                                )}
                                <Icon size={18} className={isActive ? 'text-emerald-400' : 'text-text-dim group-hover:text-white'} />
                                {sidebarOpen && <span>{item.label}</span>}
                                {sidebarOpen && isActive && <ChevronRight size={14} className="ml-auto text-emerald-400/50" />}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className={`border-t border-white/[0.04] ${sidebarOpen ? 'p-5' : 'p-3'}`}>
                    {sidebarOpen ? (
                        <div className="glass rounded-xl p-4 animate-fade-in">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    CR
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">Chief Ranger</p>
                                    <p className="text-[11px] text-text-muted">System Administrator</p>
                                </div>
                                <button className="p-1.5 rounded-lg hover:bg-white/5 text-text-dim hover:text-white transition"><LogOut size={15} /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">CR</div>
                        </div>
                    )}
                </div>
            </aside>

            {/* ─── Main Area ─── */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="h-16 border-b border-white/[0.04] bg-[#020617]/80 backdrop-blur flex items-center justify-between px-6 flex-shrink-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-white/5 text-text-dim hover:text-white transition"
                        >
                            {sidebarOpen ? <Menu size={18} /> : <Menu size={18} />}
                        </button>
                        <div className="hidden md:flex items-center gap-2 bg-surface/60 border border-white/[0.04] rounded-xl px-4 py-2 w-80">
                            <Search size={15} className="text-text-dim" />
                            <input
                                type="text"
                                placeholder="Search incidents, sensors, zones..."
                                className="bg-transparent text-sm text-white placeholder-text-dim outline-none w-full"
                            />
                            <kbd className="text-[10px] text-text-dim bg-white/5 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col items-end mr-2">
                            <span className="text-xs font-semibold text-white font-mono">{formatTime(now)}</span>
                            <span className="text-[10px] text-text-dim">{formatDate(now)}</span>
                        </div>
                        <div className="h-6 w-px bg-white/[0.06] hidden lg:block" />
                        <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-glow-green" />
                            <span className="text-[11px] font-medium text-emerald-400">LIVE</span>
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-lg hover:bg-white/5 text-text-dim hover:text-white transition"
                        >
                            {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                        </button>
                        <div className="relative">
                            <button className="p-2 rounded-lg hover:bg-white/5 text-text-dim hover:text-white transition relative">
                                <Bell size={16} />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse-ring" />
                            </button>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-white/5 text-text-dim hover:text-white transition">
                            <Settings size={16} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
