'use client';

import { useCallback } from 'react';
import { logger } from '@/utils';

/**
 * Custom hook for handling errors in components
 * Provides consistent error handling and logging across the application
 */
export const useErrorHandler = () => {
  /**
   * Handle an error with logging and optional custom handling
   */
  const handleError = useCallback((
    error: unknown,
    context?: string,
    additionalInfo?: Record<string, any>
  ) => {
    // Normalize the error
    let normalizedError: Error;
    
    if (error instanceof Error) {
      normalizedError = error;
    } else if (typeof error === 'string') {
      normalizedError = new Error(error);
    } else {
      normalizedError = new Error('Unknown error occurred');
    }

    // Log the error with context
    logger.error(
      context || 'An error occurred',
      {
        ...additionalInfo,
        errorType: normalizedError.constructor.name,
        errorMessage: normalizedError.message,
        url: typeof window !== 'undefined' ? window.location.href : 'unknown',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      }
    );

    // Return the normalized error for further handling if needed
    return normalizedError;
  }, []);

  /**
   * Handle API errors specifically
   */
  const handleApiError = useCallback((
    error: unknown,
    endpoint: string,
    additionalInfo?: Record<string, any>
  ) => {
    const normalizedError = handleError(error, `API Error at ${endpoint}`, {
      endpoint,
      ...additionalInfo,
    });

    // You could add additional API-specific error handling here
    // For example, checking for specific status codes or error messages

    return normalizedError;
  }, [handleError]);

  /**
   * Handle Firebase errors specifically
   */
  const handleFirebaseError = useCallback((
    error: unknown,
    operation: string,
    additionalInfo?: Record<string, any>
  ) => {
    const normalizedError = handleError(error, `Firebase Error during ${operation}`, {
      operation,
      ...additionalInfo,
    });

    // You could add additional Firebase-specific error handling here
    // For example, checking for specific Firebase error codes

    return normalizedError;
  }, [handleError]);

  return {
    handleError,
    handleApiError,
    handleFirebaseError,
  };
};

export default useErrorHandler;