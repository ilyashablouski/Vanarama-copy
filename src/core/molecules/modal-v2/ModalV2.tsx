import React, { useEffect } from 'react';
import cx from 'classnames';

import Button from 'core/atoms/button/Button';
import CloseSharp from 'core/assets/icons/CloseSharp';
import { IBaseProps } from 'core/interfaces/base';
import Portal from '../../../components/Portal/Portal';
import { TModalColor } from '../../../types/color';

interface IProps extends IBaseProps {
  color?: TModalColor;
  withCloseLabel?: boolean;
  open: boolean;
  disablePortal?: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

function ModalV2({
  className,
  color = 'primary',
  withCloseLabel,
  open,
  disablePortal,
  children,
  onClose,
}: IProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return open ? (
    <Portal disablePortal={disablePortal}>
      <div
        role="dialog"
        className={cx('modal-v2', className, `-${color}`, {
          '-open': open,
        })}
      >
        {onClose && (
          <Button
            className="modal-v2__close"
            icon={<CloseSharp />}
            aria-label="close"
            iconPosition="after"
            label={withCloseLabel && 'Close'}
            fill="clear"
            dataTestId="close"
            color="inherit"
            onClick={onClose}
          />
        )}
        {children}
      </div>
    </Portal>
  ) : null;
}

export default ModalV2;
