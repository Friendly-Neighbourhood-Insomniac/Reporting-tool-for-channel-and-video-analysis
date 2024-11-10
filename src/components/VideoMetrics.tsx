import React from 'react';
import { VideoReport } from '../types/reports';

export const VideoMetrics: React.FC<{ report: VideoReport }> = ({ report }) => (
  <>
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-lg">{report.title}</h3>
      <p className="text-gray-600 mt-2">{report.description}</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-600">Views</p>
        <p className="text-2xl font-bold">{report.viewCount.toLocaleString()}</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-600">Likes</p>
        <p className="text-2xl font-bold">{report.likeCount.toLocaleString()}</p>
      </div>
    </div>
  </>
);