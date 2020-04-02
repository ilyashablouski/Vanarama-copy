import Heading from '@vanarama/uibook/packages/ui-components/src/components/atoms/heading';
import {
  Column,
  Grid,
} from '@vanarama/uibook/packages/ui-components/src/components/molecules/grid';
import Tabs from '@vanarama/uibook/packages/ui-components/src/components/molecules/tabs';
import { NextPage } from 'next';
import { useState } from 'react';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import RegisterFormContainer from '../../../containers/RegisterFormContainer/RegisterFormContainer';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

export const LoginRegisterPage: NextPage = () => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  return (
    <MainLayout>
      <Grid sm="2" md="2" lg="6">
        <Column sm="row" md="row" lg="2-4">
          <Heading
            tag="span"
            size="xlarge"
            color="black"
            dataTestId="login-register-heading"
          >
            Login / Register
          </Heading>
        </Column>

        {registrationSuccess && (
          <Column sm="row" md="row" lg="2-4">
            <Heading
              tag="span"
              size="regular"
              color="success"
              dataTestId="registeration-success-message"
            >
              Registration successful. Please verify your email.
            </Heading>
          </Column>
        )}

        <Column sm="row" md="row" lg="2-4">
          <div className="login-register-form">
            <Tabs
              active={0}
              tabs={[
                { label: 'Login', dataTestId: 'login-tab' },
                { label: 'Register', dataTestId: 'register-tab' },
              ]}
            >
              <LoginFormContainer />
              <RegisterFormContainer
                onCompleted={() => setRegistrationSuccess(true)}
              />
            </Tabs>
          </div>
        </Column>
      </Grid>
    </MainLayout>
  );
};

export default LoginRegisterPage;
