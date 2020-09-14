import { ApolloError } from '@apollo/client';

export interface ISoleTraderDetailsFormContainerProps {
  isEdited: boolean;
  personUuid: string;
  companyUuid: string;
  orderUuid: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
}
