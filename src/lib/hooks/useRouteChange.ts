import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Custom hook to handle route changes.
 * @param onRouteChange Callback function to execute on route change
 */
export const useRouteChange = (onRouteChange: () => void) => {
  const pathname = usePathname();
  useEffect(() => {
    onRouteChange();
  }, [pathname, onRouteChange]);
};
