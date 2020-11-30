import { ApolloError } from '@apollo/client';

export type SubmitResult = {
  companyType: string;
  businessPersonUuid?: string;
};

export interface IBusinessAboutFormContainerProps {
  personUuid?: string;
  orderId: string;
  personLoggedIn?: boolean;
  onCompleted?: (data: SubmitResult) => void;
  onError?: (error: ApolloError) => void;
  onLogInCLick?: () => void;
  isEdited: boolean;
}
