export const checkCookiesConsent = (): boolean => {
  const cookiesResponse = localStorage.getItem('cookiesResponse');
  return cookiesResponse === 'accepted';
};

export const hasCookiesResponse = (): boolean => {
  return localStorage.getItem('cookiesResponse') === 'accepted';
};

export const clearCookiesResponse = (): void => {
  localStorage.removeItem('cookiesResponse');
};

// Add this new function
export const removeAllCookies = (): void => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

// Add this new function
export const clearAllStorage = async (): Promise<void> => {
  // Clear localStorage
  localStorage.clear();

  // Clear sessionStorage
  sessionStorage.clear();

  // Clear indexedDB
  const databases = await window.indexedDB.databases();
  databases.forEach((db) => {
    window.indexedDB.deleteDatabase(db.name!);
  });

  // Attempt to clear cache storage
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
    } catch (error) {
      console.error('Failed to clear cache storage:', error);
    }
  }
};
