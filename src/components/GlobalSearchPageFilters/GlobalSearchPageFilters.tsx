import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import { useRouter } from 'next/router';
import ToggleSwitch from 'core/atoms/toggle/ToggleSwitch';
import Flame from 'core/assets/icons/Flame';
import ToggleV2 from 'core/atoms/toggleV2';
import cx from 'classnames';
import { IFiltersConfig, IInnerSelect } from './interfaces';
import { budgets } from '../../containers/FiltersContainer/config';
import {
  IFiltersData,
  ISelectedTags,
} from '../../containers/GlobalSearchPageContainer/interfaces';
import { useProductFilters } from '../../containers/GlobalSearchPageContainer/gql';
import {
  buildFiltersRequestObject,
  buildSelectedTags,
} from '../../containers/GlobalSearchPageContainer/helpers';
import { productFilter_productFilter as IProductFilter } from '../../../generated/productFilter';
import { getInnerConfigKeys } from './helpers';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import FiltersTags from '../../containers/GlobalSearchPageContainer/FiltersTags';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import DropdownsBlockComponent from './DropdownsBlockComponent';

interface IProps {
  preloadFilters?: IProductFilter;
  activeFilters: IFiltersData;
  setActiveFilters: (filter: IFiltersData) => void;
  selectedTags: ISelectedTags[];
  setSelectedTags: Dispatch<SetStateAction<ISelectedTags[]>>;
  clearFilterBlock: (key: string) => void;
  onRemoveTag: (value: string, key: string) => void;
  isPersonal: boolean;
  setIsPersonal: (value: boolean) => void;
  isSpecialOffer: boolean;
  setIsSpecialOffer: (value: boolean) => void;
  config: IFiltersConfig[];
}

