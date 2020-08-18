import React, { FC } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
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
import { PRIMARY_HEADER } from '../../gql/header';
import {
  PrimaryHeader,
  PrimaryHeader_primaryHeader_linkGroups_linkGroups as LinkGroups,
} from '../../../generated/PrimaryHeader';
import { IHeaderLink } from '../../components/Header/Header';
import { ILink } from '@vanarama/uibook/lib/interfaces/link';

export const LOGOUT_USER_MUTATION = gql`
  mutation LogOutUserMutation($token: String!) {
    logout(token: $token)
  }
`;

const HeaderContainer: FC = () => {
  const { data, loading } = useQuery<PrimaryHeader>(PRIMARY_HEADER);
  const router = useRouter();

  const LOGIN_LINK = {
    label: 'Login',
    href: '/account/login-register',
    query: {
      redirect: router.asPath,
    },
    as: '/account/login-register',
  };

  const [logOut] = useMutation<LogOutUserMutation, LogOutUserMutationVariables>(
    LOGOUT_USER_MUTATION,
  );

  if (loading) {
    return <></>;
  }

  const topLinks = data?.primaryHeader.linkGroups?.reduce(
    (link, linksGroup) => {
      const transformLinks = linksGroup?.links?.map(el => ({
        href: el?.url || '',
        label: el?.text || '',
      }));
      const transformGroupLink = (linksGroup?.linkGroups as LinkGroups[]).map(
        el => ({
          label: el.name || '',
          href: '',
          children: el.links?.map(
            j =>
              ({
                label: j?.text || '',
                href: j?.url || '',
              } as ILink),
          ),
        }),
      );
      let headerTopLinks: IHeaderLink;
      if (transformLinks && transformLinks?.length > 1) {
        const linksGroupUrl = transformLinks.shift() as ILink;
        const specialOffersLinks = {
          ...(transformLinks.shift() as ILink),
          highlight: true,
        };

        const childrenGroupLinks =
          linksGroup?.linkGroups?.length && transformGroupLink
            ? [specialOffersLinks, ...transformGroupLink, ...transformLinks]
            : [specialOffersLinks, ...transformLinks];
        headerTopLinks = {
          href: linksGroupUrl?.href || '',
          label: linksGroup?.name || '',
          children: childrenGroupLinks,
        };
      } else {
        const linksGroupUrl = transformLinks?.shift();
        headerTopLinks = {
          href: linksGroupUrl?.href || '',
          label: linksGroup?.name || '',
        };
      }
      link.push(headerTopLinks);
      return link;
    },
    [] as any[],
  );

  console.log(topLinks);

  return (
    <>
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
      {topLinks?.length && (
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
          topBarLinks={topLinks}
        />
      )}
    </>
  );
};

export default withApollo(HeaderContainer);
