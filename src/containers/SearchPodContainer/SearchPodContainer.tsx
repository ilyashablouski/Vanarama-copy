import React, { FC, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  budget,
  carPageTabFields,
  tabsFields,
  vanPageTabFields,
} from './config';
import { filterTypeAndBudget } from './gql';
import {
  budgetBetween,
  getBudgetForQuery,
  makeHandler,
  modelHandler,
} from './helpers';
import {
  filterList as IFilterListData,
  filterList_filterList as IFilterList,
  filterList_filterList_groupedRangesWithSlug_children as IFiltersListOptions,
} from '../../../generated/filterList';
// import SearchPod from '../../components/SearchPod';
import Skeleton from '../../components/Skeleton';

const SearchPod = dynamic(() => import('../../components/SearchPod'), {
  loading: () => <Skeleton count={7} />,
});

interface ISearchPodContainerProps {
  searchPodCarsData?: IFilterListData;
  searchPodVansData?: IFilterListData;
}

enum Tabs {
  'LCV' = 1,
  'CAR',
}
const VANS_TAB_HEADING = 'Search Van Leasing';
const CARS_TAB_HEADING = 'Search Car Leasing';
const PICKUPS_TAB_HEADING = 'Search Pickup Leasing';

const SearchPodContainer: FC<ISearchPodContainerProps> = ({
  searchPodCarsData,
  searchPodVansData,
}) => {
  const router = useRouter();

  const initialHeadingText = useMemo(() => {
    if (router.pathname.indexOf('car') > -1) {
      return CARS_TAB_HEADING;
    }
    if (router.pathname.indexOf('pickup') > -1) {
      return PICKUPS_TAB_HEADING;
    }
    return VANS_TAB_HEADING;
  }, [router.pathname]);

  const setConfigInit = () => {
    if (router.pathname.indexOf('car') > -1) {
      return carPageTabFields;
    }
    if (router.pathname.indexOf('van') > -1) {
      return vanPageTabFields;
    }
    if (router.pathname.indexOf('pickup') > -1) {
      return vanPageTabFields;
    }
    return tabsFields;
  };

  const [activeIndex, setActiveIndex] = useState(
    router.pathname.indexOf('car') > -1 ? 2 : 1,
  );

  const [vansDataCache] = useState(
    searchPodVansData?.filterList || ({} as IFilterList),
  );
  const [carsDataCache] = useState(
    searchPodCarsData?.filterList || ({} as IFilterList),
  );
  const [pickupMakes, setPickupMakes] = useState([] as IFiltersListOptions[]);

  const [config] = useState(setConfigInit());
  const [headingText, setHeadingText] = useState(initialHeadingText);
  // set it to true if we need preselect some data
  const [isShouldPreselectTypes, setIsShouldPreselectTypes] = useState(
    router.pathname.indexOf('pickup') > -1,
  );

  const [budgetVans, setBudgetVans] = useState(budget);
  const [budgetCars, setBudgetCars] = useState(budget);

  const [typeVans, setTypesVans] = useState(
    searchPodVansData?.filterList?.bodyStyles || [],
  );
  const [typeCars, setTypesCars] = useState(
    searchPodCarsData?.filterList?.bodyStyles || [],
  );

  const [makeVans, setMakesVans] = useState(
    makeHandler(searchPodVansData?.filterList || ({} as IFilterList)),
  );
  const [makeCars] = useState(
    makeHandler(searchPodCarsData?.filterList || ({} as IFilterList)),
  );

  const [modelVans, setModelsVans] = useState([{}] as IFiltersListOptions[]);
  const [modelCars, setModelsCars] = useState([{}] as IFiltersListOptions[]);
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
  const selectTypeVans = watch('typeVans');
  const selectTypeCars = watch('typeCars');

  const [getVehicleData, { data: actualVehicleData }] = filterTypeAndBudget(
    [Tabs[activeIndex]],
    activeIndex === 1 ? selectMakeVans : selectMakeCars,
    activeIndex === 1 ? selectModelVans : selectModelCars,
    activeIndex === 1 ? [selectTypeVans] : [selectTypeCars],
    resp => {
      if (
        selectTypeVans === 'Pickup' &&
        activeIndex === 1 &&
        !pickupMakes.length &&
        resp?.filterList
      )
        setPickupMakes(makeHandler(resp?.filterList));
    },
  );

  // using for preselect data after first reqest to filterslist
  useEffect(() => {
    if (typeVans.length && isShouldPreselectTypes && selectTypeVans === '') {
      setValue('typeVans', 'Pickup');
      setIsShouldPreselectTypes(false);
      getVehicleData();
    }
  }, [
    typeVans,
    isShouldPreselectTypes,
    setValue,
    getVehicleData,
    selectTypeVans,
  ]);

  // using for set actual makes for pickups and return back all makes for other types
  useEffect(() => {
    const makes = makeHandler(vansDataCache);
    // compare current state with new and update
    const shouldUpdateState =
      makes.length === makeVans.length &&
      makes.sort().every((value, index) => value === makeVans.sort()[index]);
    if (selectTypeVans !== 'Pickup' && activeIndex === 1 && !shouldUpdateState)
      setMakesVans(makes);
    else if (
      selectTypeVans === 'Pickup' &&
      activeIndex === 1 &&
      !!pickupMakes.length
    )
      setMakesVans(pickupMakes);
  }, [selectTypeVans, pickupMakes, activeIndex, makeVans, vansDataCache]);

  // set actual models value for a specific manufacturer
  useEffect(() => {
    if (
      vansDataCache.groupedRangesWithSlug ||
      carsDataCache.groupedRangesWithSlug
    ) {
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
      const parent = vansDataCache.groupedRangesWithSlug?.find(range =>
        range.children.some(ranges => ranges.slug === selectModelVans),
      );
      setValue('makeVans', parent?.parent.slug);
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
    vansDataCache.groupedRangesWithSlug,
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
              actualVehicleData?.filterList?.financeProfilesRateMin || 0,
            )
          ) {
            array.push(index);
          }
          if (
            budgetBetween(
              range,
              actualVehicleData?.filterList?.financeProfilesRateMax || 551,
            )
          ) {
            array.push(index > -1 ? index + 1 : array.length);
          }
          return array;
        },
        [] as number[],
      );
      if (activeIndex === 1) {
        setTypesVans(actualVehicleData?.filterList.bodyStyles || []);
        setBudgetVans(
          minBudgetIndex >= 0
            ? budget.slice(minBudgetIndex, maxBudgetIndex)
            : budget,
        );
      } else {
        setTypesCars(actualVehicleData?.filterList.bodyStyles || []);
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
    const routerUrl = `/${searchType}/search`;
    const query = {} as any;
    // make
    if (values[`make${tabType}`]) {
      query.make = values[`make${tabType}`];
    }
    if (values[`model${tabType}`]) {
      query.rangeName = values[`model${tabType}`];
    }
    if (values[`type${tabType}`]) {
      query.bodyStyles = values[`type${tabType}`];
    }
    if (values[`budget${tabType}`]) {
      query.pricePerMonth = getBudgetForQuery(values[`budget${tabType}`]);
    }
    router.push({
      pathname: routerUrl,
      query,
    });
  };

  const onChangeTab = (index: number) => {
    setActiveIndex(index);
    if (index === 1) setHeadingText(VANS_TAB_HEADING);
    if (index === 2) setHeadingText('Search Cars');
  };

  return (
    <SearchPod
      activeTab={activeIndex}
      onChangeTab={(index: number) => onChangeTab(index)}
      config={config}
      onSearch={onSearch}
      getOptions={field => getOptions(field)}
      registerDropdown={register}
      hasCarMakeSelected={!!selectMakeCars}
      hasVansMakeSelected={!!selectMakeVans}
      vansCachedData={vansDataCache}
      isHomePage={config.length > 1}
      headingText={headingText}
    />
  );
};

export default SearchPodContainer;
