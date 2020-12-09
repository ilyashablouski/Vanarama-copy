import { ApolloError } from '@apollo/client';

export interface IProps {
  companyUuid: string;
  orderUuid: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
  isEdited: boolean;
  isSoleTrader: boolean;
  personUuid?: string;
}
