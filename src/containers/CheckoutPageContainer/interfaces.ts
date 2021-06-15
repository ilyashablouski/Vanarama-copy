import React from 'react';
import { IBaseProps } from 'core/interfaces/base';
import { FormContextValues } from 'react-hook-form';
import { IOrderStorageData } from '../../hooks/useGetOrder';
import {GetDerivative, GetDerivative_vehicleImages} from "../../../generated/GetDerivative";

export interface IAdditionalOptionsFormValues {
  redundancy?: boolean;
  insurance?: boolean;
  monthlyMaintenance?: boolean;
  advancedBreakdownCover?: boolean;
}

export interface IAdditionalOptionsFormProps {
  methods: FormContextValues<IAdditionalOptionsFormValues>;
  derivative?: GetDerivative['derivative'];
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
  derivative?: GetDerivative['derivative'];
  vehicleImages?: GetDerivative['vehicleImages'];
}

export interface OrderPanelProps {
  order: IOrderStorageData;
  vehicleImage?: GetDerivative_vehicleImages | null;
}
