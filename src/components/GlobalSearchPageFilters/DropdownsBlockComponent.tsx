import React, { Fragment, useEffect, useRef, useState } from 'react';
import DropdownV2 from 'core/atoms/dropdown-v2';
import ChoiceBoxesV2 from 'core/atoms/choiceboxes-v2';
import ChevronDown from 'core/assets/icons/ChevronDown';
import cx from 'classnames';
import { IFiltersConfig, IInnerSelect } from './interfaces';
import {
  IFiltersData,
  ISelectedTags,
} from '../../containers/GlobalSearchPageContainer/interfaces';
import SelectedBox from './SelectedBox';
import SelectedDropdown from './SelectedDropdown';
import { getSelectedValues, UNLISTED_VALUE } from './helpers';

interface IProps {
  filterConfig: IFiltersConfig;
  onHandleFilterStatus: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    key: string,
  ) => void;
  labelForSingleSelect: (key: keyof IFiltersData) => string | undefined;
  openedFilters: string[];
  selectedTags: ISelectedTags[];
  clearFilterBlock: (key: string) => void;
  filtersMapper: IFiltersData;
  onHandleMultiSelect: (
    filterValues: (string | number)[],
    filterName: keyof IFiltersData,
  ) => void;
  onHandleNativeMultiSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickAddMultipleSelect: (filterBlockName: string) => void;
  activeFilters: IFiltersData;
  getDropdownValues: (innerSelect: IInnerSelect[]) => (string | null)[];
  onClearDropdown: (innerSelect: IInnerSelect[]) => void;
  onHandleNativeSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabledSelect: (key: string, selectKey: string) => boolean;
  isInvalidRangeValue: (
    value: string | number,
    type: string,
    filterKey: string,
  ) => boolean;
  dataUiTestId?: string;
}

const DropdownsBlockComponent = ({
  filterConfig: {
    type,
    key,
    multiselect,
    label,
    innerSelects,
    renderSelectedFunction,
    renderValuesFunction,
    selectedLabel,
    addNewButtonLabel,
  },
  onHandleFilterStatus,
  labelForSingleSelect,
  openedFilters,
  selectedTags,
  clearFilterBlock,
  filtersMapper,
  onHandleMultiSelect,
  activeFilters,
  getDropdownValues,
  onClearDropdown,
  onHandleNativeSelectChange,
  isDisabledSelect,
  isInvalidRangeValue,
  onHandleNativeMultiSelect,
  onClickAddMultipleSelect,
  dataUiTestId,
}: IProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isAdded) {
      timeout = setTimeout(() => setIsAdded(false), 1000);
    }
    return () => clearTimeout(timeout);
  }, [isAdded]);

  const onNativeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiselect) {
      onHandleNativeMultiSelect(event);
      return;
    }
    onHandleNativeSelectChange(event);
  };

  const onClearBlock = () => {
    onClickAddMultipleSelect(key);
    formRef.current?.reset();
  };

  if (
    (!filtersMapper[key as keyof IFiltersData]?.length ||
      (filtersMapper[key as keyof IFiltersData]?.length === 1 &&
        (`${filtersMapper[key as keyof IFiltersData]?.[0]}`.toLowerCase() ===
          'unlisted' ||
          filtersMapper[key as keyof IFiltersData]?.[0] === UNLISTED_VALUE))) &&
    type === 'drop-down'
  ) {
    return null;
  }

  return type === 'drop-down' ? (
    <DropdownV2
      key={key}
      dataUiTestId={dataUiTestId}
      onLabelClick={event => onHandleFilterStatus(event, key)}
      label={
        selectedLabel
          ? labelForSingleSelect(key as keyof IFiltersData) || label
          : label
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
          renderFunction={renderSelectedFunction as () => string[]}
          dataUiTestId={dataUiTestId}
        />
      )}
      selected={
        selectedTags.filter(
          selectedBlocks => selectedBlocks.filterKey === key,
        )?.[0]?.tags || []
      }
    >
      <ChoiceBoxesV2
        multiSelect={multiselect}
        values={filtersMapper[key as keyof IFiltersData] as (string | number)[]}
        renderValuesFunction={renderValuesFunction}
        onChange={values =>
          onHandleMultiSelect(values, key as keyof IFiltersData)
        }
        idPrefix={key}
        selectedValues={
          activeFilters?.[key as keyof IFiltersData] as (string | number)[]
        }
        disabled={
          !multiselect && filtersMapper[key as keyof IFiltersData]?.length === 1
        }
        dataUiTestId={dataUiTestId}
      />
    </DropdownV2>
  ) : (
    <DropdownV2
      type="drop-select"
      dataUiTestId={dataUiTestId}
      key={key}
      label={label}
      multiselect={multiselect}
      open={openedFilters.includes(key)}
      onLabelClick={event => onHandleFilterStatus(event, key)}
      renderSummary={ref => (
        <SelectedDropdown
          ref={ref}
          selected={getDropdownValues(innerSelects as IInnerSelect[])}
          onClear={() => {
            onClearBlock();
            onClearDropdown(innerSelects as IInnerSelect[]);
          }}
          renderFunction={renderSelectedFunction as () => string}
          dataUiTestId={dataUiTestId}
        />
      )}
      selected={getSelectedValues(innerSelects, activeFilters) as unknown[]}
    >
      <form ref={formRef}>
        {(innerSelects as IInnerSelect[])?.map(
          ({ title, key: selectKey, placeholder }) => (
            <Fragment key={title}>
              <span className="option-title">{title}</span>
              <div className="faux-select">
                <ChevronDown />
                <select
                  name={`${selectKey}`}
                  data-testid={`${selectKey}-form`}
                  onChange={onNativeChange}
                  disabled={isDisabledSelect(key, selectKey)}
                  defaultValue={
                    multiselect
                      ? ''
                      : (activeFilters?.[selectKey as keyof IFiltersData] as
                          | string
                          | number[])?.[0]
                  }
                  data-uitestid={`${dataUiTestId}_select_${selectKey}`}
                >
                  <option
                    disabled
                    value=""
                    selected={
                      multiselect ||
                      !(activeFilters?.[selectKey as keyof IFiltersData] as
                        | string
                        | number[])?.[0]
                    }
                  >
                    {placeholder}
                  </option>
                  {(filtersMapper?.[selectKey as keyof IFiltersData] as (
                    | string
                    | number
                  )[])?.map(value => (
                    <option
                      key={value}
                      disabled={
                        key === 'budget' || key === 'enginePower'
                          ? isInvalidRangeValue(value, selectKey, key)
                          : false
                      }
                      value={value}
                      selected={
                        multiselect
                          ? false
                          : (activeFilters?.[
                              selectKey as keyof IFiltersData
                            ] as (string | number)[])?.includes(value)
                      }
                    >
                      {renderValuesFunction
                        ? renderValuesFunction(`${value}`)
                        : value}
                    </option>
                  ))}
                </select>
              </div>
            </Fragment>
          ),
        )}
      </form>
      {multiselect && (
        <button
          type="button"
          disabled={!getDropdownValues(innerSelects as IInnerSelect[])?.length}
          className={cx('add-selection', {
            added: isAdded,
          })}
          onClick={() => {
            setIsAdded(true);
            onClearBlock();
          }}
        >
          <span>
            <span>
              <span className="tick teal" /> Added
            </span>
            <span>{addNewButtonLabel}</span>
          </span>
        </button>
      )}
    </DropdownV2>
  );
};

export default DropdownsBlockComponent;
