import React from 'react';
import { IAddressFinderProps } from '@vanarama/uibook/lib/components/molecules/address-finder/interfaces';

/**
 * This component is mocked because otherwise it will make a real XHR call to Loqate
 */
export default function AddressFinder({
  id,
  dataTestId,
  onChange,
}: IAddressFinderProps) {
  return (
    <input
      id={id}
      data-testid={dataTestId}
      onChange={e => {
        onChange({
          id: e.target.value,
          address: e.target.value,
        });
      }}
    />
  );
}
