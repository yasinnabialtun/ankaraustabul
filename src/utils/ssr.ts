/**
 * Utility functions for handling Server-Side Rendering (SSR) in Next.js
 */

/**
 * Check if we're running on the client side (browser)
 * @returns boolean - true if running on client side
 */
export const isClient = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Check if we're running on the server side
 * @returns boolean - true if running on server side
 */
export const isServer = (): boolean => {
  return typeof window === 'undefined';
};

/**
 * Get the current environment
 * @returns 'development' | 'production' | 'test'
 */
export const getEnvironment = (): 'development' | 'production' | 'test' => {
  return (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development';
};

/**
 * Check if we're in development mode
 * @returns boolean - true if in development mode
 */
export const isDevelopment = (): boolean => {
  return getEnvironment() === 'development';
};

/**
 * Check if we're in production mode
 * @returns boolean - true if in production mode
 */
export const isProduction = (): boolean => {
  return getEnvironment() === 'production';
};

/**
 * Safely execute code only on the client side
 * @param callback - Function to execute on client side
 * @param fallback - Optional fallback value for server side
 * @returns Result of callback or fallback
 */
export const clientOnly = <T>(callback: () => T, fallback?: T): T | undefined => {
  if (isClient()) {
    return callback();
  }
  return fallback;
};

/**
 * Safely execute code only on the server side
 * @param callback - Function to execute on server side
 * @param fallback - Optional fallback value for client side
 * @returns Result of callback or fallback
 */
export const serverOnly = <T>(callback: () => T, fallback?: T): T | undefined => {
  if (isServer()) {
    return callback();
  }
  return fallback;
};

/**
 * Get window object safely
 * @returns Window object or undefined if on server
 */
export const getWindow = (): Window | undefined => {
  return isClient() ? window : undefined;
};

/**
 * Get document object safely
 * @returns Document object or undefined if on server
 */
export const getDocument = (): Document | undefined => {
  return isClient() ? document : undefined;
};

/**
 * Get navigator object safely
 * @returns Navigator object or undefined if on server
 */
export const getNavigator = (): Navigator | undefined => {
  return isClient() ? navigator : undefined;
};