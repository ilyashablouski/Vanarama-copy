import React from 'react';
import { IChoice } from 'core/atoms/choiceboxes/interfaces';
import { RateInputObject } from '../../../generated/globalTypes';
import {
  filterList_filterList as IFilterList,
  filterList_filterList_groupedRangesWithSlug_children as IFiltersChildren,
} from '../../../generated/filterList';
import { Component, Nullable } from '../../types/common';

export interface ISelectedFiltersState {
  [index: string]: string[];
}

// props which injected by FiltersContainer
export interface IFiltersContainerInjectedProps {
  filtersData?: IFilterList;
  setFiltersData?: (filtersData: IFilterList) => void;
  setSelectedFiltersState?: React.Dispatch<
    React.SetStateAction<ISelectedFiltersState>
  >;
  selectedFiltersState?: ISelectedFiltersState;
  handleChecked?: (value: IChoice, filterName: keyof IFiltersMapper) => void;
  handleSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  getOrCreateRef?: (id: string | number) => any;
  choiceBoxesData?: IChoiceBoxesData;
  initialState?: ISelectedFiltersState;
  clearFilter?: (filterName: keyof IFiltersMapper) => void;
  isInvalidBudget?: (value: string, type: string) => boolean;
  selectedFilterTags?: ISelectedWithOrder[];
  setShouldMakeChoiceboxesForceUpdate?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export type FiltersRenderCallback = (
  innerProps: IFiltersContainerInjectedProps,
) => Component;

export interface ISelectedWithOrder {
  order: number;
  value: string;
}

export interface IFilterContainerProps {
  isPersonal: boolean;
  setType: (value: boolean) => void;
  preLoadFilters?: Nullable<IFilterList>;
  tagArrayBuilderHelper: (
    entry: [string, string[]],
    filtersContainerData: IFilterList,
  ) => ISelectedWithOrder | ISelectedWithOrder[];
  renderFilters: FiltersRenderCallback;
  dataUiTestId?: string;
}

export interface IFilters {
  manufacturerSlug: string;
  rangeSlug: string;
  rate: RateInputObject;
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
}

export interface IDynamicPageType {
  isBodyStylePage: boolean;
  isFuelType: boolean;
  isBudgetType: boolean;
  isTransmissionType: boolean;
}

export interface IChoiceBoxesData {
  [index: string]: IChoice[];
}

export interface IFiltersMapper {
  manufacturer: IFiltersChildren[];
  model: IFiltersChildren[];
  from: string[];
  to: string[];
  bodyStyles: string[];
  transmissions: string[];
  fuelTypes: string[];
}
