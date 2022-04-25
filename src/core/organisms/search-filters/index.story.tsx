import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import base from 'paths.macro';

import { atomicDir } from '../../../helpers/atomicDirUtils';

import SearchFilters from './SearchFilters';
import SearchFiltersHead from './SearchFiltersHead';
import SearchFilterTags from './SearchFilterTags';
import Dropdown from '../../atoms/dropdown';
import FormGroup from '../../molecules/formgroup';
import Select from '../../atoms/select';
import Button from '../../atoms/button';
import Checkbox from '../../atoms/checkbox';
import Toggle from '../../atoms/toggle';
import Icon from '../../atoms/icon';
import OptionsIcon from '../../assets/icons/OptionsSharp';
import ChevronUpSharp from '../../assets/icons/ChevronUpSharp';
import {
  searchFilters,
  selectedFilters as presetFilters,
} from './__fixtures__';
import { isTablet, isMobile } from '../../../helpers/windowUtils';

interface ISelectedFiltersState {
  manufacturers: string[];
  budgetTo: string[];
  budgetFrom: string[];
  ranges: string[];
  bodyType: string[];
  transmission: string[];
  fuelType: string[];
}

const initialState = {
  manufacturers: [''],
  budgetTo: [''],
  budgetFrom: [''],
  ranges: [''],
  bodyType: [''],
  transmission: [''],
  fuelType: [''],
};

