import React from 'react';
import { Lightbulb, AlertTriangle } from 'lucide-react';
import { ChannelAnalysis } from '../types/channel';

interface EnhancedRecommendationsProps {
  data: ChannelAnalysis;
}

export const EnhancedRecommendations: React.FC<EnhancedRecommendationsProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Recommendations */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-amber-50 p-2 rounded-lg">
            <Lightbulb className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold">Channel Recommendations</h3>
        </div>
        
        <div className="space-y-6">
          {data.recommendations.map((recommendation, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                <div className="flex space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Urgency: </span>
                    <span className="font-medium text-red-600">85/100</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-500">Impact: </span>
                    <span className="font-medium text-green-600">92/100</span>
                  </div>
                </div>
              </div>
              
              <ul className="space-y-3">
                {recommendation.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};