import cx from 'classnames';
import React from 'react';
import { toast, ToastContainer as Container } from 'react-toastify';
import AlertCircleSharp from '../../assets/icons/AlertCircleSharp';
import { TColor } from '../../../types/color';
import Heading from '../heading';
import Icon from '../icon';
import Text from '../text';
import { IToastProps, ToastFn, ToastVariant } from './interfaces';

const Toast: React.FC<IToastProps> = ({
  className,
  dataTestId,
  message,
  title,
  variant,
}) => (
  <div className={cx('toast--inner', className)} data-testid={dataTestId}>
    <Icon color={getIconColor(variant)} icon={<AlertCircleSharp />} />
    <div>
      <Heading tag="span" color="black" size="regular">
        {title}
      </Heading>
      <Text tag="p" size="small" color="dark">
        {message}
      </Text>
    </div>
  </div>
);

function getIconColor(variant: ToastVariant): TColor {
  switch (variant) {
    case 'error':
      return 'danger';
    case 'warning':
      return 'warning';
    case 'success':
      return 'success';
    default:
      return 'darker';
  }
}

export const ToastContainer = Container;

export const error: ToastFn = (title, message, options) =>
  toast.error(
    <Toast {...options} title={title} message={message} variant="error" />,
  );

export const info: ToastFn = (title, message, options) =>
  toast.info(
    <Toast {...options} title={title} message={message} variant="info" />,
  );

export const warning: ToastFn = (title, message, options) =>
  toast.warning(
    <Toast {...options} title={title} message={message} variant="warning" />,
  );

export const success: ToastFn = (title, message, options) =>
  toast.success(
    <Toast {...options} title={title} message={message} variant="success" />,
  );
