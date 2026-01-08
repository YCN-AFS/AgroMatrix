import React from 'react';
import { AppView } from '../types';
import { Icon } from '../components/Icon';

interface DashboardProps {
  onChangeView: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onChangeView }) => {
  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pt-8 pb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-text-main dark:text-white">LHU AgroMatrix</h1>
          <p className="text-sm font-medium text-text-muted dark:text-gray-400">Field 3 • North Zone</p>
        </div>
        <button
          aria-label="User Profile"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-surface-dark shadow-soft text-text-main dark:text-white hover:bg-gray-50 transition-colors"
        >
          <Icon name="account_circle" size={28} />
        </button>
      </header>

      {/* Weather Widget */}
      <section className="px-6 py-4">
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-surface-dark shadow-soft p-5 flex items-center justify-between group">
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 dark:bg-yellow-900/20 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
          <div className="flex flex-col z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 text-xs font-bold uppercase tracking-wider">
                Forecast
              </span>
            </div>
            <span className="text-4xl font-bold text-text-main dark:text-white mt-1">32°C</span>
            <p className="text-text-muted dark:text-gray-400 font-medium text-sm mt-1">Sunny, Clear Sky</p>
            <p className="text-secondary font-semibold text-xs mt-2 flex items-center gap-1">
              <Icon name="water_drop" size={16} filled />
              Rain expected in 2 days
            </p>
          </div>
          <div className="flex-shrink-0 z-10">
            <Icon name="sunny" size={64} className="text-yellow-500" filled />
          </div>
        </div>
      </section>

      {/* Sensor Data Title */}
      <div className="px-6 py-2 flex items-center justify-between">
        <h2 className="text-lg font-bold text-text-main dark:text-white">Live Sensors</h2>
        <div className="flex items-center gap-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="text-xs font-bold text-primary ml-1 uppercase tracking-wide">Live</span>
        </div>
      </div>

      {/* Main Sensor Grid */}
      <section className="px-6 grid grid-cols-2 gap-4">
        {/* Soil Moisture Card (Large / Featured) */}
        <div 
            onClick={() => onChangeView(AppView.ANALYTICS)}
            className="col-span-2 rounded-2xl bg-white dark:bg-surface-dark shadow-soft p-5 flex flex-row items-center gap-6 cursor-pointer active:scale-[0.98] transition-transform"
        >
          {/* Circular Gauge */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <div 
                className="w-full h-full rounded-full flex items-center justify-center transform -rotate-90"
                style={{ background: 'conic-gradient(#2ecc70 65%, #e2e8f0 0)' }}
            >
              <div className="w-[84%] h-[84%] bg-white dark:bg-surface-dark rounded-full flex items-center justify-center transform rotate-90">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-text-main dark:text-white">
                    65<span className="text-sm align-top">%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="grass" size={24} className="text-primary" />
              <h3 className="text-base font-bold text-text-main dark:text-white">Soil Moisture</h3>
            </div>
            <p className="text-sm text-text-muted dark:text-gray-400 leading-snug">
              Optimal moisture levels for current crop stage.
            </p>
          </div>
        </div>

        {/* Air Temperature Card */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark shadow-soft p-4 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-500">
              <Icon name="thermostat" size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-text-muted dark:text-gray-400">Air Temp</p>
            <p className="text-2xl font-bold text-text-main dark:text-white">28°C</p>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="rounded-2xl bg-white dark:bg-surface-dark shadow-soft p-4 flex flex-col justify-between h-36 relative overflow-hidden">
          {/* Subtle water styling */}
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-tl-3xl"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-secondary">
              <Icon name="humidity_percentage" size={24} />
            </div>
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-text-muted dark:text-gray-400">Humidity</p>
            <p className="text-2xl font-bold text-secondary">42%</p>
          </div>
        </div>
      </section>

      {/* System Status & Controls Shortcut */}
      <section className="mt-8 px-6 pb-6">
        <h2 className="text-lg font-bold text-text-main dark:text-white mb-3">System Control</h2>
        <div className="bg-white dark:bg-surface-dark rounded-2xl shadow-soft p-1">
          {/* Status Row */}
          <div className="grid grid-cols-2 gap-1 p-1">
            <div className="bg-background-light dark:bg-black/20 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center">
              <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(46,204,112,0.6)]"></div>
              <span className="text-xs font-bold text-text-muted dark:text-gray-400 uppercase tracking-wide">
                System Online
              </span>
            </div>
            <div className="bg-background-light dark:bg-black/20 rounded-xl p-3 flex flex-col items-center justify-center gap-2 text-center">
              <Icon name="mode_fan_off" size={20} className="text-gray-400" />
              <span className="text-xs font-bold text-text-muted dark:text-gray-400 uppercase tracking-wide">
                Pump Idle
              </span>
            </div>
          </div>
          {/* Main Action Button */}
          <div className="p-3">
            <button 
                onClick={() => onChangeView(AppView.CONTROLS)}
                className="w-full group relative flex items-center justify-between bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl p-1 pr-2 h-16 overflow-hidden"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <Icon name="water_pump" size={28} />
              </div>
              <span className="text-lg font-bold flex-1 text-center">Start Irrigation</span>
              <div className="h-12 w-12 rounded-lg flex items-center justify-center">
                <Icon name="arrow_forward" size={24} />
              </div>
            </button>
            <p className="text-center text-xs text-text-muted dark:text-gray-500 mt-3 font-medium">
              Manual override will run for 15 mins
            </p>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="px-6 pb-8">
        <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-soft group cursor-pointer">
          <img
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            src="https://picsum.photos/800/400?grayscale"
            alt="Field map"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <div className="flex justify-between w-full items-end text-white">
              <div>
                <p className="text-xs font-medium opacity-80 mb-0.5">Location</p>
                <p className="text-sm font-bold flex items-center gap-1">
                  <Icon name="location_on" size={16} filled />
                  Sector 4, North Field
                </p>
              </div>
              <button className="bg-white/20 backdrop-blur-md rounded-lg p-2 hover:bg-white/30 transition-colors">
                <Icon name="map" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};