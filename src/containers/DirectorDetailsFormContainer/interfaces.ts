import { ApolloError } from '@apollo/client';

export interface IDirectorDetailsFormContainerProps {
  isEdited: boolean;
  directorUuid?: string;
  companyUuid: string;
  orderUuid: string;
  personUuid?: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
}
