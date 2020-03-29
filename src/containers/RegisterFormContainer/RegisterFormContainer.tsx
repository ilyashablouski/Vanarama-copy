import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  RegisterUserMutation,
  RegisterUserMutationVariables,
} from '../../../generated/RegisterUserMutation';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { IRegisterFormContainerProps } from './interfaces';

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUserMutation($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
    }
  }
`;

const RegisterFormContainer: React.FC<IRegisterFormContainerProps> = ({
  onSuccess,
}) => {
  // TODO: Handle error from mutation
  const [registerUser, { loading }] = useMutation<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >(REGISTER_USER_MUTATION);

  return (
    <RegisterForm
      isSubmitting={loading}
      onSubmit={async values => {
        await registerUser({
          variables: {
            username: values.email,
            password: values.password,
          },
        });

        // TODO: Should redirect here at some point.
        onSuccess();
      }}
    />
  );
};

export default RegisterFormContainer;
