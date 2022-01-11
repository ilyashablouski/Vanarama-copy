import { ApolloError } from '@apollo/client';

export type SubmitResult = {
  companyType: string;
  businessPersonUuid?: string;
  orderUuid?: string;
};

export interface IBusinessAboutFormContainerProps {
  personUuid?: string;
  onCompleted?: (data: SubmitResult) => void;
  onError?: (error: ApolloError) => void;
  onLogInCLick?: () => void;
  onRegistrationClick?: () => void;
  personLoggedIn?: boolean;
}
