import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
import OptionsIcon from '@vanarama/uibook/lib/assets/icons/Options';
import ChevronUpSharp from '@vanarama/uibook/lib/assets/icons/ChevronUpSharp';
import { filterListByTypes } from '../SearchPodContainer/gql';
import { makeHandler, modelHandler } from '../SearchPodContainer/helpers';
import { filtersConfig, budgets } from './config';
import { IFilterContainerProps } from './interfaces';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';

interface ISelectedFiltersState {
  [index: string]: string[];
}

interface IChoiceBoxesData {
  [index: string]: IChoice[];
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
  onSearch,
  preSearchVehicleCount,
  isSpecialOffers,
}: IFilterContainerProps) => {
  const [filtersData, setFiltersData] = useState({} as IFilterList);
  const [makeData, setMakeData] = useState([] as string[]);
  const [modelsData, setModelsData] = useState([] as string[]);
  const [tempFilterName, setTempFilterName] = useState('');
  const [fromBudget] = useState(budgets);
  const [toBudget] = useState(budgets.slice(1));
  const [choiceBoxesData, setChoiceBoxesData] = useState(
    {} as IChoiceBoxesData,
  );

  const [selectedFiltersState, setSelectedFiltersState] = useState<
    ISelectedFiltersState
  >(initialState);
  const [selectedFilterTags, setSelectedFilterTags] = useState(['']);
  const [isInitialLoad, setInitialLoad] = useState(true);

  const choiseBoxReference = {} as any;

  /** create ref object for every multiselect dropdown. For call Choiseboxes component update method */
  const getOrCreateRef = (id: keyof typeof choiceBoxesData) => {
    if (!Object.prototype.hasOwnProperty.call(choiseBoxReference, id)) {
      choiseBoxReference[id] = React.createRef();
    }
    return choiseBoxReference[id];
  };

  const { data } = filterListByTypes(
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

  /** build correct data for choiseboxes component */
  const buildChoiseBoxData = useCallback(
    (state = selectedFiltersState) => {
      const filters = {
        bodyStyles: filtersData.bodyStyles,
        transmissions: filtersData.transmissions,
        fuelTypes: filtersData.fuelTypes,
      };
      const choisesObject = {} as IChoiceBoxesData;
      Object.keys(filters).forEach(key => {
        choisesObject[key] =
          filters[key as keyof typeof filters]?.map(value => ({
            label: value,
            active: state[key].includes(value),
          })) || [];
      });
      return choisesObject;
    },
    [filtersData, selectedFiltersState],
  );

  /** memo object for search filter */
  const filtersObject = useMemo(
    () => ({
      rate: {
        min: parseInt(selectedFiltersState.from[0], 10),
        max: parseInt(selectedFiltersState.to[0], 10),
      },
      manufacturerName: selectedFiltersState.make[0],
      range: selectedFiltersState.model[0],
      fuelTypes: selectedFiltersState.fuelTypes,
      bodyStyles: selectedFiltersState.bodyStyles,
      transmissions: selectedFiltersState.transmissions,
    }),
    [selectedFiltersState],
  );

  /** start new search */
  const onViewResults = useCallback(() => {
    onSearch(filtersObject);
  }, [onSearch, filtersObject]);

  /** changing data for choiseboxes component */
  const choiseBoxBuilder = (
    choises: IChoice[],
    filterAccessor: keyof typeof filtersMapper,
    actualState = selectedFiltersState,
  ) =>
    choises?.map((value: IChoice) => ({
      ...value,
      active: actualState[filterAccessor].includes(value.label),
    }));

  // set data to filters
  useEffect(() => {
    if (data?.filterList) {
      setFiltersData(data.filterList);
      setMakeData(makeHandler(data.filterList));
    }
  }, [data]);

  useEffect(() => {
    if (filtersData.bodyStyles) setChoiceBoxesData(buildChoiseBoxData());
  }, [filtersData, buildChoiseBoxData]);

  useEffect(() => {
    // don't call onSearch already after render
    if (!isInitialLoad) onViewResults();
    if (selectedFilterTags[0] && isInitialLoad) setInitialLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterTags, isSpecialOffers, isInitialLoad]);

  // set actual models after make changing
  useEffect(() => {
    if (selectedFiltersState.make) {
      setModelsData(modelHandler(filtersData, selectedFiltersState.make[0]));
    }
  }, [selectedFiltersState.make, filtersData]);

  // hack for subscribe multiselects changes and update Choiceboxes state
  useEffect(() => {
    if (tempFilterName === 'all') {
      Object.keys(choiseBoxReference).forEach((e: any) =>
        choiseBoxReference[e]?.current?.updateState(),
      );
      setTempFilterName('');
    } else if (tempFilterName) {
      choiseBoxReference[tempFilterName].current.updateState();
      setTempFilterName('');
    }
  }, [tempFilterName, setTempFilterName, choiseBoxReference]);

  // toogle personal/bussiness prices
  const toggleHandler = (value: React.ChangeEvent<HTMLInputElement>) =>
    setType(value.target.checked);

  /** get parent filter name after deleting a tag */
  const getValueKey = (value: string) => {
    const arr = Object.entries(selectedFiltersState) || [];
    return arr.find(filter => filter[1].includes(value))?.[0] || '';
  };

  /** check budget rules for valid value */
  const isInvalidBudget = (value: string, type: string) => {
    if (
      (type === 'from' &&
        (value < selectedFiltersState.to[0] || !selectedFiltersState.to[0])) ||
      (type === 'to' &&
        (value > selectedFiltersState.from[0] || !selectedFiltersState.from[0]))
    ) {
      return false;
    }
    return true;
  };

  // subscribe for change applied filters value for manage tags state
  useEffect(() => {
    const selected: string[] = Object.entries(selectedFiltersState)
      .map(entry => entry[1])
      .flat()
      .filter(Boolean);
    setSelectedFilterTags(selected);
  }, [selectedFiltersState]);

  /** handle for dropdowns */
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setSelectedFiltersState({ ...selectedFiltersState, [name]: [value] });
  };

  /** handler for multiselect */
  const handleChecked = (
    value: IChoice,
    filterName: keyof typeof initialState,
  ) => {
    const newSelectedFilters = { ...selectedFiltersState };
    if (!newSelectedFilters[filterName]) newSelectedFilters[filterName] = [];

    // Add.
    if (value.active)
      newSelectedFilters[filterName] = [
        ...selectedFiltersState[filterName],
        value.label,
      ];
    // Remove.
    else {
      newSelectedFilters[filterName] = selectedFiltersState[filterName].filter(
        (filter: string | number) => value.label !== filter,
      );
    }
    setSelectedFiltersState({ ...newSelectedFilters });
    setChoiceBoxesData({
      ...choiceBoxesData,
      [filterName]: choiseBoxBuilder(
        choiceBoxesData[filterName],
        filterName,
        newSelectedFilters,
      ),
    });
  };

  /**
   * clear all filters
   */
  const handleClearAll = () => {
    setSelectedFiltersState(initialState);
    setChoiceBoxesData(buildChoiseBoxData(initialState));
    setTempFilterName('all');
  };

  /**
   * remove value from filter after deleting tag
   */
  const handleRemoveTag = (value: string) => {
    const filter = getValueKey(value) as keyof typeof filtersMapper;
    const newSelectedFiltersState = {
      ...selectedFiltersState,
      [filter]: selectedFiltersState[filter].filter(
        selectedValue => selectedValue !== value,
      ),
    };

    setSelectedFiltersState({
      ...newSelectedFiltersState,
    });
    if (choiseBoxReference[filter]) {
      setChoiceBoxesData(() => ({
        ...choiceBoxesData,
        [filter]: choiseBoxBuilder(
          choiceBoxesData[filter],
          filter,
          newSelectedFiltersState,
        ),
      }));
      setTempFilterName(filter);
    }
  };

  /**
   * clear opened filter
   */
  const clearFilter = (filterName: keyof typeof filtersMapper) => {
    const newSelectedFiltersState = {
      ...selectedFiltersState,
      [filterName]: [],
    };
    setSelectedFiltersState({ ...newSelectedFiltersState });
    setChoiceBoxesData(() => ({
      ...choiceBoxesData,
      [filterName]: choiseBoxBuilder(
        choiceBoxesData[filterName],
        filterName,
        newSelectedFiltersState,
      ),
    }));
    setTempFilterName(filterName);
  };

  return (
    <SearchFilters>
      <SearchFiltersHead>
        <Icon icon={<OptionsIcon />} className="search-filters--title-icon" />
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
        onChange={toggleHandler}
        checked={isPersonal}
        className="search-filters--toggle"
      />
      {filtersConfig.map(filter => (
        <Dropdown
          label={filter.label}
          className="search-filters--dropdown"
          key={filter.label}
          renderProps
        >
          {toggle => (
            <>
              {filter.contentType === 'dropdowns' &&
                filter.dropdowns?.map(dropdown => (
                  <FormGroup label={dropdown.label} key={dropdown.label}>
                    <Select
                      name={dropdown.accessor}
                      placeholder={`Select ${dropdown.accessor}`}
                      onChange={handleSelect}
                      value={
                        selectedFiltersState[
                          dropdown.accessor as keyof typeof filtersMapper
                        ]?.[0]
                      }
                    >
                      {filtersMapper[
                        dropdown.accessor as keyof typeof filtersMapper
                      ]?.map(option =>
                        filter.accessor === 'budget' ? (
                          <option
                            value={option}
                            key={option}
                            disabled={isInvalidBudget(
                              option,
                              dropdown.accessor,
                            )}
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
                <>
                  {selectedFiltersState[
                    filter.accessor as keyof typeof filtersMapper
                  ]?.length > 0 && (
                    <div className="dropdown--header">
                      <div className="dropdown--header-text">
                        <span className="dropdown--header-count">{`${
                          selectedFiltersState[
                            filter.accessor as keyof typeof filtersMapper
                          ]?.length
                        } Selected`}</span>
                        <div className="dropdown--header-selected">
                          {selectedFiltersState[
                            filter.accessor as keyof typeof filtersMapper
                          ].map(value => (
                            <span key={value}>{value},</span>
                          ))}
                        </div>
                      </div>
                      <Button
                        size="small"
                        color="teal"
                        fill="outline"
                        label="Clear"
                        onClick={() =>
                          clearFilter(
                            filter.accessor as keyof typeof filtersMapper,
                          )
                        }
                      />
                    </div>
                  )}

                  <FormGroup label={filter.label} dataTestId={filter.label}>
                    {choiceBoxesData[filter.accessor]?.length > 0 && (
                      <Choiceboxes
                        onSubmit={value =>
                          handleChecked(
                            value,
                            filter.accessor as keyof typeof filtersMapper,
                          )
                        }
                        choices={choiceBoxesData[filter.accessor]}
                        className="-cols-1"
                        color="medium"
                        multiSelect
                        ref={getOrCreateRef(filter.accessor)}
                      />
                    )}
                  </FormGroup>
                </>
              )}
              <Button
                size="small"
                color="teal"
                fill="solid"
                className="-fullwidth"
                label={`View ${preSearchVehicleCount} Results`}
                dataTestId={`${filter.label}btn`}
                onClick={toggle}
              />
            </>
          )}
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
