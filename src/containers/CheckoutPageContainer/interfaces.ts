import React from 'react';
import { IBaseProps } from 'core/interfaces/base';
import { FormContextValues } from 'react-hook-form';
import {
  GetDerivative,
  GetDerivative_vehicleImages,
} from '../../../generated/GetDerivative';
import { GetQuoteDetails } from '../../../generated/GetQuoteDetails';
import { GetStoredOrder } from '../../../generated/GetStoredOrder';
import { OrderInputObject } from '../../../generated/globalTypes';

export interface IAdditionalOptionsFormValues {
  redundancy?: boolean;
  lossOfEarnings?: boolean;
  freeInsurance?: boolean;
  monthlyMaintenance?: boolean;
  advancedBreakdownCover?: boolean;
}

export interface IAdditionalOptionsFormProps {
  derivative?: GetDerivative['derivative'];
  quote?: GetQuoteDetails['quoteByCapId'];
  methods: FormContextValues<IAdditionalOptionsFormValues>;
  vehicleConfiguration?: GetDerivative['vehicleConfigurationByCapId'];
}

export interface IAdditionalOptionProps extends IBaseProps {
  title: string;
  tooltipText: string;
  includedText: string;
  promotionText: string;
  id: string;
  name: string;
  checked?: boolean;
  ref?: React.Ref<HTMLInputElement>;
  onTooltipClick?: () => void;
}

export interface CheckoutPageContainerProps {
  storedOrder?: GetStoredOrder['storedOrder'];
  derivative?: GetDerivative['derivative'];
  vehicleImages?: GetDerivative['vehicleImages'];
  vehicleConfiguration?: GetDerivative['vehicleConfigurationByCapId'];
  quote: GetQuoteDetails['quoteByCapId'];
}

export interface OrderPanelProps {
  order?: OrderInputObject | null;
  quote: GetQuoteDetails['quoteByCapId'];
  vehicleImage?: GetDerivative_vehicleImages | null;
  vehicleConfiguration?: GetDerivative['vehicleConfigurationByCapId'];
}
