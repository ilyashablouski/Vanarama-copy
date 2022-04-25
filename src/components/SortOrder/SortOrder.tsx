import React from 'react';

import Select from 'core/atoms/select';

import { SortObject } from '../../../generated/globalTypes';

interface IProps {
  sortOrder: SortObject;
  sortValues: Array<{ text: string; value: string }>;
  isSpecialOffersOrder: boolean;
  onChangeSortOrder: (value: string) => void;
  dataUiTestId?: string;
}

const SortOrder = ({
  sortOrder,
  sortValues,
  isSpecialOffersOrder,
  onChangeSortOrder,
  dataUiTestId,
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
      onChange={event => onChangeSortOrder(event.target.value)}
      dataUiTestId={dataUiTestId}
    >
      {sortValues.map(option => (
        <option
          key={option.value}
          value={option.value}
          data-uitestid={`${dataUiTestId}_${option.value}`}
        >
          {option.text}
        </option>
      ))}
    </Select>
  );
};

export default SortOrder;
