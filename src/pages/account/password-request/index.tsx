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
import { redirectToMaintenancePage } from '../../../utils/redirect';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Message = dynamic(() => import('../../../core/components/Message'), {
  loading: () => <Skeleton count={1} />,
});

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
  const [isEmailExist, setIsEmailExist] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [requestPassword, { loading }] = useMutation<
    HelpMeLoginMutation,
    HelpMeLoginMutationVariables
  >(HELP_ME_LOGIN_MUTATION, {
    onCompleted: data => {
      if (data.helpMeLogin?.isSuccessful) {
        setIsEmailSent(true);
      }
    },
  });

  const [checkEmail, { loading: emailLoading }] = useEmailCheck();

  const onSubmit = async (values: IRequestPasswordFormValues) => {
    setIsEmailExist(true);
    setIsEmailSent(false);
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
    if (results?.data?.emailAlreadyExists?.isExists) {
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
        {isEmailSent && (
          <Message message="">
            We&apos;ve emailed you a link to reset your password. <br /> If you
            didn&apos;t receive the email please check your junk or try entering
            your email again.
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

export async function getServerSideProps() {
  return redirectToMaintenancePage();
}

export default withApollo(PasswordRequestPage);
