import { useState, useEffect } from 'react';

const useStickyHeaderOnScrolllDown = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    function handler() {
      if (document.documentElement.scrollTop > 0) setSticky(true);
      else setSticky(false);
    }
    document.addEventListener('scroll', handler);

    return () => document.removeEventListener('scroll', handler);
  }, []);
  return sticky;
};

export default useStickyHeaderOnScrolllDown;
