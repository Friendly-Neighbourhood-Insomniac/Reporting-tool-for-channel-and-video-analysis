import React, { useCallback, useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { useReportStore } from '../store/reportStore';
import { ChannelAnalysis } from '../types/channel';

export const FileUpload = () => {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { setChannelReport, setVideoReport } = useReportStore();

  const validateAndParseJSON = useCallback(async (file: File) => {
    try {
      setError(null);
      const text = await file.text();
      const data = JSON.parse(text);

      console.log('Parsed JSON data:', data);

      // Validate channel report
      if (data?.title && data?.subscriberCount !== undefined && data?.viewCount !== undefined) {
        console.log('Setting channel report data');
        setChannelReport(data as ChannelAnalysis);
        return;
      }
      
      // Validate video report
      if (data?.title && data?.analysis && data?.viewCount !== undefined) {
        console.log('Setting video report data');
        setVideoReport(data);
        return;
      }

      throw new Error('Invalid report format');
    } catch (error) {
      console.error('Error parsing file:', error);
      setError(error instanceof Error ? error.message : 'Invalid report format. Please upload a valid JSON report.');
    }
  }, [setChannelReport, setVideoReport]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.name.endsWith('.json')) {
        setError('Please upload a JSON file');
        return;
      }
      validateAndParseJSON(file);
    }
  }, [validateAndParseJSON]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.json')) {
        setError('Please upload a JSON file');
        return;
      }
      validateAndParseJSON(file);
    }
  }, [validateAndParseJSON]);

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <label
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className={`w-12 h-12 mb-4 ${isDragging ? 'text-indigo-500' : 'text-gray-500'}`} />
          <p className="mb-2 text-sm text-gray-600">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">JSON files only</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="application/json"
          onChange={handleFileChange}
        />
      </label>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};