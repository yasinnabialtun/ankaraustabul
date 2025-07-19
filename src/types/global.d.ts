// Global window object extensions
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }
}

// Performance API types
interface PerformanceNavigationTiming extends PerformanceEntry {
  readonly domContentLoadedEventEnd: number;
  readonly domContentLoadedEventStart: number;
  readonly loadEventEnd: number;
  readonly loadEventStart: number;
  readonly navigationStart: number;
  readonly requestStart: number;
  readonly responseEnd: number;
  readonly responseStart: number;
  readonly unloadEventEnd: number;
  readonly unloadEventStart: number;
}

// Intersection Observer types
interface IntersectionObserverEntry {
  readonly boundingClientRect: DOMRectReadOnly;
  readonly intersectionRatio: number;
  readonly intersectionRect: DOMRectReadOnly;
  readonly isIntersecting: boolean;
  readonly rootBounds: DOMRectReadOnly | null;
  readonly target: Element;
  readonly time: number;
}

interface IntersectionObserverInit {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface IntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  disconnect(): void;
  observe(target: Element): void;
  unobserve(target: Element): void;
}

declare var IntersectionObserver: {
  prototype: IntersectionObserver;
  new(callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
};

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

export {}; 