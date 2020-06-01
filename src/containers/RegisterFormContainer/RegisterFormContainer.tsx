import { gql, useMutation } from '@apollo/client';
import {
  EmailAlreadyExistsMutation as EMutation,
  EmailAlreadyExistsMutationVariables as EMutationVariables,
} from '../../../generated/EmailAlreadyExistsMutation';
import {
  RegisterUserMutation as Mutation,
  RegisterUserMutationVariables as MutationVariables,
} from '../../../generated/RegisterUserMutation';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { IRegisterFormContainerProps } from './interfaces';

export const EMAIL_ALREADY_EXISTS = gql`
  mutation EmailAlreadyExistsMutation($email: String!) {
    emailAlreadyExists(email: $email)
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUserMutation($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
    }
  }
`;

const RegisterFormContainer: React.FC<IRegisterFormContainerProps> = ({
  onCompleted,
}) => {
  const [register, { loading }] = useMutation<Mutation, MutationVariables>(
    REGISTER_USER_MUTATION,
    { onCompleted },
  );

  const [emailAlreadyExists] = useMutation<EMutation, EMutationVariables>(
    EMAIL_ALREADY_EXISTS,
  );

  return (
    <RegisterForm
      isSubmitting={loading}
      onSubmit={async values => {
        await register({
          variables: {
            username: values.email,
            password: values.password,
          },
        });
      }}
      onCheckEmailExists={async value => {
        const results = await emailAlreadyExists({
          variables: { email: value },
        });

        return Boolean(results?.data?.emailAlreadyExists);
      }}
    />
  );
};

export default RegisterFormContainer;
