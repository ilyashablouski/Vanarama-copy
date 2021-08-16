import { gql, useMutation } from '@apollo/client';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import {
  HelpMeLoginMutation,
  HelpMeLoginMutationVariables,
} from '../../../../generated/HelpMeLoginMutation';
import RequestPasswordForm from '../../../components/RequestPasswordForm';
import { IRequestPasswordFormValues } from '../../../components/RequestPasswordForm/interfaces';
import { useEmailCheck } from '../../../containers/RegisterFormContainer/gql';
import withApollo from '../../../hocs/withApollo';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';

const Message = dynamic(() => import('../../../core/components/Message'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
  ssr: false,
});
const CheckmarkSharp = dynamic(
  () => import('core/assets/icons/CheckmarkSharp'),
  {
    ssr: false,
  },
);

interface IProps {
  query: ParsedUrlQuery;
}

export const HELP_ME_LOGIN_MUTATION = gql`
  mutation HelpMeLoginMutation($username: String!) {
    helpMeLogin(username: $username) {
      isSuccessful
    }
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
    HelpMeLoginMutation,
    HelpMeLoginMutationVariables
  >(HELP_ME_LOGIN_MUTATION, {
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
    setIsEmailExist(
      (results?.data?.emailAlreadyExists?.isExists &&
        !results?.data?.emailAlreadyExists?.isTemporary) ||
        false,
    );
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
          Problems logging in?
        </Heading>
        <Text color="darker" size="lead">
          Enter your email address below and we&apos;ll send you an email with
          the next steps
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
