import React from 'react';

import Select from 'core/atoms/select';

import { SortObject } from '../../../generated/globalTypes';

interface IProps {
  sortOrder: SortObject;
  sortValues: Array<{ text: string; value: string }>;
  isSpecialOffersOrder: boolean;
  onChangeSortOrder: (value: string) => void;
}

const SortOrder = ({
  sortOrder,
  sortValues,
  isSpecialOffersOrder,
  onChangeSortOrder,
}: IProps) => {
  return (
    <Select
      value={
        isSpecialOffersOrder ||
        !sortValues.find(
          ({ value }) => value === `${sortOrder.field}_${sortOrder.direction}`,
        )
          ? ''
          : `${sortOrder.field}_${sortOrder.direction}`
      }
      onChange={e => onChangeSortOrder(e.target.value)}
    >
      {sortValues.map(option => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </Select>
  );
};

export default SortOrder;
