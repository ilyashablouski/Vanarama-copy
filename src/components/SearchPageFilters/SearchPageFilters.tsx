import React, { useEffect, useMemo, useState } from 'react';
import Select from 'core/atoms/select';
import Choiceboxes from 'core/atoms/choiceboxes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getSessionStorage } from '../../utils/windowSessionStorage';
import {
  budgets,
  FilterFields,
  filtersConfig,
} from '../../containers/FiltersContainer/config';
import {
  filterList_filterList as IFilterList,
  filterList_filterList_groupedRangesWithSlug_children as IFiltersChildren,
} from '../../../generated/filterList';
import {
  buildPreselectChoiseboxes,
  filtersSearchMapper,
  findPreselectFilterValue,
  isInclude,
  setFiltersAfterPageChange,
} from '../../containers/FiltersContainer/helpers';
import Skeleton from '../Skeleton';
import { useFilterList } from '../../containers/SearchPodContainer/gql';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  makeHandler,
  modelHandler,
} from '../../containers/SearchPodContainer/helpers';
import {
  IChoiceBoxesData,
  ISelectedFiltersState,
} from '../../containers/FiltersContainer/interfaces';
import { dynamicQueryTypeCheck } from '../../containers/SearchPageContainer/helpers';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import { ISearchPageFiltersProps } from './interfaces';
import { getPartnerProperties } from '../../utils/partnerProperties';

const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Dropdown = dynamic(() => import('core/atoms/dropdown'), {
  loading: () => <Skeleton count={1} />,
});
const FormGroup = dynamic(() => import('core/molecules/formgroup'));

