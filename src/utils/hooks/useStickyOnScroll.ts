import { useState, useEffect } from "react";

const useStickyOnScorll = () => {
  const [fixed, setFixed] = useState(false)
  useEffect(()=> {
    function handler () { 
      if (window.pageYOffset > 0) setFixed(true)
      else setFixed(false)
    }
    document.addEventListener("scroll", handler)
    
    return () => document.removeEventListener("scroll", handler)
  }, []);
  return fixed
}

export default useStickyOnScorll