import React, { useState } from 'react';
import { AppView, Schedule } from '../types';
import { Icon } from '../components/Icon';

interface SchedulingProps {
  onBack: () => void;
}

export const Scheduling: React.FC<SchedulingProps> = ({ onBack }) => {
  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(30);
  const [duration, setDuration] = useState(45);
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Wed', 'Fri']);
  const [period, setPeriod] = useState<'AM'|'PM'>('AM');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const schedules: Schedule[] = [
    { id: '1', time: '06:00', period: 'AM', days: 'Daily', duration: 30, active: true, type: 'daily' },
    { id: '2', time: '08:00', period: 'PM', days: 'M, W, F', duration: 15, active: false, type: 'custom' },
    { id: '3', time: '05:30', period: 'AM', days: 'Weekends', duration: 60, active: true, type: 'weekends' },
  ];

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 justify-between border-b border-gray-100 dark:border-white/5">
        <button 
            onClick={onBack}
            className="text-text-main dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 transition-all"
        >
          <Icon name="arrow_back_ios_new" size={24} />
        </button>
        <h2 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Smart Scheduling
        </h2>
      </div>

      <div className="flex-1 flex flex-col gap-6 p-4 pb-24 overflow-y-auto no-scrollbar">
        {/* New Schedule Card */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-5 shadow-soft border border-gray-100 dark:border-white/5 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-text-main dark:text-white text-lg font-bold tracking-tight">New Schedule</h3>
            <span className="bg-[#3498DB]/10 text-[#3498DB] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Icon name="water_drop" size={16} filled /> Irrigation
            </span>
          </div>

          {/* Time Picker */}
          <div>
            <label className="text-text-muted dark:text-gray-400 text-sm font-medium mb-3 block">Start Time</label>
            <div className="flex gap-3">
              <div className="flex grow basis-0 flex-col gap-2">
                <div 
                    onClick={() => setHour(h => h === 12 ? 1 : h + 1)}
                    className="flex h-16 grow items-center justify-center rounded-xl bg-background-light dark:bg-black/20 border-2 border-transparent hover:border-primary/50 transition-colors cursor-pointer group"
                >
                  <p className="text-text-main dark:text-white text-3xl font-bold leading-tight group-hover:text-primary">
                    {hour.toString().padStart(2, '0')}
                  </p>
                </div>
                <p className="text-center text-xs text-text-muted font-medium">Hour</p>
              </div>
              <div className="flex items-center justify-center h-16">
                <span className="text-2xl font-bold text-gray-300">:</span>
              </div>
              <div className="flex grow basis-0 flex-col gap-2">
                <div 
                    onClick={() => setMinute(m => m === 59 ? 0 : m + 1)}
                    className="flex h-16 grow items-center justify-center rounded-xl bg-background-light dark:bg-black/20 border-2 border-transparent hover:border-primary/50 transition-colors cursor-pointer group"
                >
                  <p className="text-text-main dark:text-white text-3xl font-bold leading-tight group-hover:text-primary">
                    {minute.toString().padStart(2, '0')}
                  </p>
                </div>
                <p className="text-center text-xs text-text-muted font-medium">Minute</p>
              </div>
              <div className="flex grow basis-0 flex-col gap-2">
                <div 
                    onClick={() => setPeriod(p => p === 'AM' ? 'PM' : 'AM')}
                    className="flex h-16 grow items-center justify-center rounded-xl bg-primary/10 border-2 border-primary cursor-pointer active:scale-95 transition-transform"
                >
                  <p className="text-primary text-xl font-bold leading-tight">{period}</p>
                </div>
                <p className="text-center text-xs text-text-muted font-medium">Format</p>
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-text-muted dark:text-gray-400 text-sm font-medium mb-3 block">Duration (minutes)</label>
            <div className="flex items-center gap-4 bg-background-light dark:bg-black/20 rounded-xl p-2">
              <button 
                onClick={() => setDuration(d => Math.max(5, d - 5))}
                className="size-12 flex items-center justify-center rounded-lg bg-white dark:bg-surface-dark shadow-sm text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 active:scale-95 transition-all"
              >
                <Icon name="remove" size={24} />
              </button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-text-main dark:text-white">{duration}</span>
                <span className="text-sm text-text-muted ml-1">min</span>
              </div>
              <button 
                onClick={() => setDuration(d => d + 5)}
                className="size-12 flex items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 active:scale-95 transition-all"
              >
                <Icon name="add" size={24} />
              </button>
            </div>
          </div>

          {/* Repeat */}
          <div>
            <label className="text-text-muted dark:text-gray-400 text-sm font-medium mb-3 block">Repeat</label>
            <div className="flex justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
              {days.map((day) => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button 
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`flex flex-col items-center gap-1 min-w-[40px] transition-all ${isSelected ? '' : 'opacity-60 hover:opacity-100'}`}
                    >
                        <div className={`size-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                            isSelected 
                                ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105 ring-2 ring-primary ring-offset-2 ring-offset-white dark:ring-offset-surface-dark' 
                                : 'bg-gray-100 dark:bg-white/5 text-text-main dark:text-white'
                        }`}>
                            {day.charAt(0)}
                        </div>
                        {isSelected && <span className="text-[10px] font-bold text-primary">{day}</span>}
                    </button>
                  )
              })}
            </div>
          </div>

          <button className="mt-2 w-full bg-primary hover:bg-green-500 text-white font-bold text-lg h-14 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Icon name="save" size={24} />
            Save Schedule
          </button>
        </div>

        {/* List Section */}
        <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-text-main dark:text-white text-lg font-bold">Your Schedules</h3>
                <button className="text-[#3498DB] text-sm font-semibold">View All</button>
            </div>

            {schedules.map((schedule) => (
                <div 
                    key={schedule.id}
                    className={`bg-surface-light dark:bg-surface-dark rounded-xl p-4 shadow-soft border border-gray-100 dark:border-white/5 flex items-center justify-between group ${!schedule.active && 'opacity-80'}`}
                >
                    <div className="flex flex-col gap-1">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-text-main dark:text-white">{schedule.time}</span>
                            <span className="text-sm font-semibold text-text-muted">{schedule.period}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-text-muted">
                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${schedule.active ? 'bg-green-50 dark:bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-white/5'}`}>
                                <Icon name={schedule.type === 'custom' ? 'calendar_month' : 'repeat'} size={14} /> 
                                {schedule.days}
                            </span>
                            <span className="flex items-center gap-1">
                                <Icon name="timelapse" size={14} className="text-[#3498DB]" /> 
                                {schedule.duration} min
                            </span>
                        </div>
                    </div>
                    {/* Switch */}
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={schedule.active} readOnly />
                        <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                    </label>
                </div>
            ))}
        </div>
      </div>
      
      {/* Abstract Backgrounds */}
      <div className="fixed top-20 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 -left-10 w-80 h-80 bg-[#3498DB]/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
    </div>
  );
};