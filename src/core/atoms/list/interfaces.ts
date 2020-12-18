import { HTMLAttributes } from 'react';
import { IBaseProps } from '../../interfaces/base';

export interface IListProps
  extends IBaseProps,
    HTMLAttributes<HTMLUListElement> {}
