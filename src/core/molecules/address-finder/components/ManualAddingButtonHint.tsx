import { useAddressFinderContext } from 'core/molecules/address-finder/context';
import Text from 'core/atoms/text/Text';
import Button from 'core/atoms/button';
import React from 'react';
import { IButtonProps } from 'core/atoms/button/interfaces';

const ManualAddingButtonHint: React.FC<IButtonProps> = React.forwardRef<
  HTMLButtonElement,
  IButtonProps
>((props, ref) => {
  const { value, onManualAdding, showManualForm } = useAddressFinderContext();

  if (!value.label || showManualForm) {
    return null;
  }
  return (
    <Button
      size="initial-size"
      type="button"
      color="none"
      withoutDefaultClass
      label={
        <Text size="small" color="teal" className="link">
          Cannot Find Your Address?
        </Text>
      }
      className="formgroup__hint-btn -ml-100"
      {...props}
      ref={ref}
      onClick={onManualAdding}
    />
  );
});

export default ManualAddingButtonHint;
