import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../../interfaces/base';
import Tile from '../../tile';
import { useAddressFinderContext } from '../context';

const AddressFinderResults: React.FC<IBaseProps> = ({
  className,
  dataTestId,
}) => {
  const {
    data,
    inputFocused,
    onSuggestionSelected,
    selectedSuggestion,
  } = useAddressFinderContext();

  if (!inputFocused || data.length === 0 || selectedSuggestion) {
    return null;
  }

  return (
    <Tile
      className={cx('address-finder--dropdown', className)}
      color="white"
      dataTestId={dataTestId}
      scrollable
    >
      <ul className="address-finder--dropdown--ul">
        {data.map((item, idx) => (
          <li
            key={`${item.id}_${idx.toString()}`}
            onMouseDown={() => onSuggestionSelected(item)}
          >
            <b>{item.text}</b> - {item.description}
          </li>
        ))}
      </ul>
    </Tile>
  );
};

export default AddressFinderResults;
