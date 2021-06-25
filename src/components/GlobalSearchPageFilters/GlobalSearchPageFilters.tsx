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
import { filtersConfig as config, IInnerSelect } from './config';
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

interface IProps {
  preloadFilters?: IProductFilter;
  activeFilters: IFiltersData;
  setActiveFilters: (filter: any) => any;
  selectedTags: ISelectedTags[];
  setSelectedTags: Dispatch<SetStateAction<ISelectedTags[]>>;
  clearFilterBlock: (key: string) => void;
}

const GlobalSearchPageFilters = ({
  preloadFilters,
  activeFilters,
  setActiveFilters,
  selectedTags,
  setSelectedTags,
  clearFilterBlock,
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
        filters: buildFiltersRequestObject(activeFilters),
        query: query.searchTerm as string,
      },
    });
  }, [activeFilters]);

  const onHandleFilterStatus = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string,
  ) => {
    const target = e.currentTarget;
    if (!openedFilters.includes(key)) {
      setOpenedFilters([...openedFilters, key]);
      const optionsHeight = (target?.querySelector('.options') as HTMLElement)
        ?.offsetHeight;
      const labelHeight = (target?.querySelector('.label') as HTMLElement)
        ?.offsetHeight;
      target.style.height = `${labelHeight + optionsHeight}px`;
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 500);
    } else {
      target.removeAttribute('style');
      setOpenedFilters(openedFilters.filter(value => value !== key));
    }
  };

  const onHandleMultiSelect = (e, filter: keyof IFiltersData) => {
    if (e.target.checked) {
      setActiveFilters({
        ...activeFilters,
        [filter]: activeFilters?.[filter]
          ? [...activeFilters?.[filter], e.target.value]
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

  const getDropdownValues = (innerSelect: IInnerSelect[]): string[] => {
    const keys = getInnerConfigKeys(innerSelect);
    return keys
      .reduce(
        (acc, current) => [...acc, ...(activeFilters?.[current] || [])],
        [] as (string | null)[],
      )
      .filter(value => value) as string[];
  };

  return (
    <>
      {config.map(
        ({
          label,
          key,
          type,
          innerSelects,
          renderValuesFunction,
          renderSelectedFunction,
        }) =>
          type === 'drop-down' ? (
            <div
              className={cx('drop-down', {
                open: openedFilters.includes(key),
              })}
              key={key}
              onClick={e => onHandleFilterStatus(e, key)}
            >
              <span className="label">
                <span>{label}</span>
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
                        onClick={event =>
                          onHandleMultiSelect(event, key as keyof IFiltersData)
                        }
                        data-testid={`${key}-${option}`}
                        value={option}
                        checked={activeFilters?.[
                          key as keyof IFiltersData
                        ]?.includes(option)}
                      />
                      <label htmlFor={`${key}-${option}`}>{option}</label>
                    </Fragment>
                  ),
                )}
              </div>
            </div>
          ) : (
            <div
              className={cx('drop-select', {
                open: openedFilters.includes(key),
              })}
              key={key}
              onClick={e => onHandleFilterStatus(e, key)}
            >
              <span className="label">
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
                          onClick={event => event.stopPropagation()}
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
