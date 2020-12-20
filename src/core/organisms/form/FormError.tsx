import React from 'react';
import Text from '../../atoms/text';
import { IFormErrorProps } from './interfaces';

const FormError: React.FC<IFormErrorProps> = ({
  children,
  className,
  dataTestId,
}) => (
  <Text
    className={className}
    color="danger"
    invalid
    size="small"
    dataTestId={dataTestId}
  >
    {children}
  </Text>
);

export default React.memo(FormError);
