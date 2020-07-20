import { ApolloError } from '@apollo/client';
import { SaveBusinessAboutYou } from '../../../generated/SaveBusinessAboutYou';

export type SubmitResult = {
  data: SaveBusinessAboutYou;
  companyType: string;
};

export interface IBusinessAboutFormContainerProps {
  onCompleted?: (data: SubmitResult) => void;
  onError?: (error: ApolloError) => void;
  personUuid?: string;
  onLogInCLick?: () => void;
}
