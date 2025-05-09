import { useState, useEffect } from 'react';

export const useStickyHeaderOnScrollDown = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    let lastScrollTop = 0;
    function handler() {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 50) {
        setSticky(true);
      }
      if (scrollTop <= 0) {
        setSticky(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
    }
    document.addEventListener('scroll', handler);

    return () => document.removeEventListener('scroll', handler);
  }, []);
  return sticky;
};
