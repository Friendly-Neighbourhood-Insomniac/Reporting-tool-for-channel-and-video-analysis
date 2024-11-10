import React from 'react';
import { X } from 'lucide-react';
import { useReportStore } from '../store/reportStore';
import { ChannelMetrics } from './ChannelMetrics';
import { ChannelRecommendations } from './ChannelRecommendations';
import { VideoMetrics } from './VideoMetrics';
import { VideoAnalysisScores } from './VideoAnalysisScores';

export const ReportDisplay: React.FC = () => {
  const { reportType, channelReport, videoReport, clearReport } = useReportStore();

  if (!reportType) return null;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {reportType === 'channel' ? 'Channel Analysis' : 'Video Analysis'}
        </h2>
        <button
          onClick={clearReport}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close report"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        {reportType === 'channel' && channelReport && (
          <>
            <ChannelMetrics report={channelReport} />
            <ChannelRecommendations recommendations={channelReport.recommendations || []} />
          </>
        )}

        {reportType === 'video' && videoReport && (
          <>
            <VideoMetrics report={videoReport} />
            <VideoAnalysisScores analysis={videoReport.analysis} />
          </>
        )}
      </div>
    </div>
  );
};