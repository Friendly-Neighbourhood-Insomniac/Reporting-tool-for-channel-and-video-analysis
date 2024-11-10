import React, { useState } from 'react';
import { TabNavigation } from './components/TabNavigation';
import { FileUpload } from './components/FileUpload';
import { ChannelReport } from './components/ChannelReport';
import { ReportType } from './types/reports';
import { useReportStore } from './store/reportStore';

function App() {
  const [activeTab, setActiveTab] = useState<ReportType>('channel');
  const { channelReport, videoReport } = useReportStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="mt-8">
          {activeTab === 'channel' && !channelReport && <FileUpload />}
          {activeTab === 'channel' && channelReport && (
            <ChannelReport data={channelReport} />
          )}
          
          {activeTab === 'video' && !videoReport && <FileUpload />}
          {activeTab === 'video' && videoReport && (
            <div className="text-center py-12">
              <p className="text-gray-600">Video Analysis Report Component (Coming Soon)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;