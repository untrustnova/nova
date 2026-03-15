<template>
  <div class="min-h-screen transition-colors duration-500 selection:bg-blue-500 selection:text-white" :class="{ 'dark': isDark }">
    <div class="bg-white dark:bg-black text-slate-900 dark:text-white font-sans min-h-screen">
      <!-- Navbar -->
      <nav class="fixed top-0 w-full z-50 px-6 py-6 transition-all duration-300">
        <div class="max-w-7xl mx-auto flex justify-between items-center bg-white/70 dark:bg-black/60 backdrop-blur-2xl p-4 rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl">
          <div @click="page = 'home'" class="flex items-center gap-3 group cursor-pointer">
            <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-[360deg] transition-transform duration-700 shadow-lg shadow-blue-500/20">
              <ZapIcon :size="20" class="text-white fill-current" />
            </div>
            <span class="text-2xl font-black tracking-tighter">Nova.js</span>
          </div>
          <div class="flex items-center gap-4 md:gap-8">
            <button @click="isDark = !isDark" class="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-500">
              <SunIcon v-if="isDark" :size="20" />
              <MoonIcon v-else :size="20" />
            </button>
            <template v-if="!isAuthenticated">
              <button @click="page = 'login'" class="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">Login</button>
              <button @click="page = 'login'" class="bg-slate-900 dark:bg-white dark:text-black px-6 py-2.5 rounded-full text-sm font-black hover:scale-105 active:scale-95 transition-all">Get Started</button>
            </template>
            <button v-else @click="logout" class="text-red-500 font-bold hover:bg-red-500/10 px-4 py-2 rounded-xl transition-all flex items-center gap-2">
              <LogOutIcon :size="18" /> Logout
            </button>
          </div>
        </div>
      </nav>

      <!-- Home Page -->
      <main v-if="page === 'home'" class="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-500 text-[10px] font-black uppercase mb-8">
          <RocketIcon :size="12" class="animate-pulse" />
          Enterprise Grade SADA Framework
        </div>
        <h1 class="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8]">
          Built for <br> Absolute <span class="text-blue-600">Speed.</span>
        </h1>
        <p class="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
          The next-generation framework for high-performance backend ecosystems. Precise, scalable, and purely modular.
        </p>
        <button @click="page = 'login'" class="bg-slate-900 dark:bg-white dark:text-black px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto">
          Start Building <ArrowRightIcon :size="24" />
        </button>
      </main>

      <!-- Login Page -->
      <main v-if="page === 'login'" class="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-black">
        <div class="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl border border-black/5 dark:border-white/5 text-center relative overflow-hidden">
          <ShieldIcon :size="48" class="mx-auto mb-6 text-blue-600" />
          <h1 class="text-3xl font-black mb-2 uppercase tracking-tight">Command Center</h1>
          <p class="text-slate-400 text-sm font-medium mb-10">Verify system passkey to continue.</p>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <input v-model="passkey" type="password" placeholder="Passkey" class="w-full bg-slate-100 dark:bg-black/50 p-6 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono">
            <button class="w-full bg-blue-600 text-white py-6 rounded-3xl font-black shadow-xl active:scale-95 transition-all text-lg flex items-center justify-center gap-2">
              Login <LogInIcon :size="24" />
            </button>
          </form>
        </div>
      </main>

      <!-- Dashboard Page -->
      <main v-if="page === 'dashboard'" class="min-h-screen pt-32 px-10 max-w-7xl mx-auto">
        <h2 class="text-5xl font-black tracking-tight mb-16">Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div v-for="stat in stats" :key="stat.title" class="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-lg flex items-center gap-6">
            <div class="p-5 bg-slate-50 dark:bg-black rounded-3xl">
              <component :is="stat.icon" class="text-blue-500" />
            </div>
            <div>
              <div class="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{{ stat.title }}</div>
              <div class="text-3xl font-black">{{ stat.value }}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  Zap as ZapIcon, Sun as SunIcon, Moon as MoonIcon, LogOut as LogOutIcon, 
  Rocket as RocketIcon, ArrowRight as ArrowRightIcon, Shield as ShieldIcon,
  LogIn as LogInIcon, Activity as ActivityIcon, Boxes as BoxesIcon, Cpu as CpuIcon
} from 'lucide-vue-next';

const page = ref('home');
const isDark = ref(true);
const isAuthenticated = ref(false);
const passkey = ref('');

const stats = [
  { title: 'Throughput', value: '1.2k /s', icon: ActivityIcon },
  { title: 'Total Actions', value: '248,912', icon: BoxesIcon },
  { title: 'Node Status', value: 'Stable', icon: CpuIcon },
];

const handleLogin = async () => {
  try {
    const res = await fetch('/api/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-app-version': '1.0.0' },
      body: JSON.stringify({ type: 'auth:login', data: { passkey: passkey.value } })
    });
    if (res.status === 200) {
      isAuthenticated.value = true;
      page.value = 'dashboard';
    } else { alert('Unauthorized'); }
  } catch (e) { alert('Server error'); }
};

const logout = () => {
  isAuthenticated.value = false;
  page.value = 'home';
};
</script>