storiesOf(`${atomicDir(base)}/SearchFilters`, module).add('Default', () =>
  React.createElement(() => {
    const [selectedFiltersState, setSelectedFiltersState] = useState<
      ISelectedFiltersState
    >(presetFilters || initialState);
    const [selectedFilterTags, setSelectedFilterTags] = useState([
      { order: 0, value: '' },
    ]);
    const [isOpenFilter, setFilterExpandStatus] = useState(true);

    useEffect(() => {
      const selected: string[] = Object.entries(selectedFiltersState)
        ?.map(entry => entry[1])
        .flat()
        .filter(Boolean);
      setSelectedFilterTags(
        [...new Set(selected)].map((item, index) => ({
          order: index,
          value: item,
        })),
      );
    }, [selectedFiltersState]);

    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value, name } = event.target;
      setSelectedFiltersState({ ...selectedFiltersState, [name]: [value] });
    };

    const handleChecked = (event: {
      target: { name: any; value: string; checked: boolean };
    }) => {
      // eslint-disable-next-line prefer-destructuring
      const name: keyof typeof selectedFiltersState = event.target.name;
      const { value, checked } = event.target;
      const newSelectedFilters = { ...selectedFiltersState };

      if (!newSelectedFilters[name]) {
        newSelectedFilters[name] = [];
      }

      // Add.
      if (checked) {
        newSelectedFilters[name].push(value);
      }
      // Remove.
      else {
        const index = newSelectedFilters[name].indexOf(value);
        if (index > -1) {
          newSelectedFilters[name].splice(index, 1);
        }
      }

      // Remove duplicates.
      newSelectedFilters[name] = [...new Set(newSelectedFilters[name])];

      setSelectedFiltersState({ ...newSelectedFilters });
    };

    const handleClearAll = () => {
      setSelectedFiltersState(initialState);
      console.log(selectedFiltersState);
    };

    const handleFilterExpand = () => {
      if (isMobile || isTablet) {
        setFilterExpandStatus(prevValue => !prevValue);
      }
    };

    return (
      <div className="row:bg-light -xthin">
        <div className="row:search-filters">
          <SearchFilters isOpen={isOpenFilter}>
            <SearchFiltersHead onClick={handleFilterExpand}>
              <Icon
                icon={<OptionsIcon />}
                className="search-filters--title-icon"
              />
              <span>Filters</span>
              <Icon
                icon={<ChevronUpSharp />}
                className="search-filters--title-icon"
              />
            </SearchFiltersHead>
            <Toggle
              offLabel="Business"
              onLabel="Personal"
              id="contractType"
              className="search-filters--toggle"
            />

            <Dropdown
              label="Make &amp; Model"
              className="search-filters--dropdown"
            >
              <FormGroup label="Select Make">
                <Select
                  name="manufacturers"
                  placeholder="Select Make"
                  onChange={handleSelect}
                  value={
                    selectedFiltersState.manufacturers &&
                    selectedFiltersState.manufacturers[0]
                  }
                >
                  {searchFilters.manufacturers?.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup label="Select Model">
                <Select
                  name="ranges"
                  placeholder="Select Model"
                  onChange={handleSelect}
                  value={
                    selectedFiltersState.ranges &&
                    selectedFiltersState.ranges[0]
                  }
                >
                  {searchFilters.ranges?.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <Button
                size="small"
                color="teal"
                fill="solid"
                className="-fullwidth"
                label="View 277 Results"
              />
            </Dropdown>
            <Dropdown
              label="Budget"
              className="search-filters--dropdown"
              renderProps
            >
              {toggle => (
                <>
                  <FormGroup label="From">
                    <Select
                      name="budgetFrom"
                      onChange={handleSelect}
                      value={
                        selectedFiltersState.budgetFrom &&
                        selectedFiltersState.budgetFrom[0]
                      }
                    >
                      {searchFilters.budget.map(entry => (
                        <option key={entry.value} value={entry.value}>
                          {entry.label}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                  <FormGroup label="To">
                    <Select
                      name="budgetTo"
                      onChange={handleSelect}
                      value={
                        selectedFiltersState.budgetTo &&
                        selectedFiltersState.budgetTo[0]
                      }
                    >
                      {searchFilters.budget.map(entry => (
                        <option key={entry.value} value={entry.value}>
                          {entry.label}
                        </option>
                      ))}
                    </Select>
                  </FormGroup>
                  <Button
                    size="small"
                    color="teal"
                    fill="solid"
                    className="-fullwidth"
                    label="View 277 Results"
                    onClick={toggle}
                  />
                </>
              )}
            </Dropdown>
            <Dropdown label="Body Type" className="search-filters--dropdown">
              <FormGroup>
                {searchFilters.bodyType?.map(({ value, label }) => (
                  <Checkbox
                    onChange={handleChecked}
                    outline
                    name="bodyType"
                    value={value}
                    id={value}
                    key={value}
                    label={label}
                    checked={selectedFiltersState.bodyType.includes(value)}
                  />
                ))}
              </FormGroup>
              <Button
                size="small"
                color="teal"
                fill="solid"
                className="-fullwidth"
                label="View 277 Results"
              />
            </Dropdown>
            <Dropdown label="Transmission" className="search-filters--dropdown">
              <FormGroup>
                {searchFilters.transmission?.map(({ value, label }) => (
                  <Checkbox
                    onChange={handleChecked}
                    outline
                    name="transmission"
                    value={value}
                    id={value}
                    key={value}
                    label={label}
                    checked={selectedFiltersState.transmission.includes(value)}
                  />
                ))}
              </FormGroup>
              <Button
                size="small"
                color="teal"
                fill="solid"
                className="-fullwidth"
                label="View 277 Results"
              />
            </Dropdown>
            <Dropdown label="Fuel Type" className="search-filters--dropdown">
              <FormGroup>
                {searchFilters.fuelType?.map(({ value, label }) => (
                  <Checkbox
                    onChange={handleChecked}
                    outline
                    name="fuelType"
                    value={value}
                    id={value}
                    key={value}
                    label={label}
                  />
                ))}
              </FormGroup>
              <Button
                size="small"
                color="teal"
                fill="solid"
                className="-fullwidth"
                label="View 277 Results"
              />
            </Dropdown>
            <SearchFilterTags
              selectedFilters={selectedFilterTags}
              onClearAll={handleClearAll}
            />
          </SearchFilters>
        </div>
      </div>
    );
  }),
);
