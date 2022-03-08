import { IBaseProps } from '../../interfaces/base';

export interface ISearchProps extends IBaseProps {
  id?: string;
  name?: string;
  placeholder?: string;
  results?: string[];
  onSelect?: (value: string) => void;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
  isIntermediateState?: boolean;
}
