import React, { useState, useEffect } from 'react';
import { Play, ThumbsUp, MessageCircle, Image as ImageIcon } from 'lucide-react';
import { TopVideo } from '../types/channel';

interface Props {
  mostViewed: TopVideo;
  mostLiked: TopVideo;
  mostEngaging: TopVideo;
}

export const TopVideos: React.FC<Props> = ({
  mostViewed,
  mostLiked,
  mostEngaging,
}) => {
  const formatNumber = (num: string) => parseInt(num).toLocaleString();

  const VideoCard = ({ video, label }: { video: TopVideo; label: string }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const thumbnailUrl = video.snippet.thumbnails.medium?.url;

    useEffect(() => {
      if (thumbnailUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = thumbnailUrl;
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageError(true);
      }
    }, [thumbnailUrl]);

    return (
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="relative pb-[56.25%] bg-gray-100">
          {!imageError && imageLoaded && thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={video.snippet.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <div className="p-4">
          <span className="text-sm font-medium text-blue-600 mb-2 block">
            {label}
          </span>
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
            {video.snippet.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Play className="w-4 h-4 mr-1" />
              {formatNumber(video.statistics.viewCount)}
            </div>
            <div className="flex items-center">
              <ThumbsUp className="w-4 h-4 mr-1" />
              {formatNumber(video.statistics.likeCount)}
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {formatNumber(video.statistics.commentCount)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Top Performing Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <VideoCard video={mostViewed} label="Most Viewed" />
        <VideoCard video={mostLiked} label="Most Liked" />
        <VideoCard video={mostEngaging} label="Most Engaging" />
      </div>
    </div>
  );
};