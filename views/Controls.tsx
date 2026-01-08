import React, { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';

export const Controls: React.FC = () => {
  const [mode, setMode] = useState<'auto' | 'manual'>('manual');
  const [devices, setDevices] = useState({
    pump: false,
    mist: true,
    lights: false
  });

  // Manual Irrigation State
  const [manualDuration, setManualDuration] = useState(15);
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isIrrigating && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsIrrigating(false);
            setDevices(prev => ({ ...prev, pump: false }));
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isIrrigating, timeLeft]);

  const toggleDevice = (key: keyof typeof devices) => {
    setDevices(prev => {
      const newState = !prev[key];
      // If toggling pump off manually while irrigating, stop the timer
      if (key === 'pump' && !newState && isIrrigating) {
        setIsIrrigating(false);
        setTimeLeft(0);
      }
      return { ...prev, [key]: newState };
    });
  };

  const startIrrigation = () => {
    setIsIrrigating(true);
    setTimeLeft(manualDuration * 60);
    setDevices(prev => ({ ...prev, pump: true }));
  };

  const stopIrrigation = () => {
    setIsIrrigating(false);
    setTimeLeft(0);
    setDevices(prev => ({ ...prev, pump: false }));
  };

  const emergencyStop = () => {
    setDevices({
      pump: false,
      mist: false,
      lights: false
    });
    setIsIrrigating(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col w-full h-full pb-24 overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex flex-col">
            <h2 className="text-[#0f1a14] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">LHU AgroMatrix</h2>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Control Center</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 rounded-full">
            <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shadow-glow"></div>
            <span className="text-xs font-bold text-primary tracking-wide uppercase">Online</span>
          </div>
        </div>
      </div>

      {/* Sensor Snapshot */}
      <div className="flex flex-col gap-4 p-4">
        <h3 className="sr-only">Sensor Readings</h3>
        <div className="flex gap-4">
          {/* Moisture Card */}
          <div className="flex flex-1 flex-col justify-between gap-3 rounded-lg p-5 bg-white dark:bg-surface-dark shadow-soft border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-secondary">
              <Icon name="water_drop" size={28} />
              <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold">Soil Moisture</p>
            </div>
            <div>
              <p className="text-[#0f1a14] dark:text-white tracking-tight text-3xl font-bold">65%</p>
              <p className="text-gray-400 text-xs mt-1">Optimal Range</p>
            </div>
          </div>
          {/* Temp Card */}
          <div className="flex flex-1 flex-col justify-between gap-3 rounded-lg p-5 bg-white dark:bg-surface-dark shadow-soft border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-orange-400">
              <Icon name="thermostat" size={28} />
              <p className="text-gray-600 dark:text-gray-300 text-sm font-semibold">Temperature</p>
            </div>
            <div>
              <p className="text-[#0f1a14] dark:text-white tracking-tight text-3xl font-bold">24°C</p>
              <p className="text-gray-400 text-xs mt-1">Stable</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Mode */}
      <div className="flex flex-col px-4 pt-2 pb-4">
        <h3 className="text-[#0f1a14] dark:text-white text-lg font-bold mb-3 pl-1">System Mode</h3>
        <div className="bg-gray-200 dark:bg-gray-800 p-1.5 rounded-lg flex relative">
          <button 
            onClick={() => setMode('auto')}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg transition-all duration-200 ease-in-out ${
                mode === 'auto' 
                ? 'bg-white dark:bg-surface-dark shadow-sm text-primary' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <Icon name="smart_toy" size={20} />
            <span className="font-bold text-sm">Auto Mode</span>
          </button>
          <button 
            onClick={() => setMode('manual')}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg transition-all duration-200 ease-in-out ${
                mode === 'manual' 
                ? 'bg-white dark:bg-surface-dark shadow-sm text-primary' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-300/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <Icon name="tune" size={20} />
            <span className="font-bold text-sm">Manual Mode</span>
          </button>
        </div>
      </div>

      {/* Manual Irrigation Section */}
      <div className="flex flex-col px-4 pb-6 pt-2">
        <div className="flex items-center justify-between mb-3 pl-1">
          <h3 className="text-[#0f1a14] dark:text-white text-lg font-bold">Manual Irrigation</h3>
          {isIrrigating && <span className="text-xs font-bold text-primary animate-pulse bg-primary/10 px-2 py-1 rounded">Running</span>}
        </div>
        
        <div className="bg-white dark:bg-surface-dark rounded-xl shadow-soft p-5 border border-gray-100 dark:border-gray-800">
          {!isIrrigating ? (
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-end">
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400">Set Duration</label>
                  <span className="text-3xl font-bold text-text-main dark:text-white tabular-nums">{manualDuration}<span className="text-lg text-gray-400 font-medium ml-1">min</span></span>
              </div>
              
              <div className="flex items-center gap-4 bg-background-light dark:bg-black/20 p-2 rounded-xl">
                <button 
                  onClick={() => setManualDuration(prev => Math.max(1, prev - 5))}
                  className="size-12 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 active:scale-95 transition-all text-text-main dark:text-white"
                >
                  <Icon name="remove" size={24} />
                </button>
                <input 
                  type="range" 
                  min="1" 
                  max="120" 
                  step="1"
                  value={manualDuration}
                  onChange={(e) => setManualDuration(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <button 
                  onClick={() => setManualDuration(prev => Math.min(120, prev + 5))}
                  className="size-12 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark shadow-sm hover:bg-gray-50 dark:hover:bg-white/5 active:scale-95 transition-all text-text-main dark:text-white"
                >
                  <Icon name="add" size={24} />
                </button>
              </div>

              <button 
                onClick={startIrrigation}
                className="w-full h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-green-500"
              >
                <Icon name="water_drop" size={24} filled />
                Start Now
              </button>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-6">
              <div className="relative size-28 shrink-0">
                <svg className="size-full -rotate-90 transform">
                  <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="none" className="text-gray-100 dark:text-gray-800" />
                  <circle 
                    cx="56" 
                    cy="56" 
                    r="50" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="none" 
                    className="text-primary transition-all duration-1000 ease-linear" 
                    strokeDasharray={314} 
                    strokeDashoffset={314 - (314 * timeLeft / (manualDuration * 60))} 
                    strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <Icon name="water_drop" size={32} className="text-primary animate-pulse" filled />
                </div>
              </div>
              
              <div className="flex flex-col flex-1 gap-3">
                <div>
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Time Remaining</span>
                  <div className="text-4xl font-mono font-bold text-text-main dark:text-white tabular-nums leading-none mt-1">
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <button 
                  onClick={stopIrrigation}
                  className="w-full py-3 bg-red-50 dark:bg-red-900/20 text-danger rounded-xl font-bold text-base border border-danger/20 hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="stop_circle" size={20} />
                  Stop Override
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Device Controls */}
      <div className="flex flex-col px-4 pb-6">
        <div className="flex items-center justify-between mb-3 pl-1">
          <h3 className="text-[#0f1a14] dark:text-white text-lg font-bold">Device Control</h3>
          {mode === 'manual' && <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">Manual Active</span>}
        </div>
        
        <div className="flex flex-col gap-4">
          {/* Main Pump */}
          <div className="group flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-lg shadow-soft border border-gray-100 dark:border-gray-800 transition-transform active:scale-[0.99]">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${devices.pump ? 'bg-primary/20 text-primary' : 'bg-blue-50 dark:bg-blue-900/20 text-secondary'}`}>
                <Icon name="water_pump" size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#0f1a14] dark:text-white">Main Pump</span>
                <span className="text-xs font-medium text-gray-500">
                  {isIrrigating ? 'Running (Manual Override)' : 'Irrigation Line A'}
                </span>
              </div>
            </div>
            {/* Toggle */}
            <div 
                onClick={() => toggleDevice('pump')}
                className={`w-14 h-8 rounded-full cursor-pointer relative transition-colors ${devices.pump ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
                <div className={`absolute top-[2px] left-[2px] h-7 w-7 rounded-full bg-white shadow-sm transition-all transform ${devices.pump ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Mist System */}
          <div className="group flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-lg shadow-soft border border-gray-100 dark:border-gray-800 transition-transform active:scale-[0.99]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 dark:bg-cyan-900/20 text-cyan-500">
                <Icon name="air" size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#0f1a14] dark:text-white">Mist System</span>
                <span className="text-xs font-medium text-gray-500">Humidity Control</span>
              </div>
            </div>
            {/* Toggle */}
            <div 
                onClick={() => toggleDevice('mist')}
                className={`w-14 h-8 rounded-full cursor-pointer relative transition-colors ${devices.mist ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
                <div className={`absolute top-[2px] left-[2px] h-7 w-7 rounded-full bg-white shadow-sm transition-all transform ${devices.mist ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>

          {/* Grow Lights */}
          <div className="group flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-lg shadow-soft border border-gray-100 dark:border-gray-800 transition-transform active:scale-[0.99]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500">
                <Icon name="lightbulb" size={28} filled />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#0f1a14] dark:text-white">Grow Lights</span>
                <span className="text-xs font-medium text-gray-500">Zone 1 & 2</span>
              </div>
            </div>
            {/* Toggle */}
            <div 
                onClick={() => toggleDevice('lights')}
                className={`w-14 h-8 rounded-full cursor-pointer relative transition-colors ${devices.lights ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
                <div className={`absolute top-[2px] left-[2px] h-7 w-7 rounded-full bg-white shadow-sm transition-all transform ${devices.lights ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Stop */}
      <div className="mt-auto px-4 pb-8 pt-4">
        <button 
          onClick={emergencyStop}
          className="group w-full relative overflow-hidden bg-danger hover:bg-red-600 active:bg-red-700 text-white rounded-lg p-5 shadow-lg shadow-red-200 dark:shadow-none transition-all duration-200 active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-center gap-3">
            <Icon name="gpp_maybe" size={32} className="animate-pulse" />
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold tracking-wide uppercase">Emergency Stop</span>
              <span className="text-xs font-medium text-red-100 opacity-90">Halt all system operations immediately</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};