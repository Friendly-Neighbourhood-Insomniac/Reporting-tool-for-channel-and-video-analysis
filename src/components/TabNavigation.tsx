import React from 'react';
import { BarChart2, Video } from 'lucide-react';
import { ReportType } from '../types/reports';

interface Props {
  activeTab: ReportType;
  onTabChange: (tab: ReportType) => void;
}

export const TabNavigation: React.FC<Props> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'channel' as const, label: 'Channel Analysis', icon: BarChart2 },
    { id: 'video' as const, label: 'Video Analysis', icon: Video },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Report Types">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`
              py-4 px-1 inline-flex items-center gap-2 border-b-2 font-medium text-sm
              ${activeTab === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            <Icon className="w-5 h-5" />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};