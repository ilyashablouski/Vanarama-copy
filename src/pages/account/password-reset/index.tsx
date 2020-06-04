import React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import PasswordResetContainer from '../../../containers/PasswordResetContainer';
import withApollo from '../../../hocs/withApollo';

export const PasswordResetPage: NextPage = () => {
  const { query } = useRouter();
  const code = query.code as string;
  const email = query.email as string;

  return (
    <>
      <div className="row:title">
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataTestId="reset-password"
        >
          Create New Password
        </Heading>
      </div>
      <div className="row:form">
        <PasswordResetContainer code={code} username={email} />
      </div>
    </>
  );
};

export default withApollo(PasswordResetPage);
