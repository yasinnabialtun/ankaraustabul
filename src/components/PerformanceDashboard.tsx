import { useState, useEffect } from 'react';
import { usePerformance } from '../hooks/usePerformance';
import { TrendingUp, Clock, Zap, AlertTriangle } from 'lucide-react';

// Type declaration for window.gtag
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config: any) => void;
  }
}

export const PerformanceDashboard = () => {
  const { getPerformanceScore, performanceData } = usePerformance();
  const [score, setScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScore = () => {
      const newScore = getPerformanceScore();
      setScore(newScore);
    };

    // Update score every 2 seconds
    const interval = setInterval(updateScore, 2000);
    
    // Show dashboard after 3 seconds
    const timer = setTimeout(() => setIsVisible(true), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [getPerformanceScore]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <TrendingUp className="w-5 h-5 text-green-600" />;
    if (score >= 70) return <Clock className="w-5 h-5 text-yellow-600" />;
    return <AlertTriangle className="w-5 h-5 text-red-600" />;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
        <div className="flex items-center space-x-2">
          {getScoreIcon(score)}
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">FCP:</span>
          <span className="font-medium">
            {performanceData.fcp > 0 ? `${Math.round(performanceData.fcp)}ms` : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">LCP:</span>
          <span className="font-medium">
            {performanceData.lcp > 0 ? `${Math.round(performanceData.lcp)}ms` : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">FID:</span>
          <span className="font-medium">
            {performanceData.fid > 0 ? `${Math.round(performanceData.fid)}ms` : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">CLS:</span>
          <span className="font-medium">
            {performanceData.cls > 0 ? performanceData.cls.toFixed(3) : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">TTFB:</span>
          <span className="font-medium">
            {performanceData.ttfb > 0 ? `${Math.round(performanceData.ttfb)}ms` : 'N/A'}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Page Load:</span>
          <span>
            {performanceData.pageLoadTime > 0 ? `${Math.round(performanceData.pageLoadTime)}ms` : 'N/A'}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
        <Zap className="w-3 h-3" />
        <span>Real-time monitoring</span>
      </div>
    </div>
  );
};

export default PerformanceDashboard; 