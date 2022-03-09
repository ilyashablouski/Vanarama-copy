import { ChangeEvent } from 'react';

import { IDropdown } from './dropdown';
import { IBaseProps } from './base';

export interface IHistoryDatePickerProps extends IBaseProps {
  name: string;
  label: string;
  parentKey?: number;
  months: IDropdown;
  years: IDropdown;
  month?: number;
  year?: number;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
}
