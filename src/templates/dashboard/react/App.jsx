import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, Database, Shield, FileText, Settings, 
    Activity, Plus, LogIn, Sun, Moon, LogOut, ExternalLink, 
    Zap, Cpu, ArrowRight, Command, Terminal as TerminalIcon,
    Rocket, Boxes, Code2
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

const App = () => {
    const [page, setPage] = useState('home');
    const [isDark, setIsDark] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passkey, setPasskey] = useState('');

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            root.classList.remove('light');
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
        }
    }, [isDark]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginId = toast.loading('Verifying system access...');
        try {
            const res = await fetch('/api/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-app-version': '1.0.0' },
                body: JSON.stringify({ type: 'auth:login', data: { passkey } })
            });
            const result = await res.json();
            if (res.status === 200) {
                toast.success('Access granted to Command Center', { id: loginId });
                setIsAuthenticated(true);
                setPage('dashboard');
            } else { 
                toast.error(result.response?.data?.message || "Invalid Passkey", { id: loginId }); 
            }
        } catch (e) { 
            toast.error("Dispatcher unreachable", { id: loginId }); 
        }
    };

    const fireAction = async () => {
        toast.info('Dispatching test action...');
        try {
            const res = await fetch('/api/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-app-version': '1.0.0' },
                body: JSON.stringify({ type: 'app:welcome', data: { source: 'Home' } })
            });
            const result = await res.json();
            toast.success(`Success: ${result.status}`);
        } catch (e) { 
            toast.error("Server connection failed"); 
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setPage('home');
        toast.success('Successfully logged out from system');
    };

    const Navbar = () => (
        <nav className="fixed top-0 w-full z-50 px-6 py-6 font-sans">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/70 dark:bg-black/60 backdrop-blur-2xl p-4 rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl">
                <div onClick={() => setPage('home')} className="flex items-center gap-3 group cursor-pointer">
                    <img src="/public/images/nova-anime.png" alt="Nova" className="w-12 h-12 object-contain" />
                    <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 bg-clip-text text-transparent uppercase">Nova.js</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsDark(!isDark)} className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-500 dark:text-slate-400">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    {!isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <button onClick={() => setPage('login')} className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors uppercase">Login</button>
                            <button onClick={() => setPage('login')} className="bg-slate-900 dark:bg-white dark:text-black px-6 py-2.5 rounded-full text-sm font-black hover:scale-105 active:scale-95 transition-all uppercase">Register</button>
                        </div>
                    ) : (
                        <button onClick={logout} className="text-red-500 font-bold hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all flex items-center gap-2 uppercase tracking-tight"><LogOut size={18} /> Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );

    const HomePage = () => (
        <motion.main initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative pt-40 pb-20 px-6 min-h-screen overflow-hidden font-sans text-center">
            {/* SVG Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20">
                <svg className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] text-blue-500/20" viewBox="0 0 200 200"><path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C86.9,14.5,81.2,29,72.4,41.4C63.6,53.8,51.7,64.1,38.1,71.2C24.5,78.3,9.1,82.2,-5.1,81C-19.3,79.8,-32.3,73.5,-44.1,65.3C-55.9,57.1,-66.5,47,-73.4,34.7C-80.3,22.4,-83.5,7.9,-81.8,-6.1C-80.1,-20.1,-73.5,-33.6,-64.1,-45.1C-54.7,-56.6,-42.5,-66.1,-29.4,-73.8C-16.3,-81.5,-2.2,-87.4,11.3,-85.4C24.8,-83.4,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" /></svg>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-black tracking-widest uppercase mb-8">
                    <Rocket size={12} className="animate-pulse" /> High Performance SADA Ecosystem
                </div>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8] dark:text-white text-slate-900 uppercase">The Fast Way <br/> To Build <span className="text-blue-600 font-black">Backends.</span></h1>
                <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">Engineered for absolute performance. Nova.js combines pure architectural discipline with unrivaled developer experience.</p>
                <div className="flex flex-wrap justify-center gap-6">
                    <a href="https://nakikoneko.gitbook.io/seishiroapi" target="_blank" className="bg-slate-900 dark:bg-white dark:text-black px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase">Documentation <ExternalLink size={24} /></a>
                    <button onClick={fireAction} className="bg-white dark:bg-black border border-black/5 dark:border-white/10 px-10 py-5 rounded-2xl font-bold text-lg hover:border-blue-500/50 transition-all flex items-center gap-3 uppercase tracking-tight">Request Seishiro <Zap size={20} className="text-blue-500 fill-current" /></button>
                </div>
            </div>
        </motion.main>
    );

    const LoginPage = () => (
        <motion.main initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-black font-sans text-center">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/5">
                <Shield size={48} className="mx-auto mb-6 text-blue-600" />
                <h1 className="text-3xl font-black mb-8 uppercase tracking-tight">Access Control</h1>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input v-model="passkey" type="password" placeholder="System Passkey" value={passkey} onChange={(e) => setPasskey(e.target.value)} className="w-full bg-slate-100 dark:bg-black/50 p-6 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono" />
                    <button className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black shadow-xl active:scale-95 transition-all text-lg flex items-center justify-center gap-2 uppercase tracking-tight">Login <LogIn size={24}/></button>
                </form>
                <button onClick={() => setPage('home')} className="mt-8 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Back to Base</button>
            </div>
        </motion.main>
    );

    const DashboardPage = () => (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 px-10 max-w-7xl mx-auto font-sans">
            <h2 className="text-5xl font-black tracking-tight mb-16 italic uppercase">Command Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <StatCard title="Throughput" value="1.2k /s" icon={<Activity className="text-blue-500" />} />
                <StatCard title="Total Actions" value="248,912" icon={<Boxes className="text-purple-500" />} />
                <StatCard title="Node Status" value="Stable" icon={<Cpu className="text-orange-500" />} />
            </div>
        </motion.main>
    );

    return (
        <div className="min-h-screen transition-colors duration-500 selection:bg-blue-500 selection:text-white font-sans">
            <Toaster position="bottom-right" theme={isDark ? 'dark' : 'light'} richColors closeButton />
            <Navbar />
            <AnimatePresence mode="wait">
                {page === 'home' && <HomePage key="home" />}
                {page === 'login' && <LoginPage key="login" />}
                {page === 'dashboard' && <DashboardPage key="dashboard" />}
            </AnimatePresence>
        </div>
    );
};

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-lg flex items-center gap-6">
        <div className="p-5 bg-slate-50 dark:bg-black rounded-3xl">{icon}</div>
        <div>
            <div className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{title}</div>
            <div className="text-3xl font-black">{value}</div>
        </div>
    </div>
);

export default App;
