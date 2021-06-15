import React from 'react';
import { IBaseProps } from 'core/interfaces/base';
import { FormContextValues } from 'react-hook-form';
import { IOrderStorageData } from '../../hooks/useGetOrder';

export interface IAdditionalOptionsFormValues {
  redundancy?: boolean;
  insurance?: boolean;
  monthlyMaintenance?: boolean;
  advancedBreakdownCover?: boolean;
}

export interface IAdditionalOptionsFormProps {
  methods: FormContextValues<IAdditionalOptionsFormValues>;
}

export interface IAdditionalOptionProps extends IBaseProps {
  title: string;
  tooltipText: string;
  includedText: string;
  promotionText: string;
  id: string;
  name: string;
  ref?: React.Ref<HTMLInputElement>;
}

export interface CheckoutPageContainerProps {
  order: IOrderStorageData;
}

export interface OrderPanelProps {
  order: IOrderStorageData;
}
