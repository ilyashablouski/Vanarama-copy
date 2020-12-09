import { ApolloError } from '@apollo/client';

export interface IVatDetailsFormContainerProps {
  isEdited: boolean;
  companyUuid: string;
  orderId: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
  isSoleTrader?: boolean;
  personUuid?: string;
}
