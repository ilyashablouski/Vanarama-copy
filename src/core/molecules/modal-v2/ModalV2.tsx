import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';

import Button from 'core/atoms/button/Button';
import CloseSharp from 'core/assets/icons/CloseSharp';
import { IBaseProps } from 'core/interfaces/base';

import useMount from '../../../hooks/useMount';

interface IProps extends IBaseProps {
  open: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

function ModalV2({ className, open, children, onClose }: IProps) {
  const didMount = useMount();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        onClose?.();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return didMount && open
    ? createPortal(
        <div
          role="dialog"
          className={cx('modal-v2', className, {
            '-open': open,
          })}
        >
          {onClose && (
            <Button
              className="modal-v2__close"
              icon={<CloseSharp />}
              aria-label="close"
              iconPosition="after"
              label="Close"
              fill="clear"
              dataTestId="close"
              color="inherit"
              onClick={onClose}
            />
          )}
          {children}
        </div>,
        document.body,
      )
    : null;
}

export default ModalV2;
