import { ApolloError } from '@apollo/client';
import { SaveBusinessAboutYou } from '../../../generated/SaveBusinessAboutYou';

export interface IBusinessAboutFormContainerProps {
  onCompleted?: (data: SaveBusinessAboutYou) => void;
  onError?: (error: ApolloError) => void;
}
