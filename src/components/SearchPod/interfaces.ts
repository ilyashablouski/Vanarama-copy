import {
  filterList_filterList_groupedRangesWithSlug_children as IOptionsDropdown,
  filterList_filterList as IFilterList,
} from '../../../generated/filterList';
import { filterTypeAndBudget_filterList as IFilterTypeAndBudget } from '../../../generated/filterTypeAndBudget';

export interface ISearchPodProps {
  activeTab: number;
  onChangeTab: (index: number) => void;
  config: ITabsConfig[];
  getOptions: (accessor: any) => Array<string | IOptionsDropdown>;
  onSearch: (tabType: string) => void;
  registerDropdown: () => void;
  hasCarMakeSelected: boolean;
  hasVansMakeSelected: boolean;
  vansData?: IFilterTypeAndBudget;
  vansCachedData: IFilterList;
  isHomePage?: boolean;
  headingText: string;
  customCTAColor?: string;
}

export interface ITabsConfig {
  dropdowns: IDropdownFields[];
  buttonText: string;
  tabName: string;
  type: string;
}

interface IDropdownFields {
  label: string;
  accessor: string;
}
