import { useState, useRef, useCallback } from 'react';

// Hover state hook
// Returns a tuple of [ref, hovered]
// - ref: A react ref that you need to assign to an element
// - hovered: A boolean, true if hovered and false otherwise

export const useHover = <T extends HTMLElement>(): [
  (node?: T | null) => void,
  boolean,
] => {
  const [value, setValue] = useState(false);

  // Wrap in useCallback so we can use in dependencies below
  const handleMouseOver = useCallback(() => setValue(true), []);
  const handleMouseOut = useCallback(() => setValue(false), []);

  // Keep track of the last node passed to callbackRef
  // so we can remove its event listeners.
  const ref = useRef<T>();

  // Use a callback ref instead of useEffect so that event listeners
  // get changed in the case that the returned ref gets added to
  // a different element later. With useEffect, changes to ref.current
  // wouldn't cause a rerender and thus the effect would run again.
  const callbackRef = useCallback<(node?: null | T) => void>(
    node => {
      if (ref.current) {
        ref.current.removeEventListener('mouseenter', handleMouseOver);
        ref.current.removeEventListener('mouseleave', handleMouseOut);
      }

      ref.current = node || undefined;

      if (ref.current) {
        ref.current.addEventListener('mouseenter', handleMouseOver);
        ref.current.addEventListener('mouseleave', handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut],
  );

  return [callbackRef, value];
};

export default useHover;
