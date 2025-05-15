import React, { useState, useRef, useEffect } from 'react';
import './LogoScroller.css';

// Import logo images
import anptec from '../clientes-assets/anptec.png';
import cedep from '../clientes-assets/cedep.jpg';
import colormaq from '../clientes-assets/colormaq.jpg';
import farmacia from '../clientes-assets/farmacia.jpg';
import globoaves from '../clientes-assets/globoaves.png';
import penha from '../clientes-assets/penha.jpg';
import progetto from '../clientes-assets/progetto.png';
import riquezagarage from '../clientes-assets/riquezagarage.png';
import tucano from '../clientes-assets/tucano.jpg';

const LogoScroller: React.FC = () => {
  const [touchedLogo, setTouchedLogo] = useState<string | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Handle touch events for mobile devices
  const handleTouch = (id: string, event: React.TouchEvent) => {
    event.stopPropagation(); // Prevent event from bubbling up
    
    // Toggle touched state
    if (touchedLogo === id) {
      setTouchedLogo(null);
    } else {
      setTouchedLogo(id);
    }
    
    // Automatically clear touched state after 3 seconds
    setTimeout(() => {
      setTouchedLogo(null);
    }, 3000);
  };
  
  // Handle touch outside logo elements
  const handleOutsideTouch = () => {
    if (touchedLogo) {
      setTouchedLogo(null);
    }
  };
  
  // Add event listener for touch events outside the logo elements
  useEffect(() => {
    // Only add this effect for mobile devices
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
      // Add touch event to document body to catch all touches
      document.body.addEventListener('touchstart', handleOutsideTouch);
    }
    
    return () => {
      if (isMobile) {
        document.body.removeEventListener('touchstart', handleOutsideTouch);
      }
    };
  }, [touchedLogo]);
  
  const logos = [
    { src: anptec, alt: 'Anptec' },
    { src: cedep, alt: 'Cedep' },
    { src: colormaq, alt: 'Colormaq' },
    { src: farmacia, alt: 'Farmácia do Trabalhador' },
    { src: globoaves, alt: 'Globoaves' },
    { src: penha, alt: 'Penha' },
    { src: progetto, alt: 'Progetto' },
    { src: riquezagarage, alt: 'Riqueza Garage' },
    { src: tucano, alt: 'Tucano' }
  ];

  return (
    <>
    <h1 id='scrollerTitle'>Alguns de nossos <span id='clientesAmarelo'>clientes:</span></h1>
    <div className="logo-scroller" ref={scrollerRef}>
      <div className="scroller-wrapper">
        {/* First track */}
        <div className="scroller-track">
          {logos.map((logo, index) => {
            const id = `logo-1-${index}`;
            return (
              <div className="logo-item" key={id}>
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className={touchedLogo === id ? 'touched' : ''}
                  onTouchStart={(e) => handleTouch(id, e)}
                />
                <div className="logo-name">{logo.alt}</div>
              </div>
            );
          })}
        </div>
        
        {/* Second track (duplicate for seamless scrolling) */}
        <div className="scroller-track">
          {logos.map((logo, index) => {
            const id = `logo-2-${index}`;
            return (
              <div className="logo-item" key={id}>
                <img 
                  src={logo.src} 
                  alt={logo.alt}
                  className={touchedLogo === id ? 'touched' : ''}
                  onTouchStart={(e) => handleTouch(id, e)}
                />
                <div className="logo-name">{logo.alt}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default LogoScroller;
