import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { IRegisterFormContainerProps } from './interfaces';
import { useEmailCheck, useRegistration } from './gql';

const RegisterFormContainer: React.FC<IRegisterFormContainerProps> = ({
  onCompleted,
}) => {
  const [register, { loading }] = useRegistration(onCompleted);
  const [emailAlreadyExists] = useEmailCheck();

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
