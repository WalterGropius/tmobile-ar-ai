import React, { ComponentType } from 'react';
import { checkCookiesConsent } from '../utils/cookiesChecker';

interface WithCookiesBlockerProps {
  fallback?: React.ReactNode;
}

const withCookiesBlocker = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { fallback = null }: WithCookiesBlockerProps = {}
) => {
  const WithCookiesBlocker: React.FC<P> = (props) => {
    const hasConsent = checkCookiesConsent();

    if (!hasConsent) {
      return <>{fallback}</>;
    }

    return <WrappedComponent {...props} />;
  };

  return WithCookiesBlocker;
};

export default withCookiesBlocker;
