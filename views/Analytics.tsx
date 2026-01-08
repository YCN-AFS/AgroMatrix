import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icon } from '../components/Icon';

interface AnalyticsProps {
  onBack: () => void;
}

const data = [
  { time: '00:00', moisture: 45, temp: 18 },
  { time: '03:00', moisture: 55, temp: 19 },
  { time: '06:00', moisture: 60, temp: 22 },
  { time: '09:00', moisture: 68, temp: 26 },
  { time: '12:00', moisture: 58, temp: 28 },
  { time: '15:00', moisture: 65, temp: 27 },
  { time: '18:00', moisture: 75, temp: 24 },
  { time: '21:00', moisture: 60, temp: 22 },
];

export const Analytics: React.FC<AnalyticsProps> = ({ onBack }) => {
  const [timeRange, setTimeRange] = useState<'24h' | '7d'>('24h');

  return (
    <div className="flex flex-col w-full h-full pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-4 pb-2 transition-colors">
        <button 
            onClick={onBack}
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface-light dark:bg-surface-dark shadow-soft active:scale-95 transition-transform text-text-main"
        >
          <Icon name="arrow_back" size={28} />
        </button>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-text-main flex-1 text-center pr-12">Field A - Analytics</h1>
      </header>

      <main className="flex-1 flex flex-col gap-6 p-4">
        {/* Segmented Control */}
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-[#e9f2ec] dark:bg-surface-dark/50 p-1">
          <button 
            onClick={() => setTimeRange('24h')}
            className={`flex-1 h-full rounded-lg text-sm font-semibold transition-all ${
                timeRange === '24h' 
                ? 'bg-white dark:bg-surface-dark shadow-sm text-primary' 
                : 'text-text-sub hover:text-text-main'
            }`}
          >
            Last 24 Hours
          </button>
          <button 
            onClick={() => setTimeRange('7d')}
            className={`flex-1 h-full rounded-lg text-sm font-semibold transition-all ${
                timeRange === '7d' 
                ? 'bg-white dark:bg-surface-dark shadow-sm text-primary' 
                : 'text-text-sub hover:text-text-main'
            }`}
          >
            Last 7 Days
          </button>
        </div>

        {/* Soil Moisture Chart */}
        <section className="flex flex-col gap-4 rounded-xl bg-surface-light dark:bg-surface-dark p-5 shadow-card border border-primary/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name="water_drop" size={24} filled />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-main dark:text-white">Soil Moisture</h2>
                <p className="text-sm font-medium text-text-sub">Current: <span className="text-primary font-bold">Optimal (68%)</span></p>
              </div>
            </div>
            <button className="p-2 text-text-sub hover:bg-background-light rounded-full">
              <Icon name="more_horiz" size={24} />
            </button>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ecc70" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2ecc70" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#aaa'}} dy={10} />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#2ecc70', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="moisture" stroke="#2ecc70" strokeWidth={3} fillOpacity={1} fill="url(#colorMoisture)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Temperature Chart */}
        <section className="flex flex-col gap-4 rounded-xl bg-surface-light dark:bg-surface-dark p-5 shadow-card border border-secondary/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Icon name="thermostat" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-main dark:text-white">Temperature</h2>
                <p className="text-sm font-medium text-text-sub">Current: <span className="text-secondary font-bold">24°C</span></p>
              </div>
            </div>
            <button className="p-2 text-text-sub hover:bg-background-light rounded-full">
              <Icon name="more_horiz" size={24} />
            </button>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3498DB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3498DB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#aaa'}} dy={10} />
                <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                     itemStyle={{ color: '#3498DB', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="temp" stroke="#3498DB" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="flex flex-col gap-3">
          <h3 className="text-base font-bold text-text-main dark:text-white px-1">Recent Activity</h3>
          <div className="flex items-center gap-4 rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm border border-transparent hover:border-primary/20 transition-colors">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Icon name="water_pump" size={24} />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-base font-bold text-text-main dark:text-white">Irrigation Pump Activated</span>
              <span className="text-xs font-medium text-text-sub">Automated • 15 mins ago</span>
            </div>
            <span className="text-sm font-bold text-text-main dark:text-white">06:00 AM</span>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-surface-light dark:bg-surface-dark p-4 shadow-sm border border-transparent hover:border-primary/20 transition-colors">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
              <Icon name="warning" size={24} filled />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-base font-bold text-text-main dark:text-white">Moisture Low Alert</span>
              <span className="text-xs font-medium text-text-sub">Sensor B-2 • Yesterday</span>
            </div>
            <span className="text-sm font-bold text-text-main dark:text-white">04:30 PM</span>
          </div>
        </section>
      </main>
    </div>
  );
};