import React from 'react';
import { VideoReport } from '../types/reports';

export const VideoAnalysisScores: React.FC<{ analysis: VideoReport['analysis'] }> = ({ analysis }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-3">Analysis Scores</h3>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(analysis)
        .filter(([key, value]) => key.endsWith('Score') && typeof value === 'number')
        .map(([key, value]) => (
          <div key={key} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {key.replace('Score', '').split(/(?=[A-Z])/).join(' ').toUpperCase()}
            </p>
            <p className="text-xl font-bold">{(value as number).toFixed(1)}/10</p>
          </div>
        ))}
    </div>
  </div>
);