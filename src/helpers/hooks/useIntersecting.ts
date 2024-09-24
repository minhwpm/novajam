import { useInView } from 'react-hook-inview';

export const useIntersecting: (
  threshold?: number,
) => [(node: Element | null) => void, boolean] = (threshold = 0.4) => {
  const [ref, isIntersecting] = useInView({
    threshold: threshold,
    unobserveOnEnter: true,
  });
  return [ref, isIntersecting];
};
