import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../../interfaces/base';
import Link from '../../../atoms/link';
import Text from '../../../atoms/text';
import { useAddressFinderContext } from '../context';

const AddressFinderSelected: React.FC<IBaseProps> = ({
  className,
  dataTestId,
}) => {
  const { onClearSuggestion, selectedSuggestion } = useAddressFinderContext();
  if (!selectedSuggestion) {
    return null;
  }

  console.log('+>+>+>', selectedSuggestion.label);

  return (
    <div className={cx('formgroup--editable', className)}>
      <Text className="address-finder--input" color="dark" size="regular">
        {selectedSuggestion.label}
      </Text>
      <Link
        className="address-finder--input"
        color="teal"
        dataTestId={dataTestId}
        onClick={onClearSuggestion}
      >
        Edit
      </Link>
    </div>
  );
};

export default AddressFinderSelected;
