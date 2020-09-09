import { ApolloError } from '@apollo/client';

export interface ISoleTraderDetailsFormContainerProps {
  isEdited: boolean;
  personUuid: string;
  orderUuid: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
}
