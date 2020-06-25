import React, { useEffect, useState } from 'react';
import SearchFilters from '@vanarama/uibook/lib/components/organisms/search-filters';
import SearchFiltersHead from '@vanarama/uibook/lib/components/organisms/search-filters/SearchFiltersHead';
import SearchFilterTags from '@vanarama/uibook/lib/components/organisms/search-filters/SearchFilterTags';
import Dropdown from '@vanarama/uibook/lib/components/atoms/dropdown';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Choiceboxes from '@vanarama/uibook/lib/components/atoms/choiceboxes';
import Toggle from '@vanarama/uibook/lib/components/atoms/toggle';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import OptionsIcon from '@vanarama/uibook/lib/assets/icons/Options';
import { filterListByTypes } from 'containers/SearchPodContainer/gql';
import { useForm } from 'react-hook-form';
import {
  makeHandler,
  modelHandler,
} from 'containers/SearchPodContainer/helpers';
import { filtersConfig, budgets } from './config';
import { IFilterContainerProps } from './interfaces';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';

interface ISelectedFiltersState {
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
}

const initialState = {
  bodyStyles: [],
  transmissions: [],
  fuelTypes: [],
};

const FiltersContainer = ({
  isPersonal,
  setType,
  isCarSearch,
}: IFilterContainerProps) => {
  const [filtersData, setFiltersData] = useState({} as IFilterList);
  const [makeData, setMakeData] = useState([] as string[]);
  const [modelsData, setModelsData] = useState([] as string[]);
  const [fromBudget] = useState(budgets);
  const [toBudget] = useState(budgets.slice(1));

  const [selectedFiltersState, setSelectedFiltersState] = useState<
    ISelectedFiltersState
  >(initialState);
  const [selectedFilterTags, setSelectedFilterTags] = useState(['']);

  const { register, getValues, watch, setValue } = useForm();
  const selectMake = watch('make');
  const selectModel = watch('model');
  const selectFrom = watch('from');
  const selectTo = watch('to');

  const { data, refetch } = filterListByTypes(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
  );

  const filtersMapper = {
    make: makeData,
    model: modelsData,
    from: fromBudget,
    to: toBudget,
    bodyStyles: selectedFiltersState.bodyStyles,
    transmissions: selectedFiltersState.transmissions,
    fuelTypes: selectedFiltersState.fuelTypes,
  };

  useEffect(() => {
    if (data?.filterList) {
      setFiltersData(data.filterList);
      setMakeData(makeHandler(data.filterList));
    }
  }, [data]);

  useEffect(() => {
    if (selectMake) {
      setModelsData(modelHandler(filtersData, selectMake));
    }
  }, [selectMake]);

  useEffect(() => {
    
  }, [selectedFilterTags]);

  // toogle personal/bussiness prices
  const toggleHandler = (value: React.ChangeEvent<HTMLInputElement>) =>
    setType(value.target.checked);

  const isInvalidBudget = (value: number, type: string) => {
    if (type === 'from' && (value < selectTo || !selectTo)) {
      return false;
    }
    if (type === 'to' && (value > selectFrom || !selectFrom)) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const selected: string[] = Object.entries({
      ...selectedFiltersState,
      ...getValues(),
    })
      ?.map(entry => entry[1])
      .flat()
      .filter(Boolean);
    setSelectedFilterTags(selected);
  }, [
    selectedFiltersState,
    selectMake,
    selectModel,
    selectFrom,
    selectTo,
    getValues,
  ]);

  const handleChecked = (value, filterName: keyof typeof initialState) => {
    const newSelectedFilters = { ...selectedFiltersState };

    if (!newSelectedFilters[filterName]) newSelectedFilters[filterName] = [];

    // Add.
    if (value.active) newSelectedFilters[filterName].push(value.label);
    // Remove.
    else {
      const index = newSelectedFilters[filterName].indexOf(value.label);
      if (index > -1) newSelectedFilters[filterName].splice(index, 1);
    }
    setSelectedFiltersState({ ...newSelectedFilters });
  };

  const handleClearAll = () => {
    setSelectedFiltersState(initialState);
    console.log(selectedFiltersState);
  };

  const handleRemoveTag = (value: string) => {};

  const choiseBoxBuilder = (data: string[], filterAccessor: keyof typeof filtersMapper) => data?.map((value) => ({label: value, active: filtersMapper[filterAccessor].includes(value)}));


  const getOptions = (field: keyof typeof filtersMapper) =>
    filtersMapper[field];

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
                  ref={register}
                >
                  {filtersMapper[
                    dropdown.accessor as keyof typeof filtersMapper
                  ].map(option =>
                    filter.accessor === 'budget' ? (
                      <option
                        value={option}
                        key={option}
                        disabled={isInvalidBudget(option, dropdown.accessor)}
                      >{`£${option}`}</option>
                    ) : (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ),
                  )}
                </Select>
              </FormGroup>
            ))}
          {filter.contentType === 'multiSelect' && (
            <FormGroup label={filter.label}>
              {filtersData[filter.accessor]?.length > 0 &&
                <Choiceboxes
                  onSubmit={(value) => handleChecked(value, filter.accessor)}
                  choices={choiseBoxBuilder(filtersData[filter.accessor], filter.accessor)}
                  className="-cols-1"
                  color="medium"
                />}
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
        selectedFilters={selectedFilterTags}
        onClearAll={handleClearAll}
        onRemove={handleRemoveTag}
      />
    </SearchFilters>
  );
};

export default FiltersContainer;
