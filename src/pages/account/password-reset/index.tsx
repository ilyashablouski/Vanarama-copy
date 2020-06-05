import React, { useState, useEffect } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import PasswordResetContainer from '../../../containers/PasswordResetContainer';
import withApollo from '../../../hocs/withApollo';

export const PasswordResetPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const { query } = useRouter();

  useEffect(() => {
    setEmail(Array.isArray(query?.email) ? query.email[0] : query?.email);
    setCode(Array.isArray(query?.code) ? query.code[0] : query?.code);
  }, [query]);

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
        {code! && <PasswordResetContainer code={code!} username={email} />}
      </div>
    </>
  );
};

export default withApollo(PasswordResetPage);
