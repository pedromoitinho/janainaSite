#!/bin/bash

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf dist

# Build the project
echo "Building the project..."
npm run build

# Add fallback for HTML5 routing if you're using a static host
echo "<!DOCTYPE html><html><head><meta http-equiv=\"refresh\" content=\"0;url=/\"></head></html>" > dist/404.html

echo "Build complete! Your site is ready in the dist folder."
echo "Deploy the entire dist folder to your hosting provider."
