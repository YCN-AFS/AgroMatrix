import React from 'react';
import { AppView } from '../types';
import { Icon } from './Icon';

interface BottomNavProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { view: AppView.DASHBOARD, icon: 'home', label: 'Home' },
    { view: AppView.ANALYTICS, icon: 'bar_chart', label: 'Analytics' },
    { view: AppView.CONTROLS, icon: 'tune', label: 'Controls' },
    { view: AppView.SCHEDULING, icon: 'calendar_clock', label: 'Schedule' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 mx-auto w-full max-w-md bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-white/5 pb-5 pt-3 px-6 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onChangeView(item.view)}
              className="group flex flex-col items-center gap-1 w-16"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'text-text-sub hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Icon name={item.icon} size={24} />
              </div>
              <span
                className={`text-[10px] font-bold transition-colors ${
                  isActive ? 'text-primary' : 'text-text-sub group-hover:text-primary'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};