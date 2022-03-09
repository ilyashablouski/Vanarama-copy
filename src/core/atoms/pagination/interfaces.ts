import { MouseEvent } from 'react';

import { IBaseProps } from '../../interfaces/base';

export interface IPaginationProps extends IBaseProps {
  pages: number[];
  path: string;
  pathForFirstPage?: string;
  selected: number;
  onClick?(event: MouseEvent): void;
  onClickBackArray?(event: MouseEvent): void;
  onClickNextArray?(event: MouseEvent): void;
  pathWithHtml?: boolean;
}
