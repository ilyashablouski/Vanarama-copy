import { ApolloError } from '@apollo/client';

export interface ICompanyDetailsFormContainerProps {
  personUuid: string;
  orderId: string;
  onCompleted: (data: string) => void;
  onError: (error: ApolloError) => void;
  isEdited: boolean;
}
