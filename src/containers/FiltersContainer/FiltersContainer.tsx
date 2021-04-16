import React, { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Select from 'core/atoms/select';
import Choiceboxes from 'core/atoms/choiceboxes';
import { IChoice } from 'core/atoms/choiceboxes/interfaces';
import { useRouter } from 'next/router';
import useMediaQuery from '../../hooks/useMediaQuery';
import { isArraySame } from '../../utils/helpers';
import { useFilterList } from '../SearchPodContainer/gql';
import { makeHandler, modelHandler } from '../SearchPodContainer/helpers';
import { filtersConfig, budgets, FilterFields } from './config';
import { IFilterContainerProps, ISelectedFiltersState } from './interfaces';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  filterList_filterList as IFilterList,
  filterList_filterList_groupedRangesWithSlug_children as IFiltersChildren,
} from '../../../generated/filterList';
import {
  findPreselectFilterValue,
  buildPreselectChoiseboxes,
  isInclude,
  filtersSearchMapper,
  getLabelForSlug,
  setFiltersAfterPageChange,
  filterOrderByNumMap,
} from './helpers';
import Skeleton from '../../components/Skeleton';
import { dynamicQueryTypeCheck } from '../SearchPageContainer/helpers';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const SearchFilters = dynamic(() => import('core/organisms/search-filters'), {
  loading: () => <Skeleton count={1} />,
});
const SearchFiltersHead = dynamic(
  () => import('core/organisms/search-filters/SearchFiltersHead'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const SearchFilterTags = dynamic(
  () => import('core/organisms/search-filters/SearchFilterTags'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Dropdown = dynamic(() => import('core/atoms/dropdown'), {
  loading: () => <Skeleton count={1} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'));
const Toggle = dynamic(() => import('core/atoms/toggle'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});
const OptionsIcon = dynamic(() => import('core/assets/icons/Options'));
const ChevronUp = dynamic(() => import('core/assets/icons/ChevronUp'));
const ChevronDown = dynamic(() => import('core/assets/icons/ChevronDown'));

interface IChoiceBoxesData {
  [index: string]: IChoice[];
}

interface ISelectedWithOrder {
  order: number;
  value: string;
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
  setIsSpecialOffers,
  isMakePage,
  isPickups,
  isRangePage,
  isModelPage,
  isAllMakesPage,
  isBodyPage,
  isBudgetPage,
  isFuelPage,
  isTransmissionPage,
  isDynamicFilterPage,
  preLoadFilters,
  isPreloadList,
  setSearchFilters,
}: IFilterContainerProps) => {
  const router = useRouter();
  const [filtersData, setFiltersData] = useState(
    preLoadFilters || ({} as IFilterList),
  );
  const [allFiltersData, setAllFiltersData] = useState(
    preLoadFilters || ({} as IFilterList),
  );
  const [
    shouldMakeChoiceboxesForceUpdate,
    setShouldMakeChoiceboxesForceUpdate,
  ] = useState(false);
  const [makeData, setMakeData] = useState<Array<IFiltersChildren>>(
    makeHandler(preLoadFilters || ({} as IFilterList)),
  );
  const [modelsData, setModelsData] = useState([] as IFiltersChildren[]);
  const [tempFilterName, setTempFilterName] = useState('');
  const [tempModelName, setTempModelName] = useState('');
  // using for repeat initial filters preset
  const [forceFiltersPreset, setForceFiltersPreset] = useState(false);
  const [fromBudget] = useState(budgets.slice(0, budgets.length - 1));
  const [toBudget] = useState(budgets.slice(1));
  const [choiceBoxesData, setChoiceBoxesData] = useState(
    {} as IChoiceBoxesData,
  );
  const isDesktop = useMediaQuery('(min-width: 1217px)');
  const [isOpenFilter, setFilterExpandStatus] = useState(false);

  const [selectedFiltersState, setSelectedFiltersState] = useState<
    ISelectedFiltersState
  >(initialState);
  const [selectedFilterTags, setSelectedFilterTags] = useState(
    [] as ISelectedWithOrder[],
  );
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
    isMakePage ||
      isRangePage ||
      isModelPage ||
      isAllMakesPage ||
      isDynamicFilterPage
      ? null
      : isSpecialOffers,
    resp => {
      if (!Object.keys(allFiltersData).length) {
        setAllFiltersData(resp?.filterList || ({} as IFilterList));
        setFiltersData(resp?.filterList || ({} as IFilterList));
        setMakeData(makeHandler(resp?.filterList || ({} as IFilterList)));
      }
      return resp;
    },
    !!preLoadFilters,
  );

  interface IFiltersMapper {
    [index: string]: Array<string | IFiltersChildren> | null;
  }

  const filtersMapper: IFiltersMapper = {
    make: makeData,
    model: modelsData,
    from: fromBudget,
    to: toBudget,
    bodyStyles: filtersData?.bodyStyles,
    transmissions: filtersData?.transmissions,
    fuelTypes: filtersData?.fuelTypes,
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
            value,
            active: state[key].includes(value),
          })) || [];
      });
      return choisesObject;
    },
    [filtersData, selectedFiltersState],
  );

  /** memo object for search filter */
  const filtersObject = useMemo(
    () => filtersSearchMapper(selectedFiltersState),
    [selectedFiltersState],
  );

  /** start new search */
  const onViewResults = (onlyFiltersUpdate = false) => {
    if (!onlyFiltersUpdate) onSearch(filtersObject);
    const filtersObjectForFilters = { ...filtersObject, rate: undefined };
    refetch({
      vehicleTypes: isCarSearch ? [VehicleTypeEnum.CAR] : [VehicleTypeEnum.LCV],
      onOffer:
        isMakePage || isRangePage || isAllMakesPage || isDynamicFilterPage
          ? null
          : isSpecialOffers,
      ...filtersObjectForFilters,
    }).then(resp => {
      // if groupedRanges is empty -> search params is incorrect
      if (resp.data?.filterList?.groupedRangesWithSlug?.length) {
        // using then because apollo return incorrect cache result https://github.com/apollographql/apollo-client/issues/3550
        setFiltersData(resp.data?.filterList || ({} as IFilterList));
        setMakeData(makeHandler(resp.data?.filterList || ({} as IFilterList)));
        // set force update to true for rerender choiceboxes with new filter data
        setShouldMakeChoiceboxesForceUpdate(true);
        // when allFiltersData changing, preset filters from query will be called
        if (forceFiltersPreset) {
          setAllFiltersData(resp.data?.filterList || ({} as IFilterList));
          setForceFiltersPreset(false);
        }
      }
    });
  };

  /** changing data for choiseboxes component */
  const choiseBoxBuilder = (
    choices: IChoice[],
    filterAccessor: keyof typeof filtersMapper,
    actualState = selectedFiltersState,
  ) =>
    choices?.map((value: IChoice) => ({
      ...value,
      active: actualState[filterAccessor].includes(value.label),
    }));

  useEffect(() => {
    if (forceFiltersPreset) onViewResults(true);
  }, [forceFiltersPreset]);

  useEffect(() => {
    if (filtersData?.bodyStyles) setChoiceBoxesData(buildChoiseBoxData());
  }, [filtersData, buildChoiseBoxData]);

  useEffect(() => {
    // if we have query parameters filters should be preselected
    const shouldPreselect =
      (Object.keys(router?.query || {}).length &&
        Object.keys(allFiltersData || {}).length) ||
      router.query.isChangePage === 'true';
    if (shouldPreselect) {
      let presetFilters = {} as ISelectedFiltersState;
      const routerQuery = Object.entries(router.query).filter(
        ([key]) => key !== 'dynamicParam',
      );
      // flag for checking if any value from query don't exist in filters data
      // using in case when we load search which actual only for none special offers
      let isValueLose = false;
      // when we change page with one dynamic route by Next router(like from car-leasing/coupe to car-leasing/saloon)
      // Next doesn't call a ssr requests, this workaround should call requests on client side
      if (router.query.isChangePage === 'true') {
        const {
          isBodyStylePage,
          isFuelType,
          isBudgetType,
          isTransmissionPage: isTransmissionType,
        } = dynamicQueryTypeCheck(router.query.dynamicParam as string);
        presetFilters = setFiltersAfterPageChange(
          {
            isBodyStylePage,
            isFuelType,
            isBudgetType,
            isTransmissionType,
          },
          router.query.dynamicParam as string,
        );
      } else {
        routerQuery.forEach(entry => {
          const [key, values] = entry;
          if (key === 'rangeName') {
            const isExist = filtersData.groupedRangesWithSlug?.some(element => {
              let value = '';
              // if make correct then we are looking for a rangeName
              if (
                isInclude(
                  element.parent?.slug || '',
                  (router.query?.make || router.query?.dynamicParam) as string,
                )
              ) {
                value = findPreselectFilterValue(
                  Array.isArray(values)
                    ? values[0].split('+').join(' ')
                    : values.split('+').join(' '),
                  element.children,
                );
              }
              // saving model to temp because after set makes model will be removed
              if (value) {
                setTempModelName(value);
                presetFilters.model = [value];
                return true;
              }
              return false;
            });
            isValueLose = isExist ? isValueLose : true;
          } else if (key !== 'pricePerMonth' && key !== 'isChangePage') {
            let query: string | string[];
            // transformation the query value to expected type
            if (!Array.isArray(values)) {
              query = values.split(',').length > 1 ? values.split(',') : values;
            } else {
              query = values;
            }
            presetFilters[key] = Array.isArray(query)
              ? query
                  .map(value =>
                    findPreselectFilterValue(
                      value,
                      filtersMapper[key as keyof typeof filtersMapper],
                    ),
                  )
                  .filter(el => !!el)
              : [
                  findPreselectFilterValue(
                    query,
                    filtersMapper[key as keyof typeof filtersMapper],
                  ),
                ].filter(el => !!el);
            if (key === 'dynamicParam' && (isMakePage || isRangePage)) {
              presetFilters.make = [
                findPreselectFilterValue(values as string, filtersMapper.make),
              ];
            }
            isValueLose = presetFilters[key][0] ? isValueLose : true;
          } else if (key !== 'isChangePage') {
            const rate = (values as string).split('|');
            presetFilters.from = [rate[0]] || null;
            presetFilters.to = [rate[1]] || null;
          }
        });
      }
      // check if try to preset values actual only for none special offers search
      if (isSpecialOffers && isValueLose) {
        setIsSpecialOffers(false);
        setForceFiltersPreset(true);
        return;
      }
      setSelectedFiltersState(prevState => {
        if (router.query.isChangePage === 'true') {
          return { ...initialState, ...presetFilters };
        }
        return {
          ...prevState,
          ...presetFilters,
        };
      });
      if (isPreloadList) {
        setSearchFilters(
          filtersSearchMapper({ ...selectedFiltersState, ...presetFilters }),
        );
        setShouldMakeChoiceboxesForceUpdate(true);
      }
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
    if (!isDesktop) setFilterExpandStatus(false);
    else setFilterExpandStatus(true);
  }, [isDesktop]);

  useFirstRenderEffect(() => {
    // prevent request after automatically untick view offer checkbox
    if (!forceFiltersPreset) onViewResults();
  }, [isSpecialOffers]);

  useEffect(() => {
    // don't call onSearch already after render
    if (!isInitialLoad || router.query.isChangePage === 'true') onViewResults();
    // using for checking if user try to load page without additional params
    // numberOfParams - number of required params for page type
    const searchWithParams = (numberOfParams: number) =>
      Object.values(selectedFiltersState)
        ?.map(value => value.join(','))
        .flat()
        .filter(Boolean).length > numberOfParams;
    if (
      (selectedFilterTags[0] && isInitialLoad) ||
      (isInitialLoad &&
        ((isMakePage && selectedFiltersState.make[0] && searchWithParams(1)) ||
          (isBodyPage &&
            selectedFiltersState.bodyStyles[0] &&
            searchWithParams(1)) ||
          (isTransmissionPage &&
            selectedFiltersState.transmissions[0] &&
            searchWithParams(1)) ||
          (isFuelPage &&
            selectedFiltersState.fuelTypes[0] &&
            searchWithParams(1)) ||
          (isRangePage &&
            selectedFiltersState.model[0] &&
            searchWithParams(2)))) ||
      (isModelPage && selectedFiltersState.model[0] && searchWithParams(3))
    )
      setInitialLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterTags, isInitialLoad, isPersonal]);

  /** return true if model exist in filters data */
  const isCurrentModelValid = (model: string) =>
    filtersData.groupedRangesWithSlug?.some(({ children }) =>
      children.map(range => range.slug).includes(model),
    );

  // set actual models after make changing
  useEffect(() => {
    if (
      filtersObject.manufacturerSlug &&
      !((isRangePage || isModelPage) && !tempModelName)
    ) {
      // every time when filters update active model missed
      // for preset filters using temp variable
      // for cases when we change model manually we check for include this model in  new filters data
      const model = isCurrentModelValid(filtersObject.rangeSlug)
        ? [filtersObject.rangeSlug]
        : [];
      setSelectedFiltersState(prevState => ({
        ...prevState,
        model: tempModelName ? [tempModelName] : model,
      }));
      setModelsData(modelHandler(filtersData, selectedFiltersState.make[0]));
      // clear temp model value
      if (tempModelName) setTempModelName('');
    } else if (!filtersObject.manufacturerSlug && modelsData.length)
      setModelsData([]);
    // clear models data after remove make filter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersObject.manufacturerSlug, filtersData]);

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
    return (
      arr.find(filter =>
        filter[1].some(filterValue => value === filterValue.toLowerCase()),
      )?.[0] || ''
    );
  };

  /** check budget rules for valid value */
  const isInvalidBudget = (value: string, type: string) => {
    return !(
      (type === 'from' &&
        (value < selectedFiltersState.to[0] || !selectedFiltersState.to[0])) ||
      (type === 'to' &&
        (value > selectedFiltersState.from[0] || !selectedFiltersState.from[0]))
    );
  };

  // subscribe for change applied filters value for manage tags state
  useEffect(() => {
    const selected: ISelectedWithOrder[] = Object.entries(selectedFiltersState)
      // makes in make page should not to be added
      // makes, model, bodystyles in model page should not to be added
      // makes, model in range page should not to be added
      // bodyStyles/transmissions/fuels in body/transmission/fuel page should not to be added
      .map(entry => {
        if (
          (entry[0] === FilterFields.from || entry[0] === FilterFields.to) &&
          entry[1]?.[0]
        ) {
          return {
            order: filterOrderByNumMap[entry[0]],
            value: isBudgetPage ? '' : `£${entry[1]}`,
          };
        }
        const value =
          ((isMakePage || isRangePage || isModelPage) &&
            entry[0] === FilterFields.make) ||
          ((isRangePage || isModelPage) && entry[0] === FilterFields.model) ||
          (isFuelPage && entry[0] === FilterFields.fuelTypes) ||
          (isTransmissionPage && entry[0] === FilterFields.transmissions) ||
          ((isModelPage || isBodyPage) && entry[0] === FilterFields.bodyStyles)
            ? ''
            : entry[1];

        // for make and model we should get label value
        return typeof value === 'string'
          ? {
              order: filterOrderByNumMap[entry[0]],
              value:
                (entry[0] === FilterFields.make ||
                  entry[0] === FilterFields.model) &&
                value.length
                  ? getLabelForSlug(
                      entry[1][0],
                      filtersData,
                      entry[0] === FilterFields.make,
                    )
                  : value,
            }
          : value.map(v => ({
              order: filterOrderByNumMap[entry[0]],
              value: v,
            }));
      })
      .flat()
      .filter(({ order, value }) => value?.length > 0 && order !== undefined);
    // prevented useless updates
    // check for empty array used for prevent cases when initial render don't call a request
    if (!isArraySame(selected, selectedFilterTags) || !selected.length)
      setSelectedFilterTags(selected);
    // can't to add selectedFilterTags to deps, because it have circular dependency with selectedFiltersState
    // TODO: try to resolve circular dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedFiltersState,
    isMakePage,
    isBodyPage,
    isRangePage,
    isModelPage,
    isFuelPage,
    isTransmissionPage,
  ]);

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
    let newSelectedFiltersState = selectedFiltersState;
    selectedFilterTags.forEach(({ value }) => {
      const formatedValue = value
        .replace('£', '')
        .split(' ')
        .join('-')
        .toLowerCase();
      const filter = getValueKey(formatedValue) as keyof typeof filtersMapper;
      newSelectedFiltersState = {
        ...newSelectedFiltersState,
        [filter]: newSelectedFiltersState[filter].filter(
          selectedValue => selectedValue.toLowerCase() !== formatedValue,
        ),
      };
    });
    setSelectedFiltersState(newSelectedFiltersState);
    setChoiceBoxesData(buildChoiseBoxData(newSelectedFiltersState));
    setTempFilterName('all');
  };

  /**
   * remove value from filter after deleting tag
   */
  const handleRemoveTag = (value: string) => {
    const formatedValue = value.replace('£', '').toLowerCase();
    const filter = getValueKey(formatedValue) as keyof typeof filtersMapper;
    const newSelectedFiltersState = {
      ...selectedFiltersState,
      [filter]: selectedFiltersState[filter].filter(
        selectedValue => selectedValue.toLowerCase() !== formatedValue,
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
      setTempFilterName(filter as string);
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
    setTempFilterName(filterName as string);
  };

  /** handle filter expand status */
  const handleFilterExpand = () => {
    if (!isDesktop) setFilterExpandStatus(prevValue => !prevValue);
  };
  return (
    <SearchFilters isOpen={isOpenFilter}>
      <SearchFiltersHead onClick={handleFilterExpand}>
        <Icon icon={<OptionsIcon />} className="search-filters--title-icon" />
        <span>Filters</span>
        <Icon
          icon={isOpenFilter ? <ChevronUp /> : <ChevronDown />}
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
                        (isMakePage &&
                          dropdown.accessor === FilterFields.make) ||
                        ((isRangePage || isModelPage || isAllMakesPage) &&
                          (dropdown.accessor === FilterFields.make ||
                            dropdown.accessor === FilterFields.model)) ||
                        (isBudgetPage &&
                          (dropdown.accessor === FilterFields.from ||
                            dropdown.accessor === FilterFields.to))
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
                      ]?.map((option: string | IFiltersChildren) =>
                        filter.accessor === 'budget' ? (
                          <option
                            value={option as string}
                            key={option as string}
                            disabled={isInvalidBudget(
                              option as string,
                              dropdown.accessor,
                            )}
                          >{`£${option}`}</option>
                        ) : (
                          <option
                            value={(option as IFiltersChildren)?.slug || ''}
                            key={(option as IFiltersChildren)?.slug || ''}
                          >
                            {(option as IFiltersChildren)?.label || ''}
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
                  ]?.length > 0 &&
                    !(
                      // don't render list of selected values
                      (
                        ((isModelPage || isBodyPage) &&
                          filter.accessor === FilterFields.bodyStyles) ||
                        (isFuelPage &&
                          filter.accessor === FilterFields.fuelTypes) ||
                        (isTransmissionPage &&
                          filter.accessor === FilterFields.transmissions)
                      )
                    ) && (
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
                          handleChecked(value, filter.accessor as any)
                        }
                        choices={
                          isPickups || isModelPage || isDynamicFilterPage
                            ? buildPreselectChoiseboxes(
                                {
                                  isPickups,
                                  isModelPage,
                                  isBodyPage,
                                  isTransmissionPage,
                                  isFuelPage,
                                },
                                filter.accessor,
                                selectedFiltersState,
                                choiceBoxesData[filter.accessor],
                              ) || choiceBoxesData[filter.accessor]
                            : choiceBoxesData[filter.accessor]
                        }
                        className="-cols-1"
                        color="medium"
                        multiSelect
                        disabled={
                          (filter.accessor === FilterFields.bodyStyles &&
                            (isPickups || isModelPage || isBodyPage)) ||
                          (filter.accessor === FilterFields.fuelTypes &&
                            isFuelPage) ||
                          (filter.accessor === FilterFields.transmissions &&
                            isTransmissionPage) ||
                          // disable if only one option is available
                          choiceBoxesData[filter.accessor]?.length === 1
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
