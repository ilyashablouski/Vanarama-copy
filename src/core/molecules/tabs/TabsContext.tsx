import { createContext, useContext } from 'react';
import { TSize } from '../../../types/size';
import { TabAlignment, TabColorVariant } from './interfaces';

export interface ITabsContext {
  activeIndex: number;
  align?: TabAlignment;
  baseId?: string;
  onChange: (
    value: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  size?: TSize;
  variant?: TabColorVariant;
}

const TabsContext = createContext<ITabsContext | null>(null);
export const TabsProvider = TabsContext.Provider;

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Must be wrapped in a TabsProvider');
  }

  return context;
}
