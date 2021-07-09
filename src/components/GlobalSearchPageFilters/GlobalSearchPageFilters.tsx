import React, {
  Fragment,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import ChevronDown from 'core/assets/icons/ChevronDown';
import cx from 'classnames';
import { useRouter } from 'next/router';
import Toggle from 'core/atoms/toggle/Toggle';
import ToggleSwitch from 'core/atoms/toggle/ToggleSwitch';
import Flame from 'core/assets/icons/Flame';
import { filtersConfig as config } from './config';
import { IInnerSelect } from './interfaces';
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
import { getInnerConfigKeys } from './helpers';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';
import FiltersTags from '../../containers/GlobalSearchPageContainer/FiltersTags';

interface IProps {
  preloadFilters?: IProductFilter;
  activeFilters: IFiltersData;
  setActiveFilters: (filter: IFiltersData) => void;
  selectedTags: ISelectedTags[];
  setSelectedTags: Dispatch<SetStateAction<ISelectedTags[]>>;
  clearFilterBlock: (key: string) => void;
  onRemoveTag: (value: string, key: string) => void;
}

const GlobalSearchPageFilters = ({
  preloadFilters,
  activeFilters,
  setActiveFilters,
  selectedTags,
  setSelectedTags,
  clearFilterBlock,
  onRemoveTag,
}: IProps) => {
  const { query } = useRouter();
  const [openedFilters, setOpenedFilters] = useState<string[]>([]);
  const [fromBudget] = useState(budgets.slice(0, budgets.length - 1));
  const [toBudget] = useState(budgets.slice(1));
  const [isPersonal, setIsPersonal] = useState(true);
  const [isSpecialOffer, setIsSpecialOffer] = useState(false);
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
        filters: buildFiltersRequestObject(activeFilters),
        query: query.searchTerm as string,
      },
    });
  }, [activeFilters]);

  const changeBlockHeight = (parentNode: HTMLElement) => {
    const parent = parentNode;
    const optionsHeight = (parentNode?.querySelector('.options') as HTMLElement)
      ?.offsetHeight;
    const labelHeight = (parentNode?.querySelector('.label') as HTMLElement)
      ?.offsetHeight;
    parent.style.height = `${labelHeight + optionsHeight}px`;
    setTimeout(() => {
      parentNode.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 500);
  };

  const onHandleFilterStatus = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    key: string,
  ) => {
    const { currentTarget, target } = e;
    const isDropDownEvent =
      currentTarget.className.includes('drop-down') ||
      currentTarget.className.includes('drop-select');
    const isLabelEvent = (target as HTMLElement).className === 'label';
    if (isLabelEvent && !openedFilters.includes(key)) {
      setOpenedFilters([...openedFilters, key]);
      changeBlockHeight((target as HTMLElement).parentNode as HTMLElement);
    } else if (isLabelEvent && openedFilters.includes(key)) {
      ((target as HTMLElement).parentNode as HTMLElement).removeAttribute(
        'style',
      );
      setOpenedFilters(openedFilters.filter(value => value !== key));
    } else if (isDropDownEvent && openedFilters.includes(key)) {
      changeBlockHeight(currentTarget);
    }
  };

  const onHandleMultiSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    filter: keyof IFiltersData,
  ) => {
    const spreadableFilter = activeFilters?.[filter] || [];
    if (e.target.checked) {
      setActiveFilters({
        ...activeFilters,
        [filter]: activeFilters?.[filter]
          ? [...spreadableFilter, e.target.value]
          : [e.target.value],
      });
    } else {
      setActiveFilters({
        ...activeFilters,
        [filter]: activeFilters?.[filter]?.filter(
          value => value !== e.target.value,
        ),
      });
    }
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
        <span>Hot Deals</span>
      </label>
      <Toggle
        offLabel="Business"
        onLabel="Personal"
        id="contractType"
        checked={isPersonal}
        onChange={() => setIsPersonal(!isPersonal)}
        className="slide-togl"
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
            // eslint-disable-next-line
            <div
              className={cx('drop-down', {
                open: openedFilters.includes(key),
                'dynamic-label ': !multiselect,
              })}
              key={key}
              onClick={e => onHandleFilterStatus(e, key)}
            >
              {/* eslint-disable-next-line */}
              <span
                role="button"
                className="label"
                onClick={e => {
                  e.stopPropagation();
                  onHandleFilterStatus(e, key);
                }}
              >
                <span>
                  {multiselect
                    ? label
                    : labelForSingleSelect(key as keyof IFiltersData) || label}
                </span>
                <ChevronDown />
              </span>
              <div className="options">
                <SelectedBox
                  selected={
                    selectedTags.filter(
                      selectedBlocks => selectedBlocks.filterKey === key,
                    )?.[0]?.tags || []
                  }
                  onClearFilterBlock={() => clearFilterBlock(key)}
                />
                {(filtersMapper[key as keyof IFiltersData] as string[])?.map(
                  option => (
                    <Fragment key={option}>
                      <input
                        id={`${key}-${option}`}
                        type="checkbox"
                        name={key}
                        onChange={event =>
                          onHandleMultiSelect(event, key as keyof IFiltersData)
                        }
                        data-testid={`${key}-${option}`}
                        value={option}
                        disabled={
                          !multiselect &&
                          (filtersMapper[key as keyof IFiltersData] as string[])
                            .length === 1
                        }
                        checked={
                          activeFilters?.[key as keyof IFiltersData]?.includes(
                            option,
                          ) ||
                          (!multiselect &&
                            (filtersMapper[
                              key as keyof IFiltersData
                            ] as string[]).length === 1)
                        }
                      />
                      <label htmlFor={`${key}-${option}`}>{option}</label>
                    </Fragment>
                  ),
                )}
              </div>
            </div>
          ) : (
            // eslint-disable-next-line
            <div
              className={cx('drop-select', {
                open: openedFilters.includes(key),
              })}
              key={key}
              onClick={e => onHandleFilterStatus(e, key)}
            >
              {/* eslint-disable-next-line */}
              <span
                className="label"
                onClick={e => {
                  e.stopPropagation();
                  onHandleFilterStatus(e, key);
                }}
              >
                <span>{label}</span>
                <ChevronDown />
              </span>
              <div className="options">
                <SelectedDropdown
                  selected={getDropdownValues(innerSelects as IInnerSelect[])}
                  onClear={() =>
                    onClearDropdown(innerSelects as IInnerSelect[])
                  }
                  renderFunction={renderSelectedFunction}
                />
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
              </div>
            </div>
          ),
      )}
    </>
  );
};

export default GlobalSearchPageFilters;
