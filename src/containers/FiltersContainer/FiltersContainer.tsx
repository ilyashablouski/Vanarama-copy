import React, { useEffect, useState, useRef } from 'react';
import SearchFilters from '@vanarama/uibook/lib/components/organisms/search-filters';
import SearchFiltersHead from '@vanarama/uibook/lib/components/organisms/search-filters/SearchFiltersHead';
import SearchFilterTags from '@vanarama/uibook/lib/components/organisms/search-filters/SearchFilterTags';
import Dropdown from '@vanarama/uibook/lib/components/atoms/dropdown';
import FormGroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Select from '@vanarama/uibook/lib/components/atoms/select';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Choiceboxes from '@vanarama/uibook/lib/components/atoms/choiceboxes';
import { IChoice } from '@vanarama/uibook/lib/components/atoms/choiceboxes/interfaces';
import Toggle from '@vanarama/uibook/lib/components/atoms/toggle';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import OptionsIcon from '@vanarama/uibook/lib/assets/icons/Options';
import { filterListByTypes } from '../SearchPodContainer/gql';
import { makeHandler, modelHandler } from '../SearchPodContainer/helpers';
import { filtersConfig, budgets } from './config';
import { IFilterContainerProps } from './interfaces';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';

interface ISelectedFiltersState {
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
  make: string[];
  model: string[];
  from: number[];
  to: number[];
}

interface IChoiceBoxesData {
  bodyStyles: IChoice[];
  transmissions: IChoice[];
  fuelTypes: IChoice[];
  make: IChoice[];
  model: IChoice[];
  from: IChoice[];
  to: IChoice[];
}

const initialState = {
  bodyStyles: [],
  transmissions: [],
  fuelTypes: [],
  make: [],
  model: [],
  from: [],
  to: [],
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
  const [choiceBoxesData, setChoiceBoxesData] = useState(
    {} as IChoiceBoxesData,
  );

  const [selectedFiltersState, setSelectedFiltersState] = useState<
    ISelectedFiltersState
  >(initialState);
  const [selectedFilterTags, setSelectedFilterTags] = useState(['']);

  const choiseBoxReference = {} as any;

  const getOrCreateRef = (id: keyof typeof choiceBoxesData) => {
    if (!choiseBoxReference.hasOwnProperty(id)) {
      choiseBoxReference[id] = React.createRef();
    }
    return choiseBoxReference[id];
  };

  const { data, refetch } = filterListByTypes(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
  );

  const filtersMapper = {
    make: makeData,
    model: modelsData,
    from: fromBudget,
    to: toBudget,
    bodyStyles: filtersData.bodyStyles,
    transmissions: filtersData.transmissions,
    fuelTypes: filtersData.fuelTypes,
  };

  useEffect(() => {
    if (data?.filterList) {
      setFiltersData(data.filterList);
      setMakeData(makeHandler(data.filterList));
    }
  }, [data]);

  useEffect(() => {
    if (filtersData.bodyStyles) setChoiceBoxesData(buildChoiseBoxData());
  }, [filtersData]);

  useEffect(() => {
    if (selectedFiltersState.make) {
      setModelsData(modelHandler(filtersData, selectedFiltersState.make[0]));
    }
  }, [selectedFiltersState.make]);

  useEffect(() => {}, [selectedFilterTags]);

  // toogle personal/bussiness prices
  const toggleHandler = (value: React.ChangeEvent<HTMLInputElement>) =>
    setType(value.target.checked);

  const getValueKey = (value: string) => {
    const arr = Object.entries(selectedFiltersState);
    return arr.find(filter => filter[1].includes(value))[0] || '';
  };

  const isInvalidBudget = (value: number, type: string) => {
    if (
      type === 'from' &&
      (value < selectedFiltersState.to[0] || !selectedFiltersState.to[0])
    ) {
      return false;
    }
    if (
      type === 'to' &&
      (value > selectedFiltersState.from[0] || !selectedFiltersState.from[0])
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const selected: string[] = Object.entries(selectedFiltersState)
      ?.map(entry => entry[1])
      .flat()
      .filter(Boolean);
    setSelectedFilterTags(selected);
  }, [selectedFiltersState]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setSelectedFiltersState({ ...selectedFiltersState, [name]: [value] });
  };

  const handleChecked = (
    value: IChoice,
    filterName: keyof typeof initialState,
  ) => {
    const newSelectedFilters = { ...selectedFiltersState };
    if (!newSelectedFilters[filterName]) newSelectedFilters[filterName] = [];

    // Add.
    if (value.active)
      newSelectedFilters[filterName] = [
        ...newSelectedFilters[filterName],
        value.label,
      ];
    // Remove.
    else {
      newSelectedFilters[filterName] = newSelectedFilters[filterName].filter(
        filter => value.label !== filter,
      );
    }
    setSelectedFiltersState({ ...newSelectedFilters });
    setChoiceBoxesData({
      ...choiceBoxesData,
      [filterName]: choiseBoxBuilder(choiceBoxesData[filterName], filterName),
    });
  };

  const handleClearAll = () => {
    setSelectedFiltersState(initialState);
  };

  const handleRemoveTag = (value: string) => {
    const filter = getValueKey(value);

    setSelectedFiltersState({
      ...selectedFiltersState,
      [filter]: selectedFiltersState[filter].filter(
        selectedValue => selectedValue !== value,
      ),
    });
    if (choiseBoxReference[filter]) {
      setChoiceBoxesData({
        ...choiceBoxesData,
        [filter]: choiseBoxBuilder(choiceBoxesData[filter], filter),
      });
      choiseBoxReference[filter].current.updateState();
      console.log(selectedFiltersState);
    }
  };

  const choiseBoxBuilder = (
    data: IChoice[],
    filterAccessor: keyof typeof filtersMapper,
  ) =>
    data?.map((value: IChoice) => ({
      ...value,
      active: selectedFiltersState[filterAccessor].includes(value.label),
    }));

  const buildChoiseBoxData = () => {
    const choises = {} as IChoiceBoxesData;
    for (const [key] of Object.entries(filtersMapper)) {
      choises[key] = filtersMapper[key]?.map((value: IChoice) => ({
        label: value,
        active: selectedFiltersState[key].includes(value),
      }));
    }
    return choises;
  };

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
                  onChange={handleSelect}
                  value={selectedFiltersState[dropdown.accessor]?.[0]}
                >
                  {filtersMapper[
                    dropdown.accessor as keyof typeof filtersMapper
                  ]?.map(option =>
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
              {choiceBoxesData[filter.accessor]?.length > 0 && (
                <Choiceboxes
                  onSubmit={value => handleChecked(value, filter.accessor)}
                  choices={choiceBoxesData[filter.accessor]}
                  className="-cols-1"
                  color="medium"
                  multiSelect
                  ref={getOrCreateRef(filter.accessor)}
                />
              )}
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
        onRemove={e => handleRemoveTag(e.currentTarget.id)}
      />
    </SearchFilters>
  );
};

export default FiltersContainer;
