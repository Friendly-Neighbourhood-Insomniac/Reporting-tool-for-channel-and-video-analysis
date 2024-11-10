import React from 'react';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { ChannelAnalysis } from '../types/channel';

interface Props {
  metrics: ChannelAnalysis['metrics'];
}

export const ChannelMetricsChart: React.FC<Props> = ({ metrics }) => {
  const engagementPercentage = metrics.engagementRate * 100;
  const industryAverage = 4.5;

  const getPerformanceColor = (value: number, benchmark: number) => {
    if (value >= benchmark * 1.2) return 'text-green-600';
    if (value >= benchmark) return 'text-blue-600';
    if (value >= benchmark * 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600';
      case 'B': return 'text-blue-600';
      case 'C': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Channel Performance Overview</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Engagement Rate Card */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Engagement Rate</span>
              </div>
              <span className={`text-sm font-medium ${getPerformanceColor(engagementPercentage, industryAverage)}`}>
                {engagementPercentage >= industryAverage ? 'Above Average' : 'Below Average'}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-3xl font-bold text-gray-900">
                  {engagementPercentage.toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500">
                  Industry Avg: {industryAverage}%
                </span>
              </div>
              
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                {/* Industry benchmark line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
                  style={{ left: `${(industryAverage / 10) * 100}%` }}
                />
                {/* Value bar */}
                <div 
                  className={`h-full transition-all duration-500 ${
                    engagementPercentage >= industryAverage ? 'bg-blue-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.min((engagementPercentage / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Growth Metrics Card */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">Growth Metrics</span>
              </div>
              <span className={`text-sm font-medium ${getGradeColor(metrics.subscriberGrowth)}`}>
                Grade {metrics.subscriberGrowth}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Views</span>
                <span className="font-medium text-gray-900">
                  {Math.round(metrics.averageViews).toLocaleString()}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Content Output</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  metrics.contentOutput.toLowerCase() === 'high' 
                    ? 'bg-green-100 text-green-700'
                    : metrics.contentOutput.toLowerCase() === 'medium'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {metrics.contentOutput}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Growth Trend</span>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getGradeColor(metrics.subscriberGrowth)}`} />
                  <span className="font-medium text-gray-900">
                    {metrics.subscriberGrowth === 'A' ? 'Strong' : 
                     metrics.subscriberGrowth === 'B' ? 'Good' :
                     metrics.subscriberGrowth === 'C' ? 'Moderate' : 'Needs Work'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};