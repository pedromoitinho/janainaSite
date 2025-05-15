import React, { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css';

// Import images from assets
import image1 from '../carousel-assets/carousel1.jpg';
import image2 from '../carousel-assets/carousel2.jpg';
import image3 from '../carousel-assets/carousel3.jpg';
import image4 from '../carousel-assets/carousel4.jpg';
import image5 from '../carousel-assets/carousel5.jpg';
import image6 from '../carousel-assets/carousel6.jpg';
import image7 from '../carousel-assets/carousel7.jpg';
import image8 from '../carousel-assets/carousel8.jpg';

interface CarouselImage {
    src: string;
    alt: string;
    caption?: string;
}

const ImageCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const autoPlayRef = useRef<number | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Define carousel images
    const images: CarouselImage[] = [
        {
            src: image1,
            alt: 'Segurança do Trabalho',
            caption: 'NR 35 - Trabalho em Altura'
        },
        {
            src: image2,
            alt: 'Segurança do Trabalho',
            caption: 'Treinamentos de Segurança'
        },
        {
            src: image3,
            alt: 'Segurança do Trabalho',
            caption: 'NR 35 - Trabalho em Altura'
        },
        {
            src: image4,
            alt: 'Avaliação Ergonômica',
            caption: 'Avaliação Ergonômica'
        },
        {
            src: image5,
            alt: 'Higiene Ocupacional',
            caption: 'Higiene Ocupacional'
        },
        {
            src: image6,
            alt: 'Palestra',
            caption: 'Palestra'
        },
        {
            src: image7,
            alt: 'NR 10 - SEP',
            caption: 'NR 10 - SEP'
        },
        {
            src: image8,
            alt: 'Avaliação Ocupacional de Ruído e Vibração',
            caption: 'Avaliação Ocupacional de Ruído e Vibração'
        },
    ];

    // Handle intersection observer for entry animations
    useEffect(() => {
        const observerOptions = { threshold: 0.2 };

        const carouselObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            observerOptions
        );

        if (carouselRef.current) carouselObserver.observe(carouselRef.current);

        return () => {
            carouselObserver.disconnect();
        };
    }, []);

    // Auto-play functionality
    useEffect(() => {
        const startAutoPlay = () => {
            autoPlayRef.current = window.setInterval(() => {
                goToNext();
            }, 5000); // Change slide every 5 seconds
        };

        // Start autoplay
        startAutoPlay();

        // Clean up on unmount
        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [currentIndex]);

    // Handle navigation
    const goToSlide = (index: number) => {
        if (isTransitioning) return;

        // Prevent going beyond array bounds
        const newIndex = (index + images.length) % images.length;

        setIsTransitioning(true);
        setCurrentIndex(newIndex);

        // Reset transition state after animation completes
        setTimeout(() => {
            setIsTransitioning(false);
        }, 500); // Match this with CSS transition time
    };

    const goToNext = () => goToSlide(currentIndex + 1);
    const goToPrev = () => goToSlide(currentIndex - 1);

    // Touch event handlers for swipe gestures
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);

        // Pause autoplay on touch
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe) {
            goToNext();
        } else if (isRightSwipe) {
            goToPrev();
        }

        // Restart autoplay after touch
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
        autoPlayRef.current = window.setInterval(goToNext, 5000);
    };

    // Handle pause on hover
    const handleMouseEnter = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
    };

    const handleMouseLeave = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
        }
        autoPlayRef.current = window.setInterval(goToNext, 5000);
    };

    return (
        <div className={`carousel-container${isVisible ? ' visible' : ''}`} ref={carouselRef} id="servicos-galeria">
            <h1 id="carouselTitle">Nossos <span id="trabalhoAmarelo">serviços</span> em ação:</h1>

            <div
                className="carousel"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((image, index) => (
                        <div className="carousel-item" key={index}>
                            <img src={image.src} alt={image.alt} />
                            {image.caption && <div className="carousel-caption"><p>{image.caption}</p></div>}
                        </div>
                    ))}
                </div>

                <button className="carousel-control prev" onClick={goToPrev} aria-label="Previous slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>

                <button className="carousel-control next" onClick={goToNext} aria-label="Next slide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>

                <div className="carousel-indicators">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
