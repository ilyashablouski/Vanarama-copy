import { ReactChild, ReactPortal } from 'react';
import { IBaseProps } from 'core/interfaces/base';

type Children = ReactChild | Array<Children> | ReactPortal;

export type ChildrenCallback = (toggle: () => void) => Children;

export interface IDropdownProps extends IBaseProps {
  label: string;
  defaultOpen?: boolean;
  renderProps?: boolean;
  children?: ChildrenCallback | Children;
}
