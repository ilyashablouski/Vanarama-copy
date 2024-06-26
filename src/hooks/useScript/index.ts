import { useState, useEffect } from 'react';

import { TCachedScripts, TSrc } from './interfaces';

const cachedScripts: TCachedScripts = [];

export default function useScript(src: TSrc = '') {
  const [state, setState] = useState({
    loaded: false,
    error: false,
  });

  useEffect(
    // eslint-disable-next-line consistent-return
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false,
        });
      } else {
        cachedScripts.push(src);

        // Create script
        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false,
          });
        };

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src);
          if (index >= 0) {
            cachedScripts.splice(index, 1);
          }
          script.remove();

          setState({
            loaded: true,
            error: true,
          });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        // Add script to document body
        document.body.appendChild(script);

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    },
    [src], // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
}
