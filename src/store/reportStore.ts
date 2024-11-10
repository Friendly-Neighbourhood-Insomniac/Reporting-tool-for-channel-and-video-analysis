import { create } from 'zustand';
import { ReportType } from '../types/reports';
import { ChannelAnalysis } from '../types/channel';

interface ReportState {
  reportType: ReportType;
  channelReport: ChannelAnalysis | null;
  videoReport: any | null;
  setChannelReport: (data: ChannelAnalysis) => void;
  setVideoReport: (data: any) => void;
  clearReport: () => void;
}

export const useReportStore = create<ReportState>((set) => ({
  reportType: null,
  channelReport: null,
  videoReport: null,
  setChannelReport: (data) => {
    console.log('Setting channel report in store:', data);
    set({ reportType: 'channel', channelReport: data });
  },
  setVideoReport: (data) => {
    console.log('Setting video report in store:', data);
    set({ reportType: 'video', videoReport: data });
  },
  clearReport: () => set({ reportType: null, channelReport: null, videoReport: null }),
}));