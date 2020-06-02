import React, { useState, useEffect } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import { NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import PasswordResetContainer from '../../../containers/PasswordResetContainer';
import withApollo from '../../../hocs/withApollo';

interface IProps {
  query: ParsedUrlQuery;
}

export const PasswordResetPage: NextPage<IProps> = () => {
  const [username, setUsername] = useState('');
  const { query } = useRouter();
  useEffect(() => {
    setUsername(
      Array.isArray(query?.username) ? query.username[0] : query?.username,
    );
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
        <PasswordResetContainer username={username} />
      </div>
    </>
  );
};

export default withApollo(PasswordResetPage);
