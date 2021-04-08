import { ApolloError } from '@apollo/client';

export interface IDirectorDetailsFormContainerProps {
  directorUuid?: string;
  companyUuid: string;
  orderUuid: string;
  personUuid?: string;
  onCompleted: () => void;
  onError: (error: ApolloError) => void;
}

export interface IValidationParams {
  id?: string | null;
  numOfDirectors: number;
  percentageShares: number;
}
