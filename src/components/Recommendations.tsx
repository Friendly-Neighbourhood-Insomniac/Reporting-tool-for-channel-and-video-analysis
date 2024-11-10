import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Recommendation } from '../types/channel';

interface Props {
  recommendations: Recommendation[];
}

export const Recommendations: React.FC<Props> = ({ recommendations }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 border border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-50 p-2 rounded-lg">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {rec.title}
              </h3>
            </div>
            <ul className="space-y-2">
              {rec.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-600">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};