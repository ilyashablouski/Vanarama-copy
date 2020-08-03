import { ApolloError } from '@apollo/client';

export interface IDirectorDetailsFormContainerProps {
  directorUuid?: string;
  companyUuid: string;
  orderUuid: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
}
