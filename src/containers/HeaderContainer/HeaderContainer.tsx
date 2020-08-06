import React, { FC } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import localForage from 'localforage';

import {
  PHONE_NUMBER_LINK,
  TOP_BAR_LINKS,
} from '../../models/enum/HeaderLinks';

import withApollo from '../../hocs/withApollo';
import Header from '../../components/Header';
import {
  LogOutUserMutation,
  LogOutUserMutationVariables,
} from '../../../generated/LogOutUserMutation';

export const LOGOUT_USER_MUTATION = gql`
  mutation LogOutUserMutation($token: String!) {
    logout(token: $token)
  }
`;

const HeaderContainer: FC = () => {
  const router = useRouter();

  const LOGIN_LINK = {
    label: 'Login',
    href: `/account/login-register`,
    query: { redirect: router.asPath },
    as: `/account/login-register`,
  };

  const [logOut] = useMutation<LogOutUserMutation, LogOutUserMutationVariables>(
    LOGOUT_USER_MUTATION,
  );

  return (
    <Header
      onLogOut={async () => {
        const token = await localForage.getItem<string>('token');
        await logOut({
          variables: {
            token,
          },
        });
        await localForage.clear();
      }}
      loginLink={LOGIN_LINK}
      phoneNumberLink={PHONE_NUMBER_LINK}
      topBarLinks={TOP_BAR_LINKS}
    />
  );
};

export default withApollo(HeaderContainer);
