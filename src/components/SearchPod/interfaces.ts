export interface ISearchPodProps {
  activeTab: number;
  onChangeTab: (index: number) => void;
  config: ITabsConfig[];
  getOptions: (accessor: any) => string[];
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
