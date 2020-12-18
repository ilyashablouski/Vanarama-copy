import { MouseEvent } from 'react';

import { IBaseProps } from '../../interfaces/base';

export interface IPaginationProps extends IBaseProps {
  pages: number[];
  path: string;
  pathForFirstPage?: string;
  selected: number;
  onClick?(e: MouseEvent): void;
  onClickBackArray?(e: MouseEvent): void;
  onClickNextArray?(e: MouseEvent): void;
  pathWithHtml?: boolean;
}