const GlobalSearchPageFilters = ({
  preloadFilters,
  activeFilters,
  setActiveFilters,
  selectedTags,
  setSelectedTags,
  clearFilterBlock,
  onRemoveTag,
  isPersonal,
  setIsPersonal,
  isSpecialOffer,
  setIsSpecialOffer,
  config,
}: IProps) => {
  const { query } = useRouter();
  const [openedFilters, setOpenedFilters] = useState<string[]>([]);
  const [isOpenAdvancedFilters, setIsOpenAdvancedFilters] = useState(true);
  const [fromBudget] = useState(budgets.slice(0, budgets.length - 1));
  const [toBudget] = useState(budgets.slice(1));
  const [filtersData, setFiltersData] = useState(preloadFilters);
  const [getProductFilters] = useProductFilters(
    query?.searchTerm as string,
    async dataResult => setFiltersData(dataResult?.productFilter || undefined),
  );

  const filtersMapper = {
    ...filtersData,
    from: fromBudget,
    to: toBudget,
  } as IFiltersData;

  const advancedFiltersConfig = useMemo(
    () => config.filter(filterConfig => !filterConfig.generalFilter),
    [config],
  );

  const generalFiltersConfig = useMemo(
    () => config.filter(filterConfig => filterConfig.generalFilter),
    [config],
  );

  // create labels for selected filters
  useEffect(() => {
    setSelectedTags(buildSelectedTags(activeFilters));
  }, [activeFilters, setSelectedTags]);

  useFirstRenderEffect(() => {
    getProductFilters({
      variables: {
        filters: buildFiltersRequestObject(activeFilters, isSpecialOffer),
        query: query.searchTerm as string,
      },
    });
  }, [activeFilters, isSpecialOffer]);

  const onHandleFilterStatus = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    key: string,
  ) => {
    if (!openedFilters.includes(key)) {
      setOpenedFilters([...openedFilters, key]);
    } else {
      setOpenedFilters(openedFilters.filter(value => value !== key));
    }
  };

  const onHandleMultiSelect = (
    filterValues: string[],
    filterName: keyof IFiltersData,
  ) => {
    setActiveFilters({
      ...activeFilters,
      [filterName]: filterValues,
    });
  };

  const onHandleNativeSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value, name } = e.target;
    setActiveFilters({
      ...activeFilters,
      [name]: [value],
    });
  };

  /** check budget rules for valid value */
  const isInvalidBudget = (value: string, type: string) => {
    return !(
      (type === 'from' &&
        (value < activeFilters.to?.[0] || !activeFilters.to?.[0])) ||
      (type === 'to' &&
        (value > activeFilters.from?.[0] || !activeFilters.from?.[0]))
    );
  };

  const isDisabledSelect = (key: string, selectKey: string) => {
    if (selectKey === 'range') {
      return !activeFilters.make?.[0];
    }
    return false;
  };

  const onClearDropdown = (innerSelect: IInnerSelect[]) => {
    const keys = getInnerConfigKeys(innerSelect);
    const newFiltersObject = keys.reduce(
      (acc, current) => ({
        ...acc,
        [current]: [],
      }),
      { ...activeFilters },
    );
    setActiveFilters(newFiltersObject);
  };

  const getDropdownValues = (
    innerSelect: IInnerSelect[],
  ): (string | null)[] => {
    const keys = getInnerConfigKeys(innerSelect);
    return keys.reduce(
      (acc, current) => [...acc, ...(activeFilters?.[current] || [null])],
      [] as (string | null)[],
    );
  };

  const labelForSingleSelect = (key: keyof IFiltersData) => {
    if ((activeFilters[key as keyof IFiltersData] as string[])?.[0]) {
      return (activeFilters[key as keyof IFiltersData] as string[])?.[0];
    }
    if ((filtersMapper[key as keyof IFiltersData] as string[])?.length === 1) {
      return (filtersMapper[key as keyof IFiltersData] as string[])?.[0];
    }
    return '';
  };

  return (
    <>
      <FiltersTags
        tags={selectedTags}
        removeFilterValue={onRemoveTag}
        clearAllFilters={() => setActiveFilters({} as IFiltersData)}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="srp-f-hot-deals" htmlFor="srp-f-hot-deals-togl">
        <ToggleSwitch
          id="srp-f-hot-deals-togl"
          dataTestId="srp-f-hot-deals-togl"
          checked={isSpecialOffer}
          onChange={() => setIsSpecialOffer(!isSpecialOffer)}
        />
        &nbsp;Show only&nbsp;
        <Flame />
        <span>Hot Offers</span>
      </label>
      <ToggleV2
        leftLabel="Personal"
        checked={isPersonal}
        leftValue={LeaseTypeEnum.PERSONAL}
        rightValue={LeaseTypeEnum.BUSINESS}
        rightLabel="Business"
        leftId="r1"
        rightId="r2"
        leftDataTestId="personal"
        rightDataTestId="business"
        onChange={value => setIsPersonal(value === LeaseTypeEnum.PERSONAL)}
      />
      {generalFiltersConfig.map(filterConfig => (
        <DropdownsBlockComponent
          filterConfig={filterConfig}
          activeFilters={activeFilters}
          clearFilterBlock={clearFilterBlock}
          filtersMapper={filtersMapper}
          getDropdownValues={getDropdownValues}
          isDisabledSelect={isDisabledSelect}
          isInvalidBudget={isInvalidBudget}
          labelForSingleSelect={labelForSingleSelect}
          onClearDropdown={onClearDropdown}
          onHandleFilterStatus={onHandleFilterStatus}
          onHandleMultiSelect={onHandleMultiSelect}
          onHandleNativeSelectChange={onHandleNativeSelectChange}
          openedFilters={openedFilters}
          selectedTags={selectedTags}
        />
      ))}
      {advancedFiltersConfig?.length > 0 && (
        <div className={cx('accordyon', { active: isOpenAdvancedFilters })}>
          <div className="trigger" aria-expanded={isOpenAdvancedFilters}>
            <span>
              {`${isOpenAdvancedFilters ? 'Hide' : 'Show'}`} Advanced Filters
            </span>
          </div>
          <div className="content">
            <div className="inner">
              {advancedFiltersConfig.map(filterConfig => (
                <DropdownsBlockComponent
                  filterConfig={filterConfig}
                  activeFilters={activeFilters}
                  clearFilterBlock={clearFilterBlock}
                  filtersMapper={filtersMapper}
                  getDropdownValues={getDropdownValues}
                  isDisabledSelect={isDisabledSelect}
                  isInvalidBudget={isInvalidBudget}
                  labelForSingleSelect={labelForSingleSelect}
                  onClearDropdown={onClearDropdown}
                  onHandleFilterStatus={onHandleFilterStatus}
                  onHandleMultiSelect={onHandleMultiSelect}
                  onHandleNativeSelectChange={onHandleNativeSelectChange}
                  openedFilters={openedFilters}
                  selectedTags={selectedTags}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalSearchPageFilters;
