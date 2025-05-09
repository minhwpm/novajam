import { useState, useEffect } from 'react';

export const useCurrentHref = () => {
  const [currentHref, setCurrentHref] = useState('');

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      setCurrentHref(window.location.href);
    }
  }, []);

  return currentHref;
};
