import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  // Force immediate scroll reset
  useLayoutEffect(() => {
    console.log('useLayoutEffect triggered for pathname:', pathname);
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();

    // Additional attempt for stubborn browsers
    setTimeout(() => {
      scrollToTop();
    }, 100);
  }, [pathname]);

  // Multiple attempts for stubborn browsers
  useEffect(() => {
    console.log('useEffect triggered for pathname:', pathname);
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Initial scroll plus delayed attempts
    scrollToTop();

    const timeoutIds = [
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 150),
      setTimeout(scrollToTop, 300),
      setTimeout(scrollToTop, 500),
      setTimeout(scrollToTop, 1000),
    ];

    return () => timeoutIds.forEach(id => clearTimeout(id));
  }, [pathname]);

  return null;
}

export default ScrollToTop;