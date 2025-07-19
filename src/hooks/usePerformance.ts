import { useEffect, useCallback, useRef } from 'react';

export const usePerformance = () => {
  const performanceData = useRef({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    pageLoadTime: 0
  });

  const reportMetric = useCallback((name: string, value: number) => {
    // Send to analytics service
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: name,
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        non_interaction: true,
      });
    }

    // Store in performance data
    performanceData.current[name.toLowerCase() as keyof typeof performanceData.current] = value;

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value);
    }
  }, []);

  useEffect(() => {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcp = entries[entries.length - 1];
        if (fcp) {
          reportMetric('FCP', fcp.startTime);
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        if (lcp) {
          reportMetric('LCP', lcp.startTime);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.processingStart) {
            reportMetric('FID', entry.processingStart - entry.startTime);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        reportMetric('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Time to First Byte
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const navigation = entries[0] as PerformanceNavigationTiming;
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          reportMetric('TTFB', ttfb);
        }
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
    }
  }, [reportMetric]);

  const measurePageLoad = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        reportMetric('Page Load Time', loadTime);
        performanceData.current.pageLoadTime = loadTime;
      }
    }
  }, [reportMetric]);

  const measureResourceLoad = useCallback((resourceName: string) => {
    return new Promise<number>((resolve) => {
      const startTime = performance.now();
      
      const checkComplete = () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        reportMetric(`Resource Load - ${resourceName}`, duration);
        resolve(duration);
      };

      // Check if resource is already loaded
      if (document.readyState === 'complete') {
        checkComplete();
      } else {
        window.addEventListener('load', checkComplete);
      }
    });
  }, [reportMetric]);

  const getPerformanceScore = useCallback(() => {
    const { fcp, lcp, fid, cls } = performanceData.current;
    
    // Calculate performance score based on Core Web Vitals
    let score = 100;
    
    // FCP scoring (0-2000ms is good)
    if (fcp > 2000) score -= 20;
    else if (fcp > 1000) score -= 10;
    
    // LCP scoring (0-2500ms is good)
    if (lcp > 4000) score -= 25;
    else if (lcp > 2500) score -= 15;
    
    // FID scoring (0-100ms is good)
    if (fid > 300) score -= 25;
    else if (fid > 100) score -= 15;
    
    // CLS scoring (0-0.1 is good)
    if (cls > 0.25) score -= 30;
    else if (cls > 0.1) score -= 20;
    
    return Math.max(0, score);
  }, []);

  return {
    measurePageLoad,
    measureResourceLoad,
    getPerformanceScore,
    performanceData: performanceData.current
  };
}; 