#!/usr/bin/env node

/**
 * Environment Variables Validation Script
 * 
 * This script validates that all required environment variables are set
 * before starting the application.
 */

// Load environment variables from .env file
require('dotenv').config();

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
  // NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID is optional
  'NEXT_PUBLIC_APP_NAME',
  'NEXT_PUBLIC_APP_URL',
];

function validateEnvVars() {
  const missingVars = [];
  
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach((envVar) => {
      console.error(`  - ${envVar}`);
    });
    console.error('\nPlease set these variables in your .env file or environment configuration.');
    console.error('Refer to .env.example for the required variables.');
    process.exit(1);
  }
  
  console.log('✅ All required environment variables are set');
  
  // Additional validation for specific variables
  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.startsWith('http')) {
    console.warn('⚠️  Warning: NEXT_PUBLIC_APP_URL should start with http:// or https://');
  }
  
  return true;
}

// Run validation if this script is executed directly
if (require.main === module) {
  validateEnvVars();
}

module.exports = { validateEnvVars };