/**
 * Environment Variables Utility
 * 
 * This module provides a centralized way to access and validate environment variables.
 */

// Firebase Configuration
export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Application Configuration
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Ankara Usta Bul',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Modern platform for finding skilled craftsmen in Ankara',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://ankaraustabul.com',
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
};

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ankaraustabul.com',
  version: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
};

// Environment
export const ENVIRONMENT = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  nodeEnv: process.env.NODE_ENV || 'development',
};

/**
 * Validate that all required environment variables are present
 */
export const validateEnvironment = (): boolean => {
  const requiredVars = [
    { name: 'NEXT_PUBLIC_FIREBASE_API_KEY', value: FIREBASE_CONFIG.apiKey },
    { name: 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', value: FIREBASE_CONFIG.authDomain },
    { name: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', value: FIREBASE_CONFIG.projectId },
    { name: 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', value: FIREBASE_CONFIG.storageBucket },
    { name: 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', value: FIREBASE_CONFIG.messagingSenderId },
    { name: 'NEXT_PUBLIC_FIREBASE_APP_ID', value: FIREBASE_CONFIG.appId },
    { name: 'NEXT_PUBLIC_APP_NAME', value: APP_CONFIG.name },
    { name: 'NEXT_PUBLIC_APP_URL', value: APP_CONFIG.url },
  ];

  const missingVars = requiredVars.filter(({ value }) => !value);

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:');
    missingVars.forEach(({ name }) => {
      console.error(`  - ${name}`);
    });
    return false;
  }

  return true;
};

/**
 * Check if Firebase is properly configured
 */
export const isFirebaseConfigured = (): boolean => {
  return !!(
    FIREBASE_CONFIG.apiKey &&
    FIREBASE_CONFIG.projectId &&
    FIREBASE_CONFIG.appId
  );
};

/**
 * Get the full API URL
 */
export const getApiUrl = (endpoint: string = ''): string => {
  const basePath = `${API_CONFIG.baseUrl}/${API_CONFIG.version}`;
  return endpoint ? `${basePath}/${endpoint}` : basePath;
};

export default {
  FIREBASE_CONFIG,
  APP_CONFIG,
  ANALYTICS_CONFIG,
  API_CONFIG,
  ENVIRONMENT,
  validateEnvironment,
  isFirebaseConfigured,
  getApiUrl,
};