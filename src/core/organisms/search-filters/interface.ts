import { IBaseProps } from '../../interfaces/base';

export interface ISearchFiltersProps extends IBaseProps {
  isOpen?: boolean;
}

export interface ISearchFiltersContentProps extends IBaseProps {}

export interface ISearchFiltersHeadProps extends IBaseProps {
  onClick?: () => void;
}
export interface ISearchFilterTagsProps extends IBaseProps {
  onRemove?: (e: React.MouseEvent) => void;
  onClearAll?: () => void;
  selectedFilters: string[];
}
