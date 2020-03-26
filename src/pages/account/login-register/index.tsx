import Heading from '@vanarama/uibook/src/components/atoms/heading';
import Tabs from '@vanarama/uibook/src/components/molecules/tabs';
import { useState } from 'react';
import { connect } from 'react-redux';
import Login from '../../../components/account/login';
import RegisterForm from '../../../components/RegisterForm/RegisterForm';
import { login } from '../../../services/redux/account/login/actions';
import { RootState } from '../../../services/redux/rootState';

interface IProps {
  authenticated: boolean;
  login: (email: string, password: string) => void;
  token: string;
}

export const LoginRegisterPage: React.FC<IProps> = ({
  login: loginUser,
  authenticated,
  token,
}) => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  return (
    <section className="section">
      <Heading size="xlarge">Login / Register</Heading>
      {registrationSuccess && (
        <Heading size="regular" color="success">
          Registration successful. Please verify your email.
        </Heading>
      )}
      <Tabs active={0} tabs={['Login', 'Register']}>
        <section>
          <Login
            login={loginUser}
            authenticated={authenticated}
            token={token}
          />
        </section>
        <section>
          <RegisterForm onSuccess={() => setRegistrationSuccess(true)} />
        </section>
      </Tabs>
    </section>
  );
};

const mapStateToProps = ({ auth: { authenticated, data } }: RootState) => ({
  authenticated,
  token: data && data.token,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterPage);
