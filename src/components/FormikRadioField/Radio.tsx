import UIBookRadio from '@vanarama/uibook/lib/components/atoms/radio';
import { IRadioProps } from '@vanarama/uibook/lib/components/atoms/radio/interfaces';
import React from 'react';
import { useFormikRadioContext } from './FormikRadioContext';

const Radio: React.FC<IRadioProps> = ({ value, ...props }) => {
  const { field, helpers, name } = useFormikRadioContext();
  return (
    <UIBookRadio
      {...props}
      {...field}
      name={name}
      value={value}
      checked={field.value === value}
      onChange={() => helpers.setValue(value)}
    />
  );
};

export default Radio;
