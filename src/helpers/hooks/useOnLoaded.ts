import { useEffect, useState } from "react";

export const useOnLoaded = () => {
  const [onLoaded, setOnLoaded] = useState(false);
  useEffect(() => {
    setOnLoaded(true)
  }, [])

  return onLoaded
}