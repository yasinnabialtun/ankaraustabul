import { useEffect, useRef, useState } from 'react';
import type { UseIntersectionObserverOptions } from '../types';

/**
 * useIntersectionObserver - Modern intersection observer hook
 * 
 * @param options - Intersection observer options
 * @returns [setTarget, entry, isIntersecting]
 */
export function useIntersectionObserver<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [(node: T | null) => void, IntersectionObserverEntry | null, boolean] {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    triggerOnce = false,
  } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setTarget = (node: T | null) => {
    if (elementRef.current && observerRef.current) {
      observerRef.current.unobserve(elementRef.current);
    }

    elementRef.current = node;

    if (node) {
      if (observerRef.current) {
        observerRef.current.observe(node);
      }
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver is not supported');
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEntry(entry);
        const isCurrentlyIntersecting = entry.isIntersecting;
        setIsIntersecting(isCurrentlyIntersecting);

        if (isCurrentlyIntersecting && triggerOnce && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, root, triggerOnce, hasTriggered]);

  // If triggerOnce is true and we've already triggered, don't observe anymore
  useEffect(() => {
    if (triggerOnce && hasTriggered && observerRef.current && elementRef.current) {
      observerRef.current.unobserve(elementRef.current);
    }
  }, [triggerOnce, hasTriggered]);

  return [setTarget, entry, isIntersecting];
}

/**
 * useInView - Simplified version for checking if element is in view
 * 
 * @param options - Intersection observer options
 * @returns [ref, inView]
 */
export function useInView<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [(node: T | null) => void, boolean] {
  const [setTarget, , isIntersecting] = useIntersectionObserver<T>(options);
  return [setTarget, isIntersecting];
}

/**
 * useViewportEntry - Get full intersection observer entry
 * 
 * @param options - Intersection observer options
 * @returns [ref, entry]
 */
export function useViewportEntry<T extends Element>(
  options: UseIntersectionObserverOptions = {}
): [(node: T | null) => void, IntersectionObserverEntry | null] {
  const [setTarget, entry] = useIntersectionObserver<T>(options);
  return [setTarget, entry];
}

// Legacy hook for backward compatibility
export function useIntersectionObserverLegacy({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
} = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersectingNow = entry.isIntersecting;
        setIsIntersecting(isIntersectingNow);
        
        if (isIntersectingNow && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, hasIntersected]);

  return {
    targetRef,
    isIntersecting,
    hasIntersected: triggerOnce ? hasIntersected : isIntersecting,
  };
}

export default useIntersectionObserver;