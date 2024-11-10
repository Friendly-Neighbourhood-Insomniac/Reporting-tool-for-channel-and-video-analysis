import React from 'react';

interface GaugeProps {
  value: number;
  maxValue: number;
  benchmarkValue: number;
}

export const Gauge: React.FC<GaugeProps> = ({ value, maxValue, benchmarkValue }) => {
  const getPerformanceLevel = (value: number, benchmark: number) => {
    if (value >= benchmark * 1.2) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100', ring: 'ring-green-600' };
    if (value >= benchmark) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-100', ring: 'ring-blue-600' };
    if (value >= benchmark * 0.8) return { label: 'Needs Improvement', color: 'text-yellow-600', bg: 'bg-yellow-100', ring: 'ring-yellow-600' };
    return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-100', ring: 'ring-red-600' };
  };

  const performance = getPerformanceLevel(value, benchmarkValue);
  const percentage = (value / maxValue) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Main circular display */}
      <div className={`
        relative w-48 h-48 rounded-full 
        ${performance.bg} 
        ring-8 ${performance.ring} 
        flex items-center justify-center
        transition-all duration-500 ease-in-out
      `}>
        <div className="text-center">
          <div className="text-4xl font-bold mb-1">{value.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Engagement Rate</div>
          <div className={`text-sm font-medium mt-1 ${performance.color}`}>
            {performance.label}
          </div>
        </div>
      </div>

      {/* Comparison bar */}
      <div className="w-full max-w-xs mt-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Your Rate</span>
          <span>Industry Average</span>
        </div>
        <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
          {/* Industry benchmark line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-green-500 transition-all duration-500"
            style={{ left: `${(benchmarkValue / maxValue) * 100}%` }}
          />
          {/* Value bar */}
          <div 
            className={`h-full transition-all duration-500 ${
              value >= benchmarkValue ? 'bg-blue-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className={value >= benchmarkValue ? 'text-blue-600' : 'text-yellow-600'}>
            {value.toFixed(1)}%
          </span>
          <span className="text-green-600">{benchmarkValue.toFixed(1)}%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${value >= benchmarkValue ? 'bg-blue-500' : 'bg-yellow-500'}`} />
          <span>Your Rate</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Industry Average</span>
        </div>
      </div>
    </div>
  );
};