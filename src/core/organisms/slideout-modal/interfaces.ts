import { MouseEvent } from 'react';

import { IBaseProps } from '../../interfaces/base';

export interface INavItemProps {
  label: string;
  selected?: string[];
  onClick?(event: MouseEvent): void;
}

export interface IPanelMainMenu {
  setOpenPanel(event: string | null): void;
  searchFilters: ISearchFilters;
  selectedFilters?: ISelectedFilters;
}

export interface IPanelHeaderProps extends IFilter {
  panelId: string;
  label: string;
  setOpenPanel(event: string | null): void;
}

export interface IPanelBody extends IFilter {
  panelId: string;
}

export interface IPanelProps extends IFilter {
  panelId: string;
  setOpenPanel(event: string | null): void;
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

export interface IRangeFilter {
  value: string;
  label: string;
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
  setSelectedFiltersState(event: ISelectedFilters): void;
}

export interface IFilterManufacturerAndModel extends IFilter {}
export interface IFilterBudget extends IFilter {}
export interface IFilterCheckboxes extends IFilter {
  name: string;
}
