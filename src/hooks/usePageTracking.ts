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
    const handleRouteChange = (url: string) => {
      if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-XRTSPE4PDR', {
          page_path: url,
        });
      } else {
        console.error('gtag function is not available');
      }
    };

    handleRouteChange(location.pathname);

    return () => {
      console.log('cleanup');
    };
  }, [location]);
};

export default usePageTracking;