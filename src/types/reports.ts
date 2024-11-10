export interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ChannelReport {
  subscriberCount: number;
  viewCount: number;
  recommendations: Recommendation[];
  playlists: any[];
  topVideos: any[];
}

export interface VideoAnalysis {
  titleScore: number;
  descriptionScore: number;
  tagsScore: number;
  overallScore: number;
  recommendations: string[];
}

export interface VideoEngagement {
  rate: number;
  comparison: string;
}

export interface VideoReport {
  title: string;
  description: string;
  viewCount: number;
  likeCount: number;
  analysis: VideoAnalysis;
  engagement: VideoEngagement;
}

export type ReportType = 'channel' | 'video' | null;