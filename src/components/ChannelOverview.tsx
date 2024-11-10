import React from 'react';
import { Users, Eye, Video, Calendar, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { ChannelAnalysis } from '../types/channel';

interface Props {
  data: ChannelAnalysis;
}

export const ChannelOverview: React.FC<Props> = ({ data }) => {
  const metrics = [
    {
      label: 'Subscribers',
      value: data.subscriberCount.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Views',
      value: data.viewCount.toLocaleString(),
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Videos',
      value: data.videoCount.toLocaleString(),
      icon: Video,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Avg. Views',
      value: Math.round(data.metrics.averageViews).toLocaleString(),
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={data.thumbnail}
          alt={data.title}
          className="w-16 h-16 rounded-full"
          crossOrigin="anonymous"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
          <p className="text-sm text-gray-500">
            Joined {format(new Date(data.publishedAt), 'MMMM yyyy')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`${metric.bgColor} rounded-lg p-4 flex items-center space-x-3`}
          >
            <metric.icon className={`w-8 h-8 ${metric.color}`} />
            <div>
              <p className="text-sm text-gray-600">{metric.label}</p>
              <p className="text-xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h2 className="text-lg font-semibold mb-2">Channel Description</h2>
        <p className="text-gray-600 whitespace-pre-line">{data.description}</p>
      </div>
    </div>
  );
};