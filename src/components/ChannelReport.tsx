import React from 'react';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ChannelAnalysis } from '../types/channel';
import { ChannelOverview } from './ChannelOverview';
import { ChannelMetricsChart } from './ChannelMetricsChart';
import { EnhancedRecommendations } from './EnhancedRecommendations';
import { TopVideoMetricsTable } from './TopVideoMetricsTable';

interface Props {
  data: ChannelAnalysis;
}

export const ChannelReport: React.FC<Props> = ({ data }) => {
  const reportRef = React.useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generatePDF = async () => {
    if (!reportRef.current) return;
    
    try {
      setIsGenerating(true);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Page 1: Overview, Performance Metrics, and Consistency/Retention
      const page1 = reportRef.current.querySelector('.page-1') as HTMLElement;
      await new Promise(resolve => setTimeout(resolve, 1000));
      const canvas1 = await html2canvas(page1, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        scale: 2,
        imageTimeout: 15000,
        onclone: (document) => {
          const images = document.getElementsByTagName('img');
          for (let img of images) {
            img.crossOrigin = 'anonymous';
          }
        }
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas1.height * imgWidth) / canvas1.width;
      
      pdf.addImage(
        canvas1.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      // Page 2: Recommendations and Video Analysis
      pdf.addPage();
      
      const page2 = reportRef.current.querySelector('.page-2') as HTMLElement;
      await new Promise(resolve => setTimeout(resolve, 1000));
      const canvas2 = await html2canvas(page2, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        scale: 2,
        imageTimeout: 15000,
        onclone: (document) => {
          const images = document.getElementsByTagName('img');
          for (let img of images) {
            img.crossOrigin = 'anonymous';
          }
        }
      });

      const imgHeight2 = (canvas2.height * imgWidth) / canvas2.width;
      
      pdf.addImage(
        canvas2.toDataURL('image/jpeg', 1.0),
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight2,
        undefined,
        'FAST'
      );

      pdf.save(`${data.title}-channel-report.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
            ${isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
            }
            text-white
          `}
        >
          <Download className="w-5 h-5" />
          <span>{isGenerating ? 'Generating PDF...' : 'Download PDF Report'}</span>
        </button>
      </div>

      <div 
        ref={reportRef} 
        className="space-y-12 bg-gray-50 p-8 rounded-xl"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Page 1: Overview, Performance Metrics, and Consistency/Retention */}
        <div className="page-1 space-y-8">
          <ChannelOverview data={data} />
          <ChannelMetricsChart metrics={data.metrics} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Content Consistency</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Videos per Month</p>
                  <p className="text-2xl font-bold">
                    {(data.videoCount / 12).toFixed(1)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Publishing Frequency</span>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                    data.metrics.contentOutput.toLowerCase() === 'high' 
                      ? 'bg-green-100 text-green-700'
                      : data.metrics.contentOutput.toLowerCase() === 'medium'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {data.metrics.contentOutput}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Audience Retention</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Views per Subscriber</p>
                  <p className="text-2xl font-bold">
                    {(data.viewCount / data.subscriberCount).toFixed(1)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Views</span>
                  <span className="font-medium">{data.viewCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2: Recommendations and Video Analysis */}
        <div className="page-2 space-y-8">
          <EnhancedRecommendations data={data} />
          <TopVideoMetricsTable topVideos={data.topVideos} />
        </div>
      </div>
    </div>
  );
};