#!/bin/bash

# Ankara Usta Bul - Deployment Script
# This script handles the deployment process for www.ankaraustabul.com

set -e

echo "🚀 Starting deployment process for Ankara Usta Bul..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

print_status "Installing dependencies..."
npm install

print_status "Running type check..."
npm run type-check

print_status "Running linting..."
npm run lint

print_status "Running tests..."
npm run test

print_status "Building the application..."
npm run build

print_status "Running build validation..."
if [ ! -d ".next" ]; then
    print_error "Build failed - .next directory not found"
    exit 1
fi

print_success "Build completed successfully!"

# Check if we should deploy to production
if [ "$1" = "--production" ]; then
    print_status "Deploying to production..."
    
    # Set production environment variables
    export NODE_ENV=production
    
    # Deploy to Vercel
    vercel --prod
    
    print_success "Production deployment completed!"
    print_status "Your site is now live at: https://ankaraustabul.com"
else
    print_status "Deploying to preview..."
    
    # Deploy to Vercel preview
    vercel
    
    print_success "Preview deployment completed!"
    print_status "Check the output above for the preview URL"
fi

print_status "Deployment process completed successfully! 🎉"

# Optional: Run post-deployment checks
if [ "$2" = "--check" ]; then
    print_status "Running post-deployment checks..."
    
    # Check if the site is accessible
    if [ "$1" = "--production" ]; then
        SITE_URL="https://ankaraustabul.com"
    else
        # Get the preview URL from Vercel output
        SITE_URL=$(vercel ls | grep -o 'https://[^[:space:]]*' | head -1)
    fi
    
    if [ ! -z "$SITE_URL" ]; then
        print_status "Checking site accessibility: $SITE_URL"
        
        # Check if the site responds
        if curl -s -o /dev/null -w "%{http_code}" "$SITE_URL" | grep -q "200"; then
            print_success "Site is accessible and responding correctly"
        else
            print_warning "Site might not be fully accessible yet. Please check manually."
        fi
    fi
fi

print_success "All done! 🚀"
