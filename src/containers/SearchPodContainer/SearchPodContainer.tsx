import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import SearchPod from '../../components/SearchPod';
import { tabsFields, budget } from './config';
import { filterListByTypes } from './gql';
import { makeHandler, modelHandler } from './helpers';
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

  const [budgetVans] = useState(budget);
  const [budgetCars] = useState(budget);

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
  const { data, refetch } = filterListByTypes([Tabs[activeIndex]]);

  const selectMakeCars = watch('makeCars');
  const selectMakeVans = watch('makeVans');
  const selectModelVans = watch('modelVans');

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

  // auto select make value for Vans
  useEffect(() => {
    if (!selectMakeVans && selectModelVans) {
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
    vansDataCache.groupedRanges,
  ]);

  // get options list
  const getOptions = (field: keyof typeof fieldsMapper) => fieldsMapper[field];

  // build budget query
  const getBudgetForQuery = (range: string) => {
    if (range) {
      return range
        .split('£')
        .join('')
        .replace('-', '|');
    }
    return '';
  };

  // search url generation
  const onSearch = (tabType: string) => {
    const isCarTab = tabType === 'Cars';
    let routerUrl = '/[search]';
    const values = getValues();
    const searchType = isCarTab ? 'car-leasing' : 'van-leasing';
    const mainPart = values[`make${tabType}`]
      ? `${values[`make${tabType}`].replace(' ', '-')}-${searchType}`
      : `${isCarTab ? 'car-leasing-' : ''}search`;
    let additionalPart = '';
    let queryPart = '';
    let queryTypePart = '';
    let queryBudgetPart = '';
    const query = {} as any;
    // make + model
    if (values[`make${tabType}`] && values[`model${tabType}`]) {
      additionalPart = `/${values[`model${tabType}`].replace(' ', '-')}`;
      routerUrl += '/[model]';
      // adding type only for cars search if we have model
      if (isCarTab && values[`type${tabType}`]) {
        additionalPart += `/${values[`type${tabType}`]}`;
        routerUrl += '/[type]';
      }
    }
    // adding budget and types
    if (
      (!isCarTab ||
        !values[`model${tabType}`] ||
        (isCarTab && values[`budget${tabType}`])) &&
      (values[`type${tabType}`] || values[`budget${tabType}`])
    ) {
      queryPart = '?';
      if (
        values[`type${tabType}`] &&
        !(isCarTab && values[`model${tabType}`])
      ) {
        queryTypePart = `bodyType=${values[`type${tabType}`].split(' ')
        .join('')}`;
        queryPart += `${queryTypePart}${values[`type${tabType}`] &&
          values[`budget${tabType}`] &&
          (!(isCarTab && values[`model${tabType}`]) || '') &&
          '&'}`;
        query.bodyType = values[`type${tabType}`];
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
