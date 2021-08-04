import React, {
  Fragment,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import ChevronDown from 'core/assets/icons/ChevronDown';
import { useRouter } from 'next/router';
import ToggleSwitch from 'core/atoms/toggle/ToggleSwitch';
import DropdownV2 from 'core/atoms/dropdown-v2';
import Flame from 'core/assets/icons/Flame';
import ToggleV2 from 'core/atoms/toggleV2';
import ChoiceBoxesV2 from 'core/atoms/choiceboxes-v2/ChoiceboxesV2';
import { IFiltersConfig, IInnerSelect } from './interfaces';
import { budgets } from '../../containers/FiltersContainer/config';
import {
  IFiltersData,
  ISelectedTags,
} from '../../containers/GlobalSearchPageContainer/interfaces';
import SelectedBox from './SelectedBox';
import { useProductFilters } from '../../containers/GlobalSearchPageContainer/gql';
import {
  buildFiltersRequestObject,
  buildSelectedTags,
} from '../../containers/GlobalSearchPageContainer/helpers';
import { productFilter_productFilter as IProductFilter } from '../../../generated/productFilter';
import SelectedDropdown from './SelectedDropdown';
import { getInnerConfigKeys, getSelectedValues } from './helpers';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import FiltersTags from '../../containers/GlobalSearchPageContainer/FiltersTags';
import { LeaseTypeEnum } from '../../../generated/globalTypes';

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
      {config.map(
        ({
          label,
          key,
          type,
          innerSelects,
          renderValuesFunction,
          renderSelectedFunction,
          multiselect,
        }) =>
          type === 'drop-down' ? (
            <DropdownV2
              key={key}
              onLabelClick={event => onHandleFilterStatus(event, key)}
              label={
                multiselect
                  ? label
                  : labelForSingleSelect(key as keyof IFiltersData) || label
              }
              multiselect={multiselect}
              open={openedFilters.includes(key)}
              type="drop-down"
              renderSummary={ref => (
                <SelectedBox
                  ref={ref}
                  selected={
                    selectedTags.filter(
                      selectedBlocks => selectedBlocks.filterKey === key,
                    )?.[0]?.tags || []
                  }
                  onClearFilterBlock={() => clearFilterBlock(key)}
                />
              )}
              selected={
                selectedTags.filter(
                  selectedBlocks => selectedBlocks.filterKey === key,
                )?.[0]?.tags || []
              }
            >
              <ChoiceBoxesV2
                key={key}
                multiSelect={multiselect}
                values={filtersMapper[key as keyof IFiltersData] as string[]}
                onChange={values =>
                  onHandleMultiSelect(values, key as keyof IFiltersData)
                }
                selectedValues={
                  activeFilters?.[key as keyof IFiltersData] as string[]
                }
                disabled={
                  !multiselect &&
                  (filtersMapper[key as keyof IFiltersData] as string[])
                    .length === 1
                }
              />
            </DropdownV2>
          ) : (
            <DropdownV2
              type="drop-select"
              key={key}
              label={label}
              multiselect={multiselect}
              open={openedFilters.includes(key)}
              onLabelClick={event => onHandleFilterStatus(event, key)}
              renderSummary={ref => (
                <SelectedDropdown
                  ref={ref}
                  selected={getDropdownValues(innerSelects as IInnerSelect[])}
                  onClear={() =>
                    onClearDropdown(innerSelects as IInnerSelect[])
                  }
                  renderFunction={renderSelectedFunction}
                />
              )}
              selected={
                getSelectedValues(innerSelects, activeFilters) as unknown[]
              }
            >
              {(innerSelects as IInnerSelect[])?.map(
                ({ title, key: selectKey, placeholder }) => (
                  <Fragment key={title}>
                    <span className="option-title">{title}</span>
                    <div className="faux-select">
                      <ChevronDown />
                      <select
                        name={`${selectKey}`}
                        data-testid={`${selectKey}-form`}
                        onChange={onHandleNativeSelectChange}
                        disabled={isDisabledSelect(key, selectKey)}
                      >
                        <option
                          disabled
                          value=""
                          selected={
                            !activeFilters?.[
                              selectKey as keyof IFiltersData
                            ]?.[0]
                          }
                        >
                          {placeholder}
                        </option>
                        {(filtersMapper?.[
                          selectKey as keyof IFiltersData
                        ] as string[])?.map(value => (
                          <option
                            key={value}
                            disabled={
                              key === 'budget'
                                ? isInvalidBudget(value, selectKey)
                                : false
                            }
                            value={value}
                            selected={activeFilters?.[
                              selectKey as keyof IFiltersData
                            ]?.includes(value)}
                          >
                            {renderValuesFunction
                              ? renderValuesFunction(value)
                              : value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Fragment>
                ),
              )}
            </DropdownV2>
          ),
      )}
    </>
  );
};

export default GlobalSearchPageFilters;
