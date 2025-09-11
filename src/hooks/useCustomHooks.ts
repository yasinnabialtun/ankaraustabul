import { useEffect, useState } from 'react';
import type { UseDebounceOptions } from '../types';

/**
 * useDebounce - Debounce a value
 * Useful for search inputs, API calls, etc.
 */
export function useDebounce<T>(
  value: T,
  delay: number,
  options: UseDebounceOptions = {}
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const { leading = false, trailing = true } = options;

  useEffect(() => {
    if (leading && debouncedValue === value) {
      // If leading is true and this is the first call
      return;
    }

    const handler = setTimeout(() => {
      if (trailing) {
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, leading, trailing]);

  // Handle leading edge
  useEffect(() => {
    if (leading) {
      setDebouncedValue(value);
    }
  }, [leading]);

  return debouncedValue;
}

/**
 * useLocalStorage - Sync state with localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: {
    serializer?: {
      parse: (value: string) => T;
      stringify: (value: T) => string;
    };
  } = {}
): [T, (value: T | ((val: T) => T)) => void] {
  const { serializer = JSON } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? serializer.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key \"${key}\":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serializer.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key \"${key}\":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * useMedia - React hook to track media query state
 */
export function useMedia(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return matches;
}

/**
 * useOnlineStatus - Track online/offline status
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return true;
    }
    return navigator.onLine;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * useTimeout - Declarative timeout hook
 */
export function useTimeout(callback: () => void, delay: number | null): void {
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
}

/**
 * useInterval - Declarative interval hook
 */
export function useInterval(callback: () => void, delay: number | null): void {
  useEffect(() => {
    if (delay === null) {
      return;
    }

    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay]);
}

/**
 * usePrevious - Get previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T | undefined>();
  const [current, setCurrent] = useState<T>(value);

  if (value !== current) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}

/**
 * useToggle - Boolean state toggle hook
 */
export function useToggle(
  initialValue: boolean = false
): [boolean, (value?: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (nextValue?: boolean) => {
    setValue(prev => nextValue !== undefined ? nextValue : !prev);
  };

  return [value, toggle];
}

/**
 * useArray - Array state management hook
 */
export function useArray<T>(initialValue: T[] = []) {
  const [array, setArray] = useState<T[]>(initialValue);

  const push = (element: T) => {
    setArray(prev => [...prev, element]);
  };

  const filter = (callback: (item: T, index: number, array: T[]) => boolean) => {
    setArray(prev => prev.filter(callback));
  };

  const update = (index: number, newElement: T) => {
    setArray(prev => {
      const newArray = [...prev];
      newArray[index] = newElement;
      return newArray;
    });
  };

  const remove = (index: number) => {
    setArray(prev => prev.filter((_, i) => i !== index));
  };

  const clear = () => {
    setArray([]);
  };

  return {
    array,
    set: setArray,
    push,
    filter,
    update,
    remove,
    clear,
  };
}

/**
 * useClipboard - Copy to clipboard hook
 */
export function useClipboard(): {
  copy: (text: string) => Promise<void>;
  copied: boolean;
} {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async (text: string) => {
    if (!navigator.clipboard) {
      console.warn('Clipboard API not available');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  return { copy, copied };
}

/**
 * useScript - Dynamically load scripts
 */
export function useScript(src: string): 'loading' | 'ready' | 'error' {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    () => {
      if (typeof window === 'undefined') {
        return 'loading';
      }
      
      return document.querySelector(`script[src=\"${src}\"]`) ? 'ready' : 'loading';
    }
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let script = document.querySelector(`script[src=\"${src}\"]`) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }

    const handleLoad = () => setStatus('ready');
    const handleError = () => setStatus('error');

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src]);

  return status;
}

/**
 * useScrollPosition - Track scroll position
 */
export function useScrollPosition(): {
  x: number;
  y: number;
} {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

/**
 * useElementSize - Track element size
 */
export function useElementSize<T extends HTMLElement>(): [
  (node: T | null) => void,
  { width: number; height: number }
] {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [element, setElement] = useState<T | null>(null);

  useEffect(() => {
    if (!element) {
      return;
    }

    const updateSize = () => {
      if (element) {
        setSize({
          width: element.offsetWidth,
          height: element.offsetHeight,
        });
      }
    };

    updateSize();

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(element);
      return () => resizeObserver.disconnect();
    } else {
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, [element]);

  return [setElement, size];
}

/**
 * useAsync - Handle async operations
 */
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const result = await asyncFunction();
      setData(result);
      setStatus('success');
    } catch (error) {
      setError(error as E);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate]);

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success',
    isIdle: status === 'idle',
  };
}