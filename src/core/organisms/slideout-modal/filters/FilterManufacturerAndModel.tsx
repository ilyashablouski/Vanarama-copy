import React, { FC } from 'react';

import Select from '../../../atoms/select';
import Formgroup from '../../../molecules/formgroup';

import { IFilterManufacturerAndModel } from '../interfaces';

const FilterManufacturerAndModel: FC<IFilterManufacturerAndModel> = props => {
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
          onChange={event => onChange('manufacturers', event.target.value)}
          value={selectedFilters?.manufacturers?.[0] || ''}
        >
          {searchFilters.manufacturers.map(
            (range: { value: string; label: string }) => (
              <option value={range.value}>{range.label}</option>
            ),
          )}
        </Select>
      </Formgroup>
      <Formgroup label="Select Model">
        <Select
          name="range"
          onChange={event => onChange('ranges', event.target.value)}
          value={selectedFilters?.ranges?.[0] || ''}
        >
          {searchFilters.ranges.map(
            (range: { value: string; label: string }) => (
              <option value={range.value}>{range.label}</option>
            ),
          )}
        </Select>
      </Formgroup>
    </>
  );
};

export default React.memo(FilterManufacturerAndModel);
