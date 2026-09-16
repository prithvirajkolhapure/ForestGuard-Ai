import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreePine, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-[#020617] relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIvPjwvc3ZnPg==')] opacity-60" />
            </div>

            {/* Left Panel - Branding */}
            <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative z-10">
                <div className="animate-fade-in">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                            <TreePine size={28} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
                        Protect our<br />
                        <span className="gradient-text">forests</span> with AI
                    </h1>
                    <p className="text-lg text-text-muted max-w-md leading-relaxed">
                        Real-time illegal logging detection powered by satellite imagery, IoT sensors, and advanced machine learning.
                    </p>

                    <div className="mt-14 space-y-5">
                        {[
                            { n: '1,402', l: 'Active Sensors Deployed' },
                            { n: '99.4%', l: 'AI Detection Accuracy' },
                            { n: '12.8M', l: 'Hectares Protected' },
                        ].map((s, i) => (
                            <div key={i} className={`flex items-center gap-4 animate-fade-in stagger-${i + 1}`}>
                                <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                                    <Shield size={16} className="text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-white">{s.n}</p>
                                    <p className="text-xs text-text-muted">{s.l}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="flex-1 flex items-center justify-center px-6 relative z-10">
                <div className="w-full max-w-md animate-fade-in">
                    <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                            <TreePine size={24} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">ForestGuard AI</h2>
                    </div>

                    <div className="glass rounded-2xl p-8 border border-white/[0.06]">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
                            <p className="text-sm text-text-muted">Sign in to access the command center</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ranger@forestguard.ai"
                                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-text-dim outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••"
                                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-text-dim outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-white transition"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-3.5 h-3.5 rounded accent-emerald-500" />
                                    <span className="text-xs text-text-muted">Remember me</span>
                                </label>
                                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center justify-center gap-2 disabled:opacity-60"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>Access Command Center <ArrowRight size={16} /></>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
                            <p className="text-xs text-text-dim">
                                Protected by <span className="text-emerald-400 font-semibold">ForestGuard Security</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
