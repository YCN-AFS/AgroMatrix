export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SCHEDULING = 'SCHEDULING',
  ANALYTICS = 'ANALYTICS',
  CONTROLS = 'CONTROLS'
}

export interface Schedule {
  id: string;
  time: string;
  period: 'AM' | 'PM';
  days: string;
  duration: number;
  active: boolean;
  type: 'daily' | 'weekends' | 'custom';
}

export interface ChartDataPoint {
  time: string;
  value: number;
}
