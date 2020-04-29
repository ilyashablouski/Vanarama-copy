import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import RegisterFormContainer from '../../../containers/RegisterFormContainer/RegisterFormContainer';
import withApollo from '../../../hocs/withApollo';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

const Message: React.SFC<{ message: string }> = ({ message }) => (
  <Column sm="row" md="row" lg="2-4">
    <Heading
      tag="span"
      size="regular"
      color="success"
      dataTestId="registration-success-message"
    >
      {message}
    </Heading>
  </Column>
);

interface IProps {
  query: ParsedUrlQuery;
}

export const LoginRegisterPage: NextPage<IProps> = (props: IProps) => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { query } = props;

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

        {query.status === 'success' && (
          <Message message="Email successfully verified." />
        )}

        {registrationSuccess && (
          <Message message="Registration successful. Please verify your email." />
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

LoginRegisterPage.getInitialProps = ({ query }) => {
  return { query };
};

export default withApollo(LoginRegisterPage);
