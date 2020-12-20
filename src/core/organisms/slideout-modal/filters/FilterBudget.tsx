import React, { FC } from 'react';

import Select from '../../../atoms/select';
import Formgroup from '../../../molecules/formgroup';

import { IFilterBudget } from '../interfaces';

const FilterBudget: FC<IFilterBudget> = props => {
  const {
    searchFilters,
    setSelectedFiltersState,
    selectedFilters = {},
  } = props;

  const onChange = (id: number, value: number | string) => {
    let budget = { ...selectedFilters.budget };

    budget = id === 0 ? [value, budget[1]] : [budget[0], value];

    setSelectedFiltersState({
      ...selectedFilters,
      budget,
    });
  };

  return (
    <>
      <Formgroup label="From">
        <Select
          name="budgetFrom"
          onChange={e => onChange(0, e.target.value)}
          value={selectedFilters?.budget?.[0] || ''}
        >
          {searchFilters.budget.map((range: any) => (
            <option value={range.value}>{range.label}</option>
          ))}
        </Select>
      </Formgroup>
      <Formgroup label="To">
        <Select
          name="budgetTo"
          onChange={e => onChange(1, e.target.value)}
          value={selectedFilters?.budget?.[1] || ''}
        >
          {searchFilters.budget.map((range: any) => (
            <option value={range.value}>{range.label}</option>
          ))}
        </Select>
      </Formgroup>
    </>
  );
};

export default React.memo(FilterBudget);
