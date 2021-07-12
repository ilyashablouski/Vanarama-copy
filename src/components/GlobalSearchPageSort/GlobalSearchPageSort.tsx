import React, { useMemo } from 'react';
import ChoiceBoxesV2 from 'core/atoms/choiceboxes/ChoiceboxesV2';
import { sortValues } from './helpers';
import { ProductDerivativeSort } from '../../../generated/globalTypes';

interface IProps {
  sortingValues: typeof sortValues;
  onSortChange: (value: string) => void;
  selectedSort: ProductDerivativeSort;
}

const GlobalSearchPageSort = ({
  sortingValues,
  onSortChange,
  selectedSort,
}: IProps) => {
  const labels = useMemo(() => sortingValues.map(({ text }) => text), [
    sortingValues,
  ]);

  const activeSort = useMemo(() => {
    const sortValue = `${selectedSort.field}_${selectedSort.direction}`;
    return [sortingValues.find(({ value }) => value === sortValue)?.text || ''];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort]);

  const onGetValue = (label: string) => {
    onSortChange(sortingValues.find(({ text }) => text === label)?.value || '');
  };

  return (
    <ChoiceBoxesV2
      values={labels}
      onChange={value => onGetValue(value[0])}
      selectedValues={activeSort}
    />
  );
};

export default GlobalSearchPageSort;
