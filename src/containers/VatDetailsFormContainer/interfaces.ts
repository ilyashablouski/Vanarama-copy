import { ApolloError } from '@apollo/client';

export interface IVatDetailsFormContainerProps {
  companyUuid: string;
  orderId: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
}
