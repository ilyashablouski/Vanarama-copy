import React, { FC } from 'react';
import cx from 'classnames';

import Heading from '../../atoms/heading';
import Text from '../../atoms/text';
import Button from '../../atoms/button';
import CloseSharp from '../../assets/icons/CloseSharp';

import { IModalProps } from './interfaces';

const Modal: FC<IModalProps> = props => {
  const {
    children,
    className,
    containerClassName = 'modal-container-base',
    title,
    text,
    show,
    onRequestClose,
    additionalText,
    dataUiTestIdHeading,
  } = props;

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === 27 && show) {
        onRequestClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onRequestClose, show]);

  return (
    <div
      role="dialog"
      className={cx('modal-wrap :target', { '-open': show }, className)}
    >
      {onRequestClose && (
        <Button
          className="modal-close"
          icon={<CloseSharp />}
          iconPosition="after"
          onClick={onRequestClose}
          label="Close"
          fill="clear"
          name="close"
          dataTestId="close"
        />
      )}
      <div className={cx('modal', containerClassName)}>
        {title && (
          <Heading tag="span" color="black" dataUiTestId={dataUiTestIdHeading}>
            {title}
          </Heading>
        )}
        {text && (
          <Text tag="span" color="darker" size="regular">
            {text}
          </Text>
        )}
        {additionalText && (
          <Text tag="span" color="dark" size="small">
            {additionalText}
          </Text>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
