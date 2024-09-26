import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { checkCookiesConsent } from '../utils/cookiesChecker';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    gaLoaded?: boolean;
    loadGoogleAnalytics?: () => void;
  }
}

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const cookiesAccepted = checkCookiesConsent();

    if (cookiesAccepted) {
      if (window.gaLoaded && typeof window.gtag === 'function') {
        window.gtag('config', 'G-C57TTGMNNX', {
          page_path: location.pathname,
        });
      } else if (typeof window.loadGoogleAnalytics === 'function') {
        window.loadGoogleAnalytics();
      }
    } else {
      console.log('Page tracking disabled: cookies not accepted');
    }
  }, [location]);
};

export default usePageTracking;
