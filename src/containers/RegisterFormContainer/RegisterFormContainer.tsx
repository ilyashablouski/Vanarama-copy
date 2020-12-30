import { IRegisterFormValues } from '../../components/RegisterForm/interfaces';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { IRegisterFormContainerProps } from './interfaces';
import { useEmailCheck, useRegistration } from './gql';

const RegisterFormContainer: React.FC<IRegisterFormContainerProps> = ({
  onCompleted,
  onError,
}) => {
  const [register, { loading }] = useRegistration(onCompleted, onError);
  const [emailAlreadyExists] = useEmailCheck();

  return (
    <RegisterForm
      isSubmitting={loading}
      onSubmit={async (values: IRegisterFormValues, event: any) => {
        register({
          variables: {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.email,
            password: values.password,
          },
        }).then(() => {
          event.target.reset(); // reset form after form submit
        });
      }}
      onCheckEmailExists={async value => {
        const results = await emailAlreadyExists({
          variables: { email: value },
        });

        const isSuccessfull = results.data?.emailAlreadyExists?.isSuccessfull;
        const isExists = results.data?.emailAlreadyExists?.isExists;
        const isTemporary = results.data?.emailAlreadyExists?.isTemporary;

        if (!isSuccessfull || isTemporary) {
          return false;
        }

        return Boolean(isExists);
      }}
    />
  );
};

export default RegisterFormContainer;
