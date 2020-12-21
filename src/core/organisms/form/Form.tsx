import cx from 'classnames';
import React from 'react';
import { IFormProps } from './interfaces';

const Form: React.FC<IFormProps> = ({
  children,
  className,
  dataTestId,
  invalid,
  onSubmit,
  ...rest
}) => (
  <form
    {...rest}
    className={cx('form', { '-invalid': invalid }, className)}
    data-testid={dataTestId}
    onSubmit={onSubmit}
  >
    {children}
  </form>
);

export default React.memo(Form);
