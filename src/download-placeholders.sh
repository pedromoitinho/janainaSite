#!/bin/bash

# Create directory if it doesn't exist
mkdir -p ../carousel-assets

# Download placeholder images
curl -o ../carousel-assets/carousel1.jpg "https://placehold.co/800x400/f59e0b/ffffff?text=Seguranca+do+Trabalho"
curl -o ../carousel-assets/carousel2.jpg "https://placehold.co/800x400/1f2937/ffffff?text=Psicologia+Organizacional"
curl -o ../carousel-assets/carousel3.jpg "https://placehold.co/800x400/f59e0b/ffffff?text=Saude+Ocupacional"
curl -o ../carousel-assets/carousel4.jpg "https://placehold.co/800x400/1f2937/ffffff?text=Assessoria+Tecnica"
curl -o ../carousel-assets/carousel5.jpg "https://placehold.co/800x400/f59e0b/ffffff?text=Treinamentos"

echo "Downloaded placeholder images to carousel-assets directory"
