import React from 'react';
import Select from 'core/atoms/select';
import { sortValues } from './helpers';
import { ISortOrder } from '../../hooks/useSortOrder';

interface IProps {
  isSpecialOffersOrder: boolean;
  sortOrder: ISortOrder;
  onChangeSortOrder: (value: string) => void;
}

const SortOrder = ({
  isSpecialOffersOrder,
  sortOrder,
  onChangeSortOrder,
}: IProps) => {
  return (
    <Select
      value={
        isSpecialOffersOrder ? '' : `${sortOrder.type}_${sortOrder.direction}`
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
