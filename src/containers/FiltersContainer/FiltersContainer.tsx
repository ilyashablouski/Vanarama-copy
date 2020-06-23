import React from 'react';
import SearchFilters from '@vanarama/uibook/lib/components/organisms/search-filters';
import SearchFiltersHead from '@vanarama/uibook/lib/components/organisms/search-filters/SearchFiltersHead';
import Dropdown from '@vanarama/uibook/lib/components/atoms/dropdown';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Checkbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import Toggle from '@vanarama/uibook/lib/components/atoms/toggle';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import OptionsIcon from '@vanarama/uibook/lib/assets/icons/Options';
import { filtersConfig } from './config';
import { IFilterContainerProps } from './interfaces';

const FiltersContainer = ({ isPersonal, setType }: IFilterContainerProps) => {
  // toogle personal/bussiness prices
  const toggleHandler = (value: React.ChangeEvent<HTMLInputElement>) =>
    setType(value.target.checked);

  return (
    <SearchFilters>
      <SearchFiltersHead>
        <Heading tag="span" size="lead">
          <Icon
            icon={<OptionsIcon />}
            className="dropdown--icon dropdown--icon-closed"
          />
          &nbsp; Filters
        </Heading>
        <Toggle
          offLabel="Business"
          onLabel="Personal"
          id="contractType"
          onChange={toggleHandler}
          checked={isPersonal}
        />
      </SearchFiltersHead>
      {filtersConfig.map(filter => (
        <Dropdown
          label={filter.label}
          className="search-filters--dropdown"
          key={filter.label}
        >
          {filter.contentType === 'dropdowns' &&
            filter.dropdowns?.map(dropdown => (
              <FormGroup label={dropdown.label} key={dropdown.label}>
                <Select
                  name={dropdown.accessor}
                  placeholder={`Select ${dropdown.accessor}`}
                >
                  <option value="value}">test</option>
                </Select>
              </FormGroup>
            ))}
          {filter.contentType === 'multiSelect' && (
            <FormGroup label={filter.label}>
              <Checkbox
                onChange={() => {}}
                outline
                name={filter.accessor}
                id={filter.accessor}
                label={filter.label}
              />
            </FormGroup>
          )}
          <Button
            size="small"
            color="teal"
            fill="solid"
            className="-fullwidth"
            label="View 277 Results"
          />
        </Dropdown>
      ))}
    </SearchFilters>
  );
};

export default FiltersContainer;
