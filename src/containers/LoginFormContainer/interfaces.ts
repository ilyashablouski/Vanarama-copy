import { ApolloError } from '@apollo/client';
import { GetPerson } from '../../../generated/GetPerson';

export interface ILogInFormContainerProps {
  onCompleted?: (data?: GetPerson['getPerson']) => Promise<any>;
  onError?: (error: ApolloError) => void;
}
