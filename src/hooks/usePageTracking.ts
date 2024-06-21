import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-XRTSPE4PDR', {
        page_path: location.pathname,
      });
    } else {
      console.error('gtag function is not available');
    }
  }, [location]);
};

export default usePageTracking;
