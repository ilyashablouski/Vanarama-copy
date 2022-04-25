import React, { FC, ChangeEvent } from 'react';

import Checkbox from '../../../atoms/checkbox';

import { IFilterCheckboxes } from '../interfaces';

const FilterCheckboxes: FC<IFilterCheckboxes> = props => {
  const {
    name,
    searchFilters,
    setSelectedFiltersState,
    selectedFilters = {},
  } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    const newSelectedFilters = { ...selectedFilters };

    // Create array if not exists.
    if (!newSelectedFilters[name]) {
      newSelectedFilters[name] = [];
    }

    // Add.
    if (checked) {
      newSelectedFilters[name].push(value);
    }
    // Remove.
    else {
      const index = selectedFilters[name].indexOf(value);
      if (index > -1) {
        selectedFilters[name].splice(index, 1);
      }
    }

    // Remove duplicates.
    newSelectedFilters[name] = [...new Set(newSelectedFilters[name])];

    setSelectedFiltersState({
      ...selectedFilters,
      ...newSelectedFilters,
    });
  };

  return (
    <>
      {searchFilters[name].map(entry => (
        <Checkbox
          id={entry.value}
          key={entry.value}
          name={name}
          label={entry.label}
          value={entry.value}
          checked={selectedFilters[name]?.includes(entry.value)}
          onChange={onChange}
        />
      ))}
    </>
  );
};

export default React.memo(FilterCheckboxes);
