#!/bin/bash

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf dist

# Build the project with proper settings
echo "Building the project..."
NODE_ENV=production pnpm run build

# Copy necessary files for static site hosting and SEO
echo "Copying static files to dist folder..."
cp public/404.html dist/
cp public/robots.txt dist/
cp public/sitemap.xml dist/

# Update sitemap date
current_date=$(date +"%Y-%m-%d")
sed -i "s/<lastmod>.*<\/lastmod>/<lastmod>$current_date<\/lastmod>/g" dist/sitemap.xml

# Copy .htaccess file if using Apache
echo "Creating .htaccess file for Apache servers..."
cat > dist/.htaccess << EOL
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOL

echo "Build complete and ready for deployment!"
echo "You can now deploy the 'dist' folder to your hosting provider."
