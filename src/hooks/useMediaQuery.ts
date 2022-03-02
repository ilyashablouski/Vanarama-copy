import { useState, useEffect } from 'react';

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    // Set the value on the initial render
    setMatches(mql.matches);

    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    // Then subscribe to additional changes
    mql.onchange = handleChange;
    return () => {
      mql.onchange = null;
    };
  }, [query]);

  return matches;
}

export function useMobileViewport() {
  return useMediaQuery('(max-width: 767px)');
}

export function useDesktopViewport() {
  return useMediaQuery('(min-width: 1216px)');
}

export function useDesktopOrTabletViewport() {
  return useMediaQuery('(min-width: 768px)');
}
