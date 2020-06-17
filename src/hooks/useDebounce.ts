import { useEffect, useRef, useState } from 'react';

/**
 * Returns an updated value after the debounce period has expired.
 */
export default function useDebounce<T>(value: T, delay: number = 250) {
  const justMounted = useRef(true);
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    if (justMounted.current) {
      justMounted.current = false;
      return undefined;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}
