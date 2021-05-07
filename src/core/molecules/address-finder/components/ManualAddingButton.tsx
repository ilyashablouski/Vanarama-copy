import React from 'react';
import Button from 'core/atoms/button';
import { IButtonProps } from 'core/atoms/button/interfaces';
import { useAddressFinderContext } from '../context';

const ManualAddingButton: React.FC<Omit<
  IButtonProps,
  'value'
>> = React.forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const {
    selectedSuggestion,
    onManualAdding,
    showManualForm,
  } = useAddressFinderContext();

  if (selectedSuggestion || showManualForm) {
    return null;
  }

  return (
    <Button
      color="primary"
      fill="outline"
      label="Or Enter Address Manually"
      size="small"
      type="button"
      className="-fullwidth -mt-400"
      {...props}
      ref={ref}
      onClick={onManualAdding}
    />
  );
});

export default ManualAddingButton;
