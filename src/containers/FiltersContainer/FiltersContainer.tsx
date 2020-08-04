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
import ChevronUp from '@vanarama/uibook/lib/assets/icons/ChevronUp';
import ChevronDown from '@vanarama/uibook/lib/assets/icons/ChevronDown';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { useFilterList } from '../SearchPodContainer/gql';
import { makeHandler, modelHandler } from '../SearchPodContainer/helpers';
import { filtersConfig, budgets, filterFields } from './config';
import { IFilterContainerProps } from './interfaces';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';
import { findPreselectFilterValue } from './helpers';

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
  isMakePage,
  isPickups,
}: IFilterContainerProps) => {
  const router = useRouter();
  const [filtersData, setFiltersData] = useState({} as IFilterList);
  const [allFiltersData, setAllFiltersData] = useState({} as IFilterList);
  const [
    shouldMakeChoiceboxesForceUpdate,
    setShouldMakeChoiceboxesForceUpdate,
  ] = useState(false);
  const [makeData, setMakeData] = useState([] as string[]);
  const [modelsData, setModelsData] = useState([] as string[]);
  const [tempFilterName, setTempFilterName] = useState('');
  const [tempModelName, setTempModelName] = useState('');
  const [fromBudget] = useState(budgets.slice(0, budgets.length - 1));
  const [toBudget] = useState(budgets.slice(1));
  const [isOpenFilter, setFilterExpandStatus] = useState(true);
  const [choiceBoxesData, setChoiceBoxesData] = useState(
    {} as IChoiceBoxesData,
  );
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1216px)' });

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

  const { refetch } = useFilterList(
    isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
    isMakePage ? null : isSpecialOffers,
    resp => {
      if (!Object.keys(allFiltersData).length) {
        setAllFiltersData(resp?.filterList || ({} as IFilterList));
        setFiltersData(resp?.filterList || ({} as IFilterList));
        setMakeData(makeHandler(resp?.filterList || ({} as IFilterList)));
      }
      return resp;
    },
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
        max:
          selectedFiltersState.to[0] === '550+'
            ? null
            : parseInt(selectedFiltersState.to[0], 10),
      },
      manufacturerName: selectedFiltersState.make[0],
      rangeName: selectedFiltersState.model[0],
      fuelTypes: selectedFiltersState.fuelTypes,
      bodyStyles: selectedFiltersState.bodyStyles,
      transmissions: selectedFiltersState.transmissions,
    }),
    [selectedFiltersState],
  );

  /** start new search */
  const onViewResults = () => {
    onSearch(filtersObject);
    const filtersObjectForFilters = { ...filtersObject };
    delete filtersObjectForFilters.rate;
    refetch({
      vehicleTypes: isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
      onOffer: isMakePage ? null : isSpecialOffers,
      ...filtersObjectForFilters,
    }).then(resp => {
      // using then because apollo return incorrect cache result https://github.com/apollographql/apollo-client/issues/3550
      setFiltersData(resp.data?.filterList || ({} as IFilterList));
      setMakeData(makeHandler(resp.data?.filterList || ({} as IFilterList)));
      // set force update to true for rerender choiceboxes with new filter data
      setShouldMakeChoiceboxesForceUpdate(true);
    });
  };

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

  useEffect(() => {
    if (filtersData.bodyStyles) setChoiceBoxesData(buildChoiseBoxData());
  }, [filtersData, buildChoiseBoxData]);

  useEffect(() => {
    // if we have query parameters filters should be preselected
    if (
      (Object.keys(router?.query || {}).length &&
        Object.keys(allFiltersData).length) ||
      router.query.isChangePage === 'true'
    ) {
      const presetFilters = {} as ISelectedFiltersState;
      const routerQuery = Object.entries(router.query);
      routerQuery.forEach(entry => {
        const [key, values] = entry;
        if (key === 'rangeName') {
          filtersData.groupedRanges?.forEach(element => {
            const value = findPreselectFilterValue(
              Array.isArray(values) ? values[0] : values,
              element.children,
            );
            // saving model to temp because after set makes model will be removed
            if (value) setTempModelName(value);
          });
          // TODO: check for change state
        } else if (key !== 'pricePerMonth' && key !== 'isChangePage') {
          let query: string | string[];
          // transformation the query value to expected type
          if (!Array.isArray(values)) {
            query = values.split(',').length > 1 ? values.split(',') : values;
          } else {
            query = values;
          }
          presetFilters[key] = Array.isArray(query)
            ? query.map(value =>
                findPreselectFilterValue(
                  value,
                  filtersMapper[key as keyof typeof filtersMapper],
                ),
              )
            : [
                findPreselectFilterValue(
                  query,
                  filtersMapper[key as keyof typeof filtersMapper],
                ),
              ];
        } else if (key !== 'isChangePage') {
          const rate = (values as string).split('|');
          presetFilters.from = [rate[0]] || null;
          presetFilters.to = [rate[1]] || null;
        }
      });
      setSelectedFiltersState(prevState => ({
        ...prevState,
        ...presetFilters,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFiltersData, router.query.isChangePage]);

  useEffect(() => {
    const queryLength = Object.keys(router?.query || {}).length;
    if (!queryLength || (queryLength === 1 && router.query.isChangePage)) {
      setSelectedFiltersState(initialState);
    }
  }, [setSelectedFiltersState, router]);

  useEffect(() => {
    if (!isTabletOrMobile) setFilterExpandStatus(true);
  }, [isTabletOrMobile]);

  useEffect(() => {
    // don't call onSearch already after render
    if (!isInitialLoad) onViewResults();
    if (
      (selectedFilterTags[0] && isInitialLoad) ||
      (isInitialLoad && isMakePage && selectedFiltersState.make[0])
    )
      setInitialLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterTags, isSpecialOffers, isInitialLoad, isPersonal]);

  // set actual models after make changing
  useEffect(() => {
    if (selectedFiltersState.make.length && !isMakePage) {
      setSelectedFiltersState(prevState => ({
        ...prevState,
        model: tempModelName ? [tempModelName] : [],
      }));
      setModelsData(modelHandler(filtersData, selectedFiltersState.make[0]));
      // clear temp model value
      if (tempModelName) setTempModelName('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // makes in make page should not to be added
      .map(entry => {
        if (
          (entry[0] === filterFields.from || entry[0] === filterFields.to) &&
          entry[1]?.[0]
        ) {
          return `£${entry[1]}`;
        }
        return isMakePage && entry[0] === filterFields.make ? '' : entry[1];
      })
      .flat()
      .filter(Boolean);
    setSelectedFilterTags(selected);
  }, [selectedFiltersState, isMakePage]);

  // made force update for choiseboxes state
  useEffect(() => {
    if (shouldMakeChoiceboxesForceUpdate) {
      Object.keys(choiseBoxReference).forEach((e: any) =>
        choiseBoxReference[e]?.current?.updateState(),
      );
      setShouldMakeChoiceboxesForceUpdate(false);
    }
  }, [shouldMakeChoiceboxesForceUpdate, choiseBoxReference]);

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
    const formatedValue = value.replace('£', '');
    const filter = getValueKey(formatedValue) as keyof typeof filtersMapper;
    const newSelectedFiltersState = {
      ...selectedFiltersState,
      [filter]: selectedFiltersState[filter].filter(
        selectedValue => selectedValue !== formatedValue,
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

  /** handle filter expand status */
  const handleFilterExpand = () => {
    if (isTabletOrMobile) setFilterExpandStatus(prevValue => !prevValue);
  };

  return (
    <SearchFilters isOpen={isOpenFilter}>
      <SearchFiltersHead onClick={handleFilterExpand}>
        <Icon icon={<OptionsIcon />} className="search-filters--title-icon" />
        <span>Filters</span>
        <Icon
          icon={isOpenFilter ? <ChevronDown /> : <ChevronUp />}
          className="search-filters--title-icon"
          color="white"
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
                      disabled={
                        isMakePage &&
                        (dropdown.accessor === filterFields.make ||
                          dropdown.accessor === filterFields.model)
                      }
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
                        choices={
                          filter.accessor === filterFields.bodyStyles &&
                          isPickups
                            ? [{ label: 'Pickup', active: true }]
                            : choiceBoxesData[filter.accessor]
                        }
                        className="-cols-1"
                        color="medium"
                        multiSelect
                        disabled={
                          filter.accessor === filterFields.bodyStyles &&
                          isPickups
                        }
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
