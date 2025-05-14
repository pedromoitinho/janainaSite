import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useLocation, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Formulario from './formulario.tsx'
import SobreNos from './SobreNos.tsx'
import './main.css'
import LoadingScreen from './components/Loading.tsx'
import ScrollToTop from './components/ScrollToTop.tsx' // Import the new component

// Create a component that wraps the routes and manages loading state
function AppWithLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show loading when location changes
    setIsLoading(true);
    
    // Hide loading after a short delay (simulating page load)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Adjust timing as needed
    
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <ScrollToTop /> {/* Add this line */}
      <LoadingScreen isVisible={isLoading} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/forms" element={<Formulario />} />
        <Route path="/about" element={<SobreNos />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithLoading />
    </BrowserRouter>
  </React.StrictMode>,
)
