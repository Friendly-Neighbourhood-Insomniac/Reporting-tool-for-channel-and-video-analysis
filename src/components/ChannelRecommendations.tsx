import React from 'react';
import { Recommendation } from '../types/reports';

export const ChannelRecommendations: React.FC<{ recommendations: Recommendation[] }> = ({ recommendations }) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
    <div className="space-y-2">
      {recommendations?.map((rec, index) => {
        if (!rec?.priority) return null;
        
        const priorityColor = {
          high: 'bg-red-100 text-red-700',
          medium: 'bg-yellow-100 text-yellow-700',
          low: 'bg-green-100 text-green-700'
        }[rec.priority] || 'bg-gray-100 text-gray-700';

        return (
          <div
            key={index}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <p className="font-medium text-gray-900">{rec.title}</p>
            <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
            <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${priorityColor}`}>
              {rec.priority.toUpperCase()} Priority
            </span>
          </div>
        );
      })}
    </div>
  </div>
);