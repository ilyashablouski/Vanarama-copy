import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Container from '@vanarama/uibook/lib/components/container/Container';
import Section from '@vanarama/uibook/lib/components/container/Section';
import { Column, Grid } from '@vanarama/uibook/lib/components/molecules/grid';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import CheckmarkSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkSharp';
import Message from '../../../core/components/Message';
import RequestPasswordForm from '../../../components/RequestPasswordForm';
import {
  PasswordRequestMutation as Mutation,
  PasswordRequestMutationVariables as MutationVariables,
} from '../../../../generated/PasswordRequestMutation';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import withApollo from '../../../hocs/withApollo';

interface IProps {
  query: ParsedUrlQuery;
}

export const PASSWORD_REQUEST_MUTATION = gql`
  mutation PasswordRequestMutation($username: String!) {
    passwordReset(username: $username)
  }
`;

export const PasswordRequestPage: NextPage<IProps> = () => {
  const [hasRequest, setRequestStatus] = useState(false);

  const [requestPassword, { loading, error }] = useMutation<
    Mutation,
    MutationVariables
  >(PASSWORD_REQUEST_MUTATION, {
    onCompleted: () => {
      setRequestStatus(true);
    },
  });
  return (
    <MainLayout>
      <Section>
        <Container>
          <Grid sm="2" md="2" lg="5">
            <Column sm="row" md="row" lg="2-4">
              <Heading
                tag="h2"
                size="xlarge"
                color="black"
                dataTestId="login-register-heading"
              >
                Forgot Your Password?
              </Heading>
              <Text color="darker" size="lead">
                Enter your email address below and we`&apos;`ll send you a
                password reset link by email.
              </Text>
            </Column>
            {hasRequest && (
              <Message message="Please check your email">
                <Icon icon={<CheckmarkSharp />} size="regular" color="teal" />
              </Message>
            )}
            <Column sm="row" md="row" lg="2-4">
              <div className="login-register-form">
                <RequestPasswordForm
                  onSubmit={async values => {
                    await requestPassword({
                      variables: {
                        username: values.email,
                      },
                    });
                  }}
                  hasError={Boolean(error)}
                  isSubmitting={loading}
                />
              </div>
            </Column>
          </Grid>
        </Container>
      </Section>
    </MainLayout>
  );
};

export default withApollo(PasswordRequestPage);
