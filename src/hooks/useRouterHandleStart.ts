import { useEffect, useState } from 'react';
import { NextRouter } from 'next/router';

export default function useRouterHandleStart(router: NextRouter) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url.includes('/account') && router.asPath !== url) {
        setIsLoading(true);
      }
    };
    router.events.on('routeChangeStart', handleStart);
    return () => {
      router.events.off('routeChangeStart', handleStart);
    };
  }, [router.asPath, router.events]);

  return isLoading;
}
