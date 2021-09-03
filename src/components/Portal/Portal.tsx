import React from 'react';
import { createPortal } from 'react-dom';

import useMount from '../../hooks/useMount';

interface IProps {
  disablePortal?: boolean;
  children?: React.ReactNode;
}

function Portal({ disablePortal, children }: IProps) {
  const didMount = useMount();

  if (disablePortal) {
    return <>{children}</>;
  }

  return didMount ? createPortal(children, document.body) : null;
}

export default Portal;
