import { useEffect, useState } from 'react';

const useMount = () => {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, [setDidMount]);

  return didMount;
};

export default useMount;
