import { useRef, useState, useEffect, useCallback } from 'react';

const ANIMATION_DELAY = 0.15;
export const useIntersecting = <T extends HTMLDivElement>(
  index: number,
  itemsPerRow: number,
  options: IntersectionObserverInit = { threshold: 0.1 },
) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggeredRef = useRef(false);
  const [delay, setDelay] = useState(0);

  // Detect if screen is small. Ensure it's only checked on client-side
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(max-width: 768px)');
      setIsSmallScreen(mediaQuery.matches);
    }
  }, []); // Run only once on mount

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setInView(true);
        triggeredRef.current = true;

        if (observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current);
        }

        if (isSmallScreen) {
          setDelay(ANIMATION_DELAY);
        } else {
          const col = index % itemsPerRow;
          setDelay(
            parseFloat((ANIMATION_DELAY + col * ANIMATION_DELAY).toFixed(2)),
          );
        }
      }
    },
    [index, isSmallScreen, itemsPerRow],
  );

  useEffect(() => {
    if (triggeredRef.current) return;
    observerRef.current = new IntersectionObserver(handleIntersection, options);
    if (ref.current) observerRef.current.observe(ref.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [handleIntersection, options]);

  return { inView, ref, delay };
};
