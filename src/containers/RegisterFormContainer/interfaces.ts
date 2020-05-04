// eslint-disable-next-line import/no-extraneous-dependencies
import { MutationFunctionOptions, ExecutionResult } from '@apollo/react-common';
import {
  EmailAlreadyExistsMutation as EMutation,
  EmailAlreadyExistsMutationVariables as EMutationVariables,
} from '../../../generated/EmailAlreadyExistsMutation';

export interface IRegisterFormContainerProps {
  onCompleted: () => void;
  onEmailAlreadyExists?: (
    options?:
      | MutationFunctionOptions<EMutation, EMutationVariables>
      | undefined,
  ) => Promise<ExecutionResult<EMutation>>;
}
