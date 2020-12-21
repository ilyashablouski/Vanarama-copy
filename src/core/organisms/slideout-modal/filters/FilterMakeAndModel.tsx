import React, { FC } from 'react';

import Select from '../../../atoms/select';
import Formgroup from '../../../molecules/formgroup';

import { IFilterMakeAndModel } from '../interfaces';

const FilterMakeAndModel: FC<IFilterMakeAndModel> = props => {
  const {
    searchFilters,
    setSelectedFiltersState,
    selectedFilters = {},
  } = props;

  const onChange = (id: string, value: string) => {
    setSelectedFiltersState({
      ...selectedFilters,
      [id]: [value],
    });
  };

  return (
    <>
      <Formgroup label="Select Make">
        <Select
          name="manufacturer"
          onChange={e => onChange('manufacturers', e.target.value)}
          value={selectedFilters?.manufacturers?.[0] || ''}
        >
          {searchFilters.manufacturers.map((range: any) => (
            <option value={range.value}>{range.label}</option>
          ))}
        </Select>
      </Formgroup>
      <Formgroup label="Select Model">
        <Select
          name="range"
          onChange={e => onChange('ranges', e.target.value)}
          value={selectedFilters?.ranges?.[0] || ''}
        >
          {searchFilters.ranges.map((range: any) => (
            <option value={range.value}>{range.label}</option>
          ))}
        </Select>
      </Formgroup>
    </>
  );
};

export default React.memo(FilterMakeAndModel);
