import React from 'react';
import { ChannelReport } from '../types/reports';

export const ChannelMetrics: React.FC<{ report: ChannelReport }> = ({ report }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-blue-50 p-4 rounded-lg">
      <p className="text-sm text-blue-600">Subscribers</p>
      <p className="text-2xl font-bold">{report.subscriberCount.toLocaleString()}</p>
    </div>
    <div className="bg-green-50 p-4 rounded-lg">
      <p className="text-sm text-green-600">Total Views</p>
      <p className="text-2xl font-bold">{report.viewCount.toLocaleString()}</p>
    </div>
  </div>
);