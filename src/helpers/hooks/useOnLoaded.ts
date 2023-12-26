import { useLayoutEffect, useState } from "react";

export const useOnLoaded = () => {
  const [onLoaded, setOnLoaded] = useState(false);
  useLayoutEffect(() => {
    setOnLoaded(true)
  }, [])

  return onLoaded
}