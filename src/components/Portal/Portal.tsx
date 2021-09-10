import React from 'react';
import { createPortal } from 'react-dom';

import useMount from '../../hooks/useMount';

interface IProps {
  disablePortal?: boolean;
  children?: React.ReactNode;
  container?: HTMLElement;
}

function Portal({ disablePortal, container, children }: IProps) {
  const componentDidMount = useMount();

  if (disablePortal) {
    // in case we need to render children on server side
    return <>{children}</>;
  }

  return componentDidMount
    ? createPortal(children, container ?? document.body)
    : null;
}

export default Portal;