const SearchPageFilters = ({
  preLoadFilters,
  onSearch,
  isCarSearch,
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
  isPreloadList,
  setSearchFilters,
  filtersData,
  setFiltersData,
  setSelectedFiltersState,
  selectedFiltersState = {} as ISelectedFiltersState,
  handleChecked,
  handleSelect,
  getOrCreateRef,
  choiceBoxesData = {} as IChoiceBoxesData,
  initialState,
  setShouldMakeChoiceboxesForceUpdate,
  clearFilter,
  isInvalidBudget,
  selectedFilterTags,
}: ISearchPageFiltersProps) => {
  const router = useRouter();

  const [makeData, setMakeData] = useState<Array<IFiltersChildren>>(
    makeHandler(preLoadFilters || ({} as IFilterList)),
  );
  const [modelsData, setModelsData] = useState([] as IFiltersChildren[]);
  const [fromBudget] = useState(budgets.slice(0, budgets.length - 1));
  const [toBudget] = useState(budgets.slice(1));
  const [tempModelName, setTempModelName] = useState('');
  const [allFiltersData, setAllFiltersData] = useState(
    preLoadFilters || ({} as IFilterList),
  );

  // using for repeat initial filters preset
  const [forceFiltersPreset, setForceFiltersPreset] = useState(false);
  const [isInitialLoad, setInitialLoad] = useState(true);

  interface IFiltersMapper {
    [index: string]: Array<string | IFiltersChildren> | null;
  }

  const filtersMapper: IFiltersMapper = {
    make: makeData,
    model: modelsData,
    from: fromBudget,
    to: toBudget,
    bodyStyles: filtersData?.bodyStyles || null,
    transmissions: filtersData?.transmissions || null,
    fuelTypes: filtersData?.fuelTypes || null,
  };

  /** memo object for search filter */
  const filtersObject = useMemo(
    () => filtersSearchMapper(selectedFiltersState),
    [selectedFiltersState],
  );

  const [isPartnership, setIsPartnership] = useState(false);
  const [filterFuelTypes, setFilterFuelTypes] = useState([]);

  useEffect(() => {
    if (getSessionStorage('partnershipSessionActive')) {
      setIsPartnership(true);
      setFilterFuelTypes(getPartnerProperties()?.fuelTypes || []);
    }
  }, []);

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
        setFiltersData?.(resp?.filterList || ({} as IFilterList));
        setMakeData(makeHandler(resp?.filterList || ({} as IFilterList)));
      }
      return resp;
    },
    !!preLoadFilters,
    undefined,
    filterFuelTypes,
  );
  /** start new search */
  const onViewResults = (onlyFiltersUpdate = false) => {
    if (!onlyFiltersUpdate) {
      onSearch(filtersObject);
    }
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
        setFiltersData?.(resp.data?.filterList || ({} as IFilterList));
        setMakeData(makeHandler(resp.data?.filterList || ({} as IFilterList)));
        // set force update to true for rerender choiceboxes with new filter data
        setShouldMakeChoiceboxesForceUpdate?.(true);
        // when allFiltersData changing, preset filters from query will be called
        if (forceFiltersPreset) {
          setAllFiltersData(resp.data?.filterList || ({} as IFilterList));
          setForceFiltersPreset(false);
        }
      }
    });
  };

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
            const isExist = filtersData?.groupedRangesWithSlug?.some(
              element => {
                let value = '';
                // if make correct then we are looking for a rangeName
                if (
                  isInclude(
                    element.parent?.slug || '',
                    (router.query?.make ||
                      router.query?.dynamicParam) as string,
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
              },
            );
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
      setSelectedFiltersState?.(prevState => {
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
        setShouldMakeChoiceboxesForceUpdate?.(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFiltersData, router.query.isChangePage]);

  useEffect(() => {
    const queryLength = Object.keys(router?.query || {}).length;
    if (!queryLength || (queryLength === 1 && router.query.isChangePage)) {
      setSelectedFiltersState?.(initialState || ({} as ISelectedFiltersState));
    }
  }, [setSelectedFiltersState, router, initialState]);

  useFirstRenderEffect(() => {
    // prevent request after automatically untick view offer checkbox
    if (!forceFiltersPreset) {
      onViewResults();
    }
  }, [isSpecialOffers]);

  useEffect(() => {
    // don't call onSearch already after render
    if (!isInitialLoad || router.query.isChangePage === 'true') {
      onViewResults();
    }
    // using for checking if user try to load page without additional params
    // numberOfParams - number of required params for page type
    const searchWithParams = (numberOfParams: number) =>
      Object.values(selectedFiltersState || {})
        ?.map(value => value.join(','))
        .flat()
        .filter(Boolean).length > numberOfParams;
    if (
      (selectedFilterTags?.[0] && isInitialLoad) ||
      (isInitialLoad &&
        ((isMakePage && selectedFiltersState?.make[0] && searchWithParams(1)) ||
          (isBodyPage &&
            selectedFiltersState?.bodyStyles[0] &&
            searchWithParams(1)) ||
          (isTransmissionPage &&
            selectedFiltersState?.transmissions[0] &&
            searchWithParams(1)) ||
          (isFuelPage &&
            selectedFiltersState?.fuelTypes[0] &&
            searchWithParams(1)) ||
          (isRangePage &&
            selectedFiltersState?.model[0] &&
            searchWithParams(2)))) ||
      (isModelPage && selectedFiltersState?.model[0] && searchWithParams(3))
    ) {
      setInitialLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilterTags, isInitialLoad]);

  /** return true if model exist in filters data */
  const isCurrentModelValid = (model: string) =>
    filtersData?.groupedRangesWithSlug?.some(({ children }) =>
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
      setSelectedFiltersState?.(prevState => ({
        ...prevState,
        model: tempModelName ? [tempModelName] : model,
      }));
      setModelsData(
        modelHandler(
          filtersData || ({} as IFilterList),
          selectedFiltersState?.make[0] || '',
        ),
      );
      // clear temp model value
      if (tempModelName) {
        setTempModelName('');
      }
    } else if (!filtersObject.manufacturerSlug && modelsData.length) {
      setModelsData([]);
    }
    // clear models data after remove make filter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersObject.manufacturerSlug, filtersData]);

  useEffect(() => {
    if (forceFiltersPreset) {
      onViewResults(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceFiltersPreset]);

  return (
    <>
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
                        selectedFiltersState?.[
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
                            disabled={isInvalidBudget?.(
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
                  {selectedFiltersState?.[
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
                            selectedFiltersState?.[
                              filter.accessor as keyof typeof filtersMapper
                            ]?.length
                          } Selected`}</span>
                          <div className="dropdown--header-selected">
                            {selectedFiltersState?.[
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
                            clearFilter?.(filter.accessor as FilterFields)
                          }
                        />
                      </div>
                    )}

                  <FormGroup label={filter.label} dataTestId={filter.label}>
                    {choiceBoxesData?.[filter.accessor]?.length > 0 && (
                      <Choiceboxes
                        onSubmit={value =>
                          handleChecked?.(value, filter.accessor as any)
                        }
                        choices={
                          isPickups ||
                          isModelPage ||
                          isDynamicFilterPage ||
                          isPartnership
                            ? buildPreselectChoiseboxes(
                                {
                                  isPickups,
                                  isModelPage,
                                  isBodyPage,
                                  isTransmissionPage,
                                  isFuelPage,
                                  isPartnership,
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
                          choiceBoxesData?.[filter.accessor]?.length === 1
                        }
                        ref={getOrCreateRef?.(filter.accessor)}
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
    </>
  );
};

export default SearchPageFilters;
