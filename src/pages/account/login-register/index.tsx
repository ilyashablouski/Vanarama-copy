import Heading from '@vanarama/uibook/src/components/atoms/heading';
import Container from '@vanarama/uibook/src/components/container/Container';
import Section from '@vanarama/uibook/src/components/container/Section';
import { Column, Grid } from '@vanarama/uibook/src/components/molecules/grid';
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
    <Section>
      <Container>
        <Grid sm="2" lg="6">
          <Column sm="row" lg="2-4">
            <Heading tag="span" size="xlarge" color="black">
              Login / Register
            </Heading>
          </Column>

          {registrationSuccess && (
            <Column sm="row" lg="2-4">
              <Heading tag="span" size="regular" color="success">
                Registration successful. Please verify your email.
              </Heading>
            </Column>
          )}

          <Column sm="row" lg="2-4">
            <div className="login-register-form">
              <Tabs active={0} tabs={['Login', 'Register']}>
                <Login
                  login={loginUser}
                  authenticated={authenticated}
                  token={token}
                />
                <RegisterForm onSuccess={() => setRegistrationSuccess(true)} />
              </Tabs>
            </div>
          </Column>
        </Grid>
      </Container>
    </Section>
  );
};

const mapStateToProps = ({ auth: { authenticated, data } }: RootState) => ({
  authenticated,
  token: data && data.token,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterPage);
