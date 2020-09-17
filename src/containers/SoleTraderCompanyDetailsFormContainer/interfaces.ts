import { ApolloError } from '@apollo/client';

export interface ISoleTraderCompanyDetailsFormContainerProps {
  orderId: string;
  personUuid: string;
  onCompleted: (uuid: string) => void;
  onError: (error: ApolloError) => void;
  isEdited: boolean;
  companyUuid?: string;
}
