import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../../interfaces/base';
import Link from '../../../atoms/link';
import Text from '../../../atoms/text';
import { useAddressFinderContext } from '../context';
import { suggestionToDisplay } from '../utils';

const AddressFinderIntermediate: React.FC<IBaseProps> = ({
  className,
  dataTestId,
}) => {
  const { intermediate, onClearIntermediate } = useAddressFinderContext();
  if (!intermediate) {
    return null;
  }

  return (
    <div className={cx('address-finder--spacer', className)}>
      <Text color="darker" size="regular">
        {suggestionToDisplay(intermediate)}
      </Text>
      <Link color="teal" dataTestId={dataTestId} onClick={onClearIntermediate}>
        Change
      </Link>
    </div>
  );
};

export default AddressFinderIntermediate;
