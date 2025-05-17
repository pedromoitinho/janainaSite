import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import "./ImageCarousel.css";

// Import images from assets
import image1 from "../carousel-assets/carousel1.webp";
import image2 from "../carousel-assets/carousel2.webp";
import image3 from "../carousel-assets/carousel3.webp";
import image4 from "../carousel-assets/carousel4.webp";
import image5 from "../carousel-assets/carousel5.webp";
import image6 from "../carousel-assets/carousel6.webp";
import image7 from "../carousel-assets/carousel7.webp";
import image8 from "../carousel-assets/carousel8.webp";

interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

const images: CarouselImage[] = [
  {
    src: image1,
    alt: "Segurança do Trabalho",
    caption: "NR 35 - Trabalho em Altura",
  },
  {
    src: image2,
    alt: "Segurança do Trabalho",
    caption: "Treinamentos de Segurança",
  },
  {
    src: image3,
    alt: "Segurança do Trabalho",
    caption: "NR 35 - Trabalho em Altura",
  },
  {
    src: image4,
    alt: "Avaliação Ergonômica",
    caption: "Avaliação Ergonômica",
  },
  {
    src: image5,
    alt: "Higiene Ocupacional",
    caption: "Higiene Ocupacional",
  },
  {
    src: image6,
    alt: "Palestra",
    caption: "Palestra",
  },
  {
    src: image7,
    alt: "NR 10 - SEP",
    caption: "NR 10 - SEP",
  },
  {
    src: image8,
    alt: "Avaliação Ocupacional de Ruído e Vibração",
    caption: "Avaliação Ocupacional de Ruído e Vibração",
  },
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const autoPlayRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const lastInteractionRef = useRef<number>(0);

  // Add a caching mechanism for images
  const imageCache = useRef<Set<string>>(new Set());

  // Throttle function for handling animations
  const throttle = (func: Function, limit: number) => {
    return (...args: any[]) => {
      const now = Date.now();
      if (now - lastInteractionRef.current >= limit) {
        func(...args);
        lastInteractionRef.current = now;
      }
    };
  };

  // Preload adjacent images
  const preloadAdjacentImages = useCallback(
    (index: number) => {
      const indexesToLoad = [
        (index + 1) % images.length,
        (index - 1 + images.length) % images.length,
      ];

      indexesToLoad.forEach((i) => {
        const src = images[i].src;
        if (!imageCache.current.has(src)) {
          const img = new Image();
          img.onload = () => imageCache.current.add(src);
          img.src = src;
        }
      });
    },
    [images]
  );

  // Handle navigation with throttling and optimizations
  const goToSlide = useCallback(
    throttle((index: number) => {
      if (isTransitioning) return;

      const newIndex = (index + images.length) % images.length;
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      preloadAdjacentImages(newIndex);

      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300); // Reduced transition time for better performance
      });
    }, 300),
    [isTransitioning, preloadAdjacentImages]
  );

  const goToNext = useCallback(
    () => goToSlide(currentIndex + 1),
    [currentIndex, goToSlide]
  );
  const goToPrev = useCallback(
    () => goToSlide(currentIndex - 1),
    [currentIndex, goToSlide]
  );

  // Optimized touch event handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  const onTouchMove = useCallback(
    throttle((e: React.TouchEvent) => {
      touchEndRef.current = e.targetTouches[0].clientX;
    }, 16),
    [] // 60fps throttle
  );

  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50;

    if (Math.abs(distance) >= minSwipeDistance) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    // Reset touch values
    touchStartRef.current = null;
    touchEndRef.current = null;

    // Restart autoplay with throttling
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = window.setInterval(goToNext, 5000);
  }, [goToNext, goToPrev]);

  // Intersection Observer setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "50px", // Preload before fully visible
    };

    const carouselObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Preload first few images when carousel becomes visible
        preloadAdjacentImages(currentIndex);
      }
    }, observerOptions);

    if (carouselRef.current) carouselObserver.observe(carouselRef.current);

    return () => {
      carouselObserver.disconnect();
    };
  }, [currentIndex, preloadAdjacentImages]);

  // Optimized auto-play with cleanup
  useEffect(() => {
    let isMounted = true;

    const startAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      if (isMounted) {
        autoPlayRef.current = window.setInterval(goToNext, 5000);
      }
    };

    startAutoPlay();

    return () => {
      isMounted = false;
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [goToNext]);

  // Memoized carousel item renderer
  const CarouselItem = memo(
    ({ image, index }: { image: CarouselImage; index: number }) => {
      const isPriority =
        index === currentIndex ||
        index === (currentIndex + 1) % images.length ||
        index === (currentIndex - 1 + images.length) % images.length;

      return (
        <div className="carousel-item">
          <img
            src={image.src}
            alt={image.alt}
            loading={isPriority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={isPriority ? "high" : "low"}
          />
          {image.caption && (
            <div className="carousel-caption">
              <p>{image.caption}</p>
            </div>
          )}
        </div>
      );
    }
  );

  return (
    <div
      className={`carousel-container${isVisible ? " visible" : ""}`}
      ref={carouselRef}
      id="servicos-galeria"
    >
      <h1 id="carouselTitle">
        Nossos <span id="trabalhoAmarelo">serviços</span> em ação:
      </h1>

      <div
        className="carousel"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="carousel-inner"
          style={{
            transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
            willChange: "transform",
          }}
        >
          {images.map((image, index) => (
            <CarouselItem key={index} image={image} index={index} />
          ))}
        </div>

        <button
          className="carousel-control prev"
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          className="carousel-control next"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ImageCarousel);
