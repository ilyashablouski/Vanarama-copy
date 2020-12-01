import { gql, useMutation } from '@apollo/client';
import CheckmarkSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkSharp';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import {
  PasswordRequestMutation as Mutation,
  PasswordRequestMutationVariables as MutationVariables,
} from '../../../../generated/PasswordRequestMutation';
import RequestPasswordForm from '../../../components/RequestPasswordForm';
import { IRequestPasswordFormValues } from '../../../components/RequestPasswordForm/interfaces';
import { useEmailCheck } from '../../../containers/RegisterFormContainer/gql';
import Message from '../../../core/components/Message';
import withApollo from '../../../hocs/withApollo';
import Head from '../../../components/Head/Head';

interface IProps {
  query: ParsedUrlQuery;
}

export const PASSWORD_REQUEST_MUTATION = gql`
  mutation PasswordRequestMutation($username: String!) {
    passwordReset(username: $username)
  }
`;

const metaData = {
  canonicalUrl: null,
  legacyUrl: null,
  metaDescription: null,
  metaRobots: null,
  name: null,
  pageType: null,
  publishedOn: null,
  slug: null,
  title: 'Forgot your password? | Vanarama',
  schema: null,
  breadcrumbs: null,
};

export const PasswordRequestPage: NextPage<IProps> = () => {
  const [hasRequest, setRequestStatus] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(true);

  const [requestPassword, { loading }] = useMutation<
    Mutation,
    MutationVariables
  >(PASSWORD_REQUEST_MUTATION, {
    onCompleted: () => {
      setRequestStatus(true);
    },
  });

  const [checkEmail, { loading: emailLoading }] = useEmailCheck();

  const onSubmit = async (values: IRequestPasswordFormValues) => {
    setRequestStatus(false);
    setIsEmailExist(true);
    const results = await checkEmail({
      variables: {
        email: values.email,
      },
    });
    setIsEmailExist(results?.data?.emailAlreadyExists || false);
    if (results?.data?.emailAlreadyExists) {
      await requestPassword({
        variables: {
          username: values.email,
        },
      });
    }
  };

  return (
    <>
      <div className="row:title">
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataTestId="login-register-heading"
        >
          Forgot Your Password?
        </Heading>
        <Text color="darker" size="lead">
          Enter your email address below and we&apos;ll send you a password
          reset link by email.
        </Text>
        {hasRequest && (
          <Message message="Please check your email">
            <Icon icon={<CheckmarkSharp />} size="regular" color="teal" />
          </Message>
        )}
      </div>
      <div className="row:form">
        <RequestPasswordForm
          onSubmit={onSubmit}
          hasError={!isEmailExist}
          isSubmitting={loading || emailLoading}
        />
      </div>
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export default withApollo(PasswordRequestPage);
