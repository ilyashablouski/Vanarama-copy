import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import SearchFilters from '@vanarama/uibook/lib/components/organisms/search-filters';
import SearchFiltersHead from '@vanarama/uibook/lib/components/organisms/search-filters/SearchFiltersHead';
import SearchFilterTags from '@vanarama/uibook/lib/components/organisms/search-filters/SearchFilterTags';
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
import SearchPod from '../../components/SearchPod';
import { IFilterContainerProps } from './interfaces';

const FiltersContainer = ({isPersonal, setType}: IFilterContainerProps) => {
  // const [selectedFiltersState, setSelectedFiltersState] = useState(
  //   presetFilters || initialState,
  // );
  // const [selectedFilterTags, setSelectedFilterTags] = useState(['']);

  // useEffect(() => {
  //   const selected: string[] = Object.entries(selectedFiltersState)
  //     ?.map(entry => entry[1])
  //     .flat()
  //     .filter(Boolean);
  //   setSelectedFilterTags([...new Set(selected)]);
  // }, [selectedFiltersState]);

  // const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value, name } = e.target;
  //   setSelectedFiltersState({ ...selectedFiltersState, [name]: [value] });
  // };

  // const handleChecked = (e: {
  //   target: { name: any; value: string; checked: boolean };
  // }) => {
  //   // eslint-disable-next-line prefer-destructuring
  //   const name: keyof typeof selectedFiltersState = e.target.name;
  //   const { value, checked } = e.target;
  //   const newSelectedFilters = { ...selectedFiltersState };

  //   if (!newSelectedFilters[name]) newSelectedFilters[name] = [];

  //   // Add.
  //   if (checked) newSelectedFilters[name].push(value);
  //   // Remove.
  //   else {
  //     const index = newSelectedFilters[name].indexOf(value);
  //     if (index > -1) newSelectedFilters[name].splice(index, 1);
  //   }

  //   // Remove duplicates.
  //   newSelectedFilters[name] = [...new Set(newSelectedFilters[name])];

  //   setSelectedFiltersState({ ...newSelectedFilters });
  // };

  // const handleClearAll = () => {
  //   setSelectedFiltersState(initialState);
  //   console.log(selectedFiltersState);
  // };
  const  toggleHandler = (value) => setType(value.target.checked)
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
        <Toggle offLabel="Business" onLabel="Personal" id="contractType" onChange={toggleHandler} checked={isPersonal}/>
      </SearchFiltersHead>
      {filtersConfig.map((filter) => (
        <Dropdown label={filter.label} className="search-filters--dropdown">
          {filter.contentType === 'dropdowns' && (
            filter.dropdowns?.map((dropdown)=>(
              <FormGroup label={dropdown.label}>
                <Select
                  name={dropdown.accessor}
                  placeholder={`Select ${dropdown.accessor}`}
                >
                    <option value="value}">
                      "test"
                    </option>
                </Select>
              </FormGroup>
            ))
          )}
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
      
      <SearchFilterTags
        selectedFilters={['']}
        onClearAll={()=>{}}
      />
    </SearchFilters>
  );
};

export default FiltersContainer;
