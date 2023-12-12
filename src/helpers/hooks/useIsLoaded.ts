import { useEffect, useState } from "react";

export const useIsLoaded = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return isLoaded
}