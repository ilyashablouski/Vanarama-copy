import React, { Fragment } from 'react';
import DropdownV2 from 'core/atoms/dropdown-v2';
import ChoiceBoxesV2 from 'core/atoms/choiceboxes-v2';
import ChevronDown from 'core/assets/icons/ChevronDown';
import { IFiltersConfig, IInnerSelect } from './interfaces';
import {
  IFiltersData,
  ISelectedTags,
} from '../../containers/GlobalSearchPageContainer/interfaces';
import SelectedBox from './SelectedBox';
import SelectedDropdown from './SelectedDropdown';
import {getSelectedValues} from "./helpers";

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
    filterValues: string[],
    filterName: keyof IFiltersData,
  ) => void;
  activeFilters: IFiltersData;
  getDropdownValues: (innerSelect: IInnerSelect[]) => (string | null)[];
  onClearDropdown: (innerSelect: IInnerSelect[]) => void;
  onHandleNativeSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabledSelect: (key: string, selectKey: string) => boolean;
  isInvalidBudget: (value: string, type: string) => boolean;
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
  isInvalidBudget,
}: IProps) => {
  return type === 'drop-down' ? (
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
        multiSelect={multiselect}
        values={filtersMapper[key as keyof IFiltersData] as string[]}
        onChange={values =>
          onHandleMultiSelect(values, key as keyof IFiltersData)
        }
        selectedValues={activeFilters?.[key as keyof IFiltersData] as string[]}
        disabled={
          !multiselect &&
          (filtersMapper[key as keyof IFiltersData] as string[]).length === 1
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
          onClear={() => onClearDropdown(innerSelects as IInnerSelect[])}
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
                    !activeFilters?.[selectKey as keyof IFiltersData]?.[0]
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
                    {renderValuesFunction ? renderValuesFunction(value) : value}
                  </option>
                ))}
              </select>
            </div>
          </Fragment>
        ),
      )}
    </DropdownV2>
  );
};

export default DropdownsBlockComponent;
