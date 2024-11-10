import React from 'react';
import { TrendingUp, ThumbsUp, MessageCircle } from 'lucide-react';
import { TopVideo } from '../types/channel';

interface Props {
  topVideos: {
    mostViewed: TopVideo;
    mostLiked: TopVideo;
    mostEngaging: TopVideo;
  } | null;
}

export const TopVideoMetricsTable: React.FC<Props> = ({ topVideos }) => {
  if (!topVideos?.mostViewed || !topVideos?.mostLiked || !topVideos?.mostEngaging) {
    return null;
  }

  const calculateEngagementScore = (video: TopVideo) => {
    const views = parseInt(video.statistics.viewCount);
    const likes = parseInt(video.statistics.likeCount);
    const comments = parseInt(video.statistics.commentCount);
    
    const likeRate = (likes / views) * 100;
    const commentRate = (comments / views) * 100;
    
    return ((likeRate * 0.7) + (commentRate * 0.3)) * 10;
  };

  const calculateViralityScore = (video: TopVideo) => {
    const views = parseInt(video.statistics.viewCount);
    const likes = parseInt(video.statistics.likeCount);
    const comments = parseInt(video.statistics.commentCount);
    
    const totalEngagements = likes + comments;
    const engagementRate = (totalEngagements / views) * 100;
    
    return Math.min(100, engagementRate * 20);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatNumber = (num: string) => parseInt(num).toLocaleString();

  const videos = [
    { label: 'Most Viewed', data: topVideos.mostViewed },
    { label: 'Most Liked', data: topVideos.mostLiked },
    { label: 'Most Engaging', data: topVideos.mostEngaging },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden print:overflow-visible">
      <div className="px-8 py-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Top Videos Performance Analysis</h3>
      </div>
      <div className="overflow-x-auto print:overflow-visible">
        <table className="w-full divide-y divide-gray-200">
          <colgroup>
            <col className="w-[40%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
          </colgroup>
          <thead>
            <tr className="bg-gray-50">
              <th className="px-8 py-6 text-left text-sm font-semibold text-gray-900">Video Title</th>
              <th className="px-6 py-6 text-left text-sm font-semibold text-gray-900">Views</th>
              <th className="px-6 py-6 text-left text-sm font-semibold text-gray-900">Likes</th>
              <th className="px-6 py-6 text-left text-sm font-semibold text-gray-900">Comments</th>
              <th className="px-6 py-6 text-left text-sm font-semibold text-gray-900">Engagement</th>
              <th className="px-6 py-6 text-left text-sm font-semibold text-gray-900">Virality</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {videos.map(({ label, data }) => {
              const engagementScore = calculateEngagementScore(data);
              const viralityScore = calculateViralityScore(data);

              return (
                <tr key={label} className="hover:bg-gray-50">
                  <td className="px-8 py-8">
                    <div className="max-w-full space-y-4">
                      <div className="text-base font-medium text-gray-900 line-clamp-2 leading-relaxed">
                        {data.snippet.title}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">{label}</div>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center text-base text-gray-900">
                      <TrendingUp className="w-5 h-5 mr-2 text-gray-400 print:hidden" />
                      <span className="font-medium">{formatNumber(data.statistics.viewCount)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center text-base text-gray-900">
                      <ThumbsUp className="w-5 h-5 mr-2 text-gray-400 print:hidden" />
                      <span className="font-medium">{formatNumber(data.statistics.likeCount)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className="flex items-center text-base text-gray-900">
                      <MessageCircle className="w-5 h-5 mr-2 text-gray-400 print:hidden" />
                      <span className="font-medium">{formatNumber(data.statistics.commentCount)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className={`text-base font-medium ${getScoreColor(engagementScore)} mb-3`}>
                      {engagementScore.toFixed(1)}
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${getScoreColor(engagementScore).replace('text-', 'bg-')}`}
                        style={{ width: `${engagementScore}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-8">
                    <div className={`text-base font-medium ${getScoreColor(viralityScore)} mb-3`}>
                      {viralityScore.toFixed(1)}
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${getScoreColor(viralityScore).replace('text-', 'bg-')}`}
                        style={{ width: `${viralityScore}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};