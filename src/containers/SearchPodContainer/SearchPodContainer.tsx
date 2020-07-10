import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import SearchPod from '../../components/SearchPod';
import { tabsFields, budget } from './config';
import { filterListByTypes, filterTypeAndBudget } from './gql';
import {
  makeHandler,
  modelHandler,
  budgetBetween,
  getBudgetForQuery,
} from './helpers';
import { filterList_filterList as IFilterList } from '../../../generated/filterList';

enum Tabs {
  'LCV' = 1,
  'CAR',
}

const SearchPodContainer = () => {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(1);

  const [vansDataCache, setVansDataCache] = useState({} as IFilterList);
  const [carsDataCache, setCarsDataCache] = useState({} as IFilterList);

  const [budgetVans, setBudgetVans] = useState(budget);
  const [budgetCars, setBudgetCars] = useState(budget);

  const [typeVans, setTypesVans] = useState(['']);
  const [typeCars, setTypesCars] = useState(['']);

  const [makeVans, setMakesVans] = useState(['']);
  const [makeCars, setMakesCars] = useState(['']);

  const [modelVans, setModelsVans] = useState(['']);
  const [modelCars, setModelsCars] = useState(['']);
  // using for auto make select if Vans model was selected without make
  const [modelVansTemp, setModelsVansTemp] = useState('');

  // using for map form fields value with generic accessor of dropdown config
  const fieldsMapper = {
    budgetVans,
    budgetCars,
    typeVans,
    typeCars,
    makeVans,
    makeCars,
    modelVans,
    modelCars,
  };

  const { register, getValues, watch, setValue } = useForm();
  const selectMakeCars = watch('makeCars');
  const selectMakeVans = watch('makeVans');
  const selectModelVans = watch('modelVans');
  const selectModelCars = watch('modelCars');

  const { data, refetch } = filterListByTypes([Tabs[activeIndex]]);
  const [getVehicleData, { data: actualVehicleData }] = filterTypeAndBudget(
    [Tabs[activeIndex]],
    activeIndex === 1 ? selectMakeVans : selectMakeCars,
    activeIndex === 1 ? selectModelVans : selectModelCars,
  );

  const setAllDataForVans = (filtersData: IFilterList) => {
    setVansDataCache(filtersData);
    setMakesVans(makeHandler(filtersData));
    setTypesVans(filtersData.bodyStyles || []);
  };

  const setAllDataForCars = (filtersData: IFilterList) => {
    setCarsDataCache(filtersData);
    setMakesCars(makeHandler(filtersData));
    setTypesCars(filtersData.bodyStyles || []);
    setModelsCars([]);
  };

  // get a data for dropdowns
  useEffect(() => {
    if (data?.filterList) {
      if (data.filterList.vehicleTypes[0] === 'LCV') {
        setAllDataForVans(data.filterList);
      } else {
        setAllDataForCars(data.filterList);
      }
    }
  }, [data]);

  // call for fetch data if tab was changed, should call once for every tab
  useEffect(() => {
    if (!vansDataCache || !carsDataCache) refetch();
  }, [activeIndex, vansDataCache, carsDataCache, refetch]);

  // set actual models value for a specific manufacturer
  useEffect(() => {
    if (vansDataCache.groupedRanges || carsDataCache.groupedRanges) {
      if (activeIndex === 1) {
        setModelsVans(modelHandler(vansDataCache, selectMakeVans));
      } else {
        setModelsCars(modelHandler(carsDataCache, selectMakeCars));
      }
    }
  }, [
    selectMakeVans,
    selectMakeCars,
    vansDataCache,
    carsDataCache,
    activeIndex,
  ]);

  useEffect(() => {
    if (!selectMakeVans && getValues('modelVans')) {
      setModelsVansTemp(selectModelVans);
      const parent = vansDataCache.groupedRanges?.find(range =>
        range.children.includes(selectModelVans),
      );
      setValue('makeVans', parent?.parent);
    } else if (modelVansTemp && selectMakeVans && !selectModelVans) {
      // return back a model value because auto change make call a rerender options list
      setValue('modelVans', modelVansTemp);
      setModelsVansTemp('');
    }
  }, [
    selectModelVans,
    selectMakeVans,
    modelVansTemp,
    setValue,
    getValues,
    vansDataCache.groupedRanges,
  ]);

  // refetch body types and budgets for selected vehicle
  useEffect(() => {
    // if make don't selected set initial bodystyles
    if (activeIndex === 1 && !selectMakeVans) {
      setTypesVans(vansDataCache.bodyStyles || []);
      setValue('modelVans', null);
    } else if (activeIndex === 2 && !selectMakeCars) {
      setTypesVans(carsDataCache.bodyStyles || []);
      setValue('modelCars', null);
    }
    // else fetch actual
    else if (!modelVansTemp) {
      getVehicleData();
    }
  }, [
    selectMakeVans,
    selectMakeCars,
    modelVansTemp,
    activeIndex,
    carsDataCache.bodyStyles,
    getVehicleData,
    setValue,
    vansDataCache.bodyStyles,
  ]);

  // set body types and budgets for selected vehicle
  useEffect(() => {
    if (actualVehicleData?.filterList) {
      // we should filter initial list of budget ranges
      // get a first/last actual range
      const [minBudgetIndex, maxBudgetIndex] = budget.reduce(
        (array, range, index) => {
          if (
            budgetBetween(
              range,
              actualVehicleData?.filterList.financeProfilesRateMin,
            )
          ) {
            array.push(index);
          }
          if (
            budgetBetween(
              range,
              actualVehicleData?.filterList.financeProfilesRateMax,
            )
          ) {
            array.push(index > -1 ? index + 1 : array.length);
          }
          return array;
        },
        [] as number[],
      );
      if (activeIndex === 1) {
        setTypesVans(actualVehicleData?.filterList.bodyStyles);
        setBudgetVans(
          minBudgetIndex >= 0
            ? budget.slice(minBudgetIndex, maxBudgetIndex)
            : budget,
        );
      } else {
        setTypesCars(actualVehicleData?.filterList.bodyStyles);
        setBudgetCars(
          minBudgetIndex >= 0
            ? budget.slice(minBudgetIndex, maxBudgetIndex)
            : budget,
        );
      }
    }
  }, [actualVehicleData, activeIndex]);

  // get options list
  const getOptions = (field: keyof typeof fieldsMapper) => fieldsMapper[field];

  // search url generation
  const onSearch = (tabType: string) => {
    const isCarTab = tabType === 'Cars';
    const values = getValues();
    const searchType = isCarTab ? 'car-leasing' : 'van-leasing';
    let routerUrl = `/${searchType}`;
    const mainPart = searchType;
    let additionalPart = '';
    let queryPart = '';
    let queryTypePart = '';
    let queryBudgetPart = '';
    const query = {} as any;
    // make
    if (values[`make${tabType}`]) {
      additionalPart = `/${values[`make${tabType}`].replace(' ', '-')}`;
      routerUrl += '/[make]';
      // adding type only for cars search if we have model
      if (values[`model${tabType}`]) {
        additionalPart += `/${values[`model${tabType}`].replace(' ', '-')}`;
        routerUrl += '/[model]';
      }
    }
    // adding budget and types
    if (values[`type${tabType}`] || values[`budget${tabType}`]) {
      queryPart = '?';
      if (values[`type${tabType}`]) {
        queryTypePart = `bodyStyles=${values[`type${tabType}`]
          .split(' ')
          .join('')}`;
        queryPart += `${queryTypePart}${values[`type${tabType}`] &&
          values[`budget${tabType}`] &&
          '&'}`;
        query.bodyStyles = values[`type${tabType}`];
      }
      if (values[`budget${tabType}`]) {
        queryBudgetPart = `pricePerMonth=${getBudgetForQuery(
          values[`budget${tabType}`],
        )}`;
        queryPart += queryBudgetPart;
        query.budget = getBudgetForQuery(values[`budget${tabType}`]);
      }
    }
    router.push(
      {
        pathname: routerUrl,
        query: {
          ...query,
        },
      },
      `/${mainPart.toLowerCase()}${additionalPart.toLowerCase()}${queryPart}`,
    );
  };

  return (
    <SearchPod
      activeTab={activeIndex}
      onChangeTab={(index: number) => setActiveIndex(index)}
      config={tabsFields}
      onSearch={onSearch}
      getOptions={field => getOptions(field)}
      registerDropdown={register}
      hasCarMakeSelected={!!selectMakeCars}
      hasVansMakeSelected={!!selectMakeVans}
      vansCachedData={vansDataCache}
    />
  );
};

export default SearchPodContainer;
