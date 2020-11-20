import { filterList_filterList_groupedRangesWithSlug_children as IOptionsDropdown } from '../../../generated/filterList';

export interface ISearchPodProps {
  activeTab: number;
  onChangeTab: (index: number) => void;
  config: ITabsConfig[];
  getOptions: (accessor: any) => Array<string | IOptionsDropdown>;
  onSearch: (tabType: string) => void;
  registerDropdown: () => void;
  hasCarMakeSelected: boolean;
  hasVansMakeSelected: boolean;
  vansCachedData: any;
  isHomePage?: boolean;
  headingText: string;
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
