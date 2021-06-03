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
  const { onEditSuggestion, selectedSuggestion } = useAddressFinderContext();

  if (!selectedSuggestion) {
    return null;
  }

  return (
    <div className={cx('formgroup--editable', className)}>
      <Text
        className="address-finder--input"
        color="dark"
        size="regular"
        dataTestId={dataTestId}
      >
        {selectedSuggestion.label}
      </Text>
      <Link
        className="address-finder--input"
        color="teal"
        onClick={onEditSuggestion}
      >
        Edit
      </Link>
    </div>
  );
};

export default AddressFinderSelected;
