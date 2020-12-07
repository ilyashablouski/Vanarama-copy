import React, { FC } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import { ILink } from '@vanarama/uibook/lib/interfaces/link';

import { PHONE_NUMBER_LINK } from '../../models/enum/HeaderLinks';

import Header from '../../components/Header';
import { LogOutUserMutation } from '../../../generated/LogOutUserMutation';
import { PrimaryHeader_primaryHeader_linkGroups_linkGroups as LinkGroups } from '../../../generated/PrimaryHeader';
import { IHeaderLink } from '../../components/Header/Header';
import { useMobileViewport } from '../../hooks/useMediaQuery';
import HEADER_DATA from '../../../deps/data/menuData.json';

export const LOGOUT_USER_MUTATION = gql`
  mutation LogOutUserMutation {
    logoutV2 {
      isSuccessfull
    }
  }
`;

const HeaderContainer: FC = () => {
  const data = HEADER_DATA;
  const router = useRouter();
  const isMobile = useMobileViewport();

  const LOGIN_LINK = {
    label: 'Login',
    href: '/account/login-register',
    query: {
      redirect: router.asPath,
    },
    as: '/account/login-register',
  };

  const [logOut] = useMutation<LogOutUserMutation>(LOGOUT_USER_MUTATION);

  const offerLink = data?.primaryHeader?.links?.map(el => ({
    href: el?.url || '',
    label: el?.text || '',
    highlight: true,
  }));

  const topLinks = data?.primaryHeader.linkGroups?.reduce(
    (link, linksGroup) => {
      const transformLinks = linksGroup?.links?.map(el => ({
        href: el?.url || '',
        label: el?.text || '',
        id: el?.url || '',
      }));
      let headerTopLinks: IHeaderLink;
      if (transformLinks && transformLinks?.length > 1) {
        const linksGroupUrl = transformLinks.shift() as ILink;
        const specialOffersLinks = {
          ...(transformLinks.shift() as ILink),
          highlight: !!linksGroup?.linkGroups?.length,
        };
        const transformGroupLink =
          linksGroup?.linkGroups &&
          (linksGroup?.linkGroups as LinkGroups[]).map(el => ({
            label: el.name || '',
            href: '',
            id: el?.name || '',
            children: el.links?.map(
              j =>
                ({
                  label: j?.text || '',
                  href: j?.url || '',
                  query: { isChangePage: 'true' },
                  id: j?.url || '',
                  as: j?.url,
                } as ILink),
            ),
          }));
        const childrenGroupLinks = transformGroupLink?.length
          ? [specialOffersLinks, ...transformGroupLink, ...transformLinks]
          : [specialOffersLinks, ...transformLinks];

        headerTopLinks = {
          href: linksGroupUrl?.href || '',
          label: linksGroup?.name || '',
          id: linksGroupUrl.label || '',
          promotionalImage: {
            url: linksGroup?.promotionalImage?.url || '',
            image: {
              url: linksGroup?.promotionalImage?.image?.[0]?.file.url || '',
              fileName:
                linksGroup?.promotionalImage?.image?.[0]?.file.fileName || '',
            },
          },
          children: isMobile
            ? [linksGroupUrl, ...childrenGroupLinks]
            : childrenGroupLinks,
        };
      } else {
        const linksGroupUrl = transformLinks?.shift();
        headerTopLinks = {
          href: linksGroupUrl?.href || '',
          label: linksGroup?.name || '',
          id: linksGroupUrl?.id,
          promotionalImage: {
            url: linksGroup?.promotionalImage?.url || '',
            image: {
              url: linksGroup?.promotionalImage?.image?.[0]?.file.url || '',
              fileName:
                linksGroup?.promotionalImage?.image?.[0]?.file.fileName || '',
            },
          },
        };
      }
      link.push(headerTopLinks);
      return link;
    },
    [] as any[],
  );

  if (topLinks?.length) {
    return (
      <Header
        onLogOut={async () => {
          await logOut();
          await localForage.clear();
        }}
        loginLink={LOGIN_LINK}
        phoneNumberLink={PHONE_NUMBER_LINK}
        topBarLinks={[...offerLink, ...topLinks]}
      />
    );
  }
  return <></>;
};

export default HeaderContainer;
