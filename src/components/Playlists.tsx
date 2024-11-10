import React, { useState } from 'react';
import { ListVideo, Image as ImageIcon } from 'lucide-react';
import { Playlist } from '../types/channel';

interface Props {
  playlists: Playlist[];
}

export const Playlists: React.FC<Props> = ({ playlists }) => {
  const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
    const [imageError, setImageError] = useState(false);
    const thumbnailUrl = playlist.snippet.thumbnails.medium?.url;

    return (
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="relative pb-[56.25%] bg-gray-100">
          {!imageError && thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={playlist.snippet.title}
              className="absolute top-0 left-0 w-full h-full object-cover"
              onError={() => setImageError(true)}
              loading="lazy"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-2">
            <ListVideo className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 line-clamp-1">
              {playlist.snippet.title}
            </h3>
          </div>
          {playlist.snippet.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {playlist.snippet.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Content Playlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};