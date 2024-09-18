import { useState, useEffect } from 'react';

const useStickyHeaderOnScrollUp = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    function handler() {
      const st = document.documentElement.scrollTop;
      if (st < lastScrollTop) {
        setSticky(true);
      }
      if (st >= lastScrollTop || st === 0) {
        setSticky(false);
      }
      lastScrollTop = st;
    }
    document.addEventListener('scroll', handler);

    return () => document.removeEventListener('scroll', handler);
  }, []);
  return sticky;
};

export default useStickyHeaderOnScrollUp;
