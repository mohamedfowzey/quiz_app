import { useState, useEffect } from 'react';

export function useIsTabActive() {
  const [isActive, setIsActive] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => setIsActive(!document.hidden);
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isActive;
}
