import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Container from '@vanarama/uibook/lib/components/container/Container';
import Section from '@vanarama/uibook/lib/components/container/Section';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import Tabs from '@vanarama/uibook/lib/components/molecules/tabs';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import CheckmarkSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkSharp';
import Message from '../../../core/components/Message';
import LoginFormContainer from '../../../containers/LoginFormContainer/LoginFormContainer';
import RegisterFormContainer from '../../../containers/RegisterFormContainer/RegisterFormContainer';
import withApollo from '../../../hocs/withApollo';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

interface IProps {
  query: ParsedUrlQuery;
}

export const LoginRegisterPage: NextPage<IProps> = (props: IProps) => {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { query } = props;

  return (
    <MainLayout>
      <Section>
        <Container>
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

            {query.hasResetPassword && (
              <Message message="Password Successfully Reset">
                <Icon icon={<CheckmarkSharp />} size="regular" color="teal" />
              </Message>
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
        </Container>
      </Section>
    </MainLayout>
  );
};

LoginRegisterPage.getInitialProps = ({ query }) => {
  return { query };
};

export default withApollo(LoginRegisterPage);
