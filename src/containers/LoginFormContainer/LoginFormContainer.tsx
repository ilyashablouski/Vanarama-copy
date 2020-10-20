import LoginForm from '../../components/LoginForm/LoginForm';
import { ILogInFormContainerProps } from './interfaces';
import { useLoginUserMutation } from './gql';

const LoginFormContainer = ({ onCompleted }: ILogInFormContainerProps) => {
  const [login, { loading, error }] = useLoginUserMutation(onCompleted);

  return (
    <LoginForm
      hasError={Boolean(error)}
      isSubmitting={loading}
      onSubmit={async values => {
        await login({
          variables: {
            username: values.email,
            password: values.password,
          },
        });
      }}
    />
  );
};

export default LoginFormContainer;
