import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/** using for skip execuitng after first render setState case */
const useFirstRenderEffect = (func: EffectCallback, deps: DependencyList) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useFirstRenderEffect;
