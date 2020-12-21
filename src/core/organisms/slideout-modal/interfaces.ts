import { MouseEvent } from 'react';

import { IBaseProps } from '../../interfaces/base';

export interface INavItemProps {
  label: string;
  selected?: string[];
  onClick?(e: MouseEvent): void;
}

export interface IPanelMainMenu {
  setOpenPanel(e: string | null): void;
  searchFilters: ISearchFilters;
  selectedFilters?: ISelectedFilters;
}

export interface IPanelHeaderProps extends IFilter {
  panelId: string;
  label: string;
  setOpenPanel(e: string | null): void;
}

export interface IPanelBody extends IFilter {
  panelId: string;
}

export interface IPanelProps extends IFilter {
  panelId: string;
  setOpenPanel(e: string | null): void;
}

interface ISearchFilters {
  [key: string]: {
    value: string;
    label: string;
  }[];
}
interface ISelectedFilters {
  [key: string]: any | object;
}

export interface ISlideoutModalProps extends IBaseProps {
  isOpen?: boolean;
  openPanel?: string | null;
  searchFilters: ISearchFilters;
  selectedFilters?: ISelectedFilters;
}

type TPanelData = {
  panelId: string;
  label: string;
  filterIds?: string[];
};

export interface IPanelsData {
  [key: string]: TPanelData;
}

interface IFilter {
  searchFilters: ISearchFilters;
  selectedFilters?: ISelectedFilters;
  setSelectedFiltersState(e: ISelectedFilters): void;
}

export interface IFilterMakeAndModel extends IFilter {}
export interface IFilterBudget extends IFilter {}
export interface IFilterCheckboxes extends IFilter {
  name: string;
}
