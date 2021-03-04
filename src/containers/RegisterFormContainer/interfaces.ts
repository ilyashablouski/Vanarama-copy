import { ApolloError } from '@apollo/client';

export interface IRegisterFormContainerProps {
  onCompleted: () => void;
  onError?: (error: ApolloError) => void;
  redirectUrl?: string;
}
