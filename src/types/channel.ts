export interface ChannelAnalysis {
  title: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  publishedAt: string;
  description: string;
  thumbnail: string;
  recommendations: {
    category: string;
    icon: Record<string, unknown>;
    title: string;
    suggestions: string[];
  }[];
  metrics: {
    subscriberGrowth: string;
    engagementRate: number;
    contentOutput: string;
    averageViews: number;
  };
  topVideos: {
    mostViewed: any;
    mostLiked: any;
    mostEngaging: any;
  };
}