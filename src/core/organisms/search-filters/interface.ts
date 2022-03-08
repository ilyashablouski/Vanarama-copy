import { IBaseProps } from '../../interfaces/base';

export interface ISearchFiltersProps extends IBaseProps {
  isOpen?: boolean;
  dataUiTestId?: string;
}

export interface ISearchFiltersContentProps extends IBaseProps {}

export interface ISearchFiltersHeadProps extends IBaseProps {
  onClick?: () => void;
}

export type TSelectedWithOrder = {
  order: number;
  value: string;
};
export interface ISearchFilterTagsProps extends IBaseProps {
  onRemove?: (event: React.MouseEvent) => void;
  onClearAll?: () => void;
  selectedFilters: TSelectedWithOrder[];
}
