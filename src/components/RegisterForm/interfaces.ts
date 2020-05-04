// eslint-disable-next-line import/no-extraneous-dependencies
import { MutationFunctionOptions, ExecutionResult } from '@apollo/react-common';
import {
  EmailAlreadyExistsMutation as EMutation,
  EmailAlreadyExistsMutationVariables as EMutationVariables,
} from '../../../generated/EmailAlreadyExistsMutation';

export interface IRegisterFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: IRegisterFormValues) => Promise<void>;
  onEmailAlreadyExists: (
    options?:
      | MutationFunctionOptions<EMutation, EMutationVariables>
      | undefined,
  ) => Promise<ExecutionResult<EMutation>>;
}

export interface IRegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
