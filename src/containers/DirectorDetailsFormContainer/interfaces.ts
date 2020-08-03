import { ApolloError } from '@apollo/client';

export interface IDirectorDetailsFormContainerProps {
  companyUuid: string;
  orderUuid: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
}
