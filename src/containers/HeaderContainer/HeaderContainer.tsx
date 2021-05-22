import React, { FC, useEffect, useState } from 'react';
import { gql, useMutation, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import { ILink } from 'core/interfaces/link';
import { useMediaQuery } from 'react-responsive';

import { PartnershipsLinks } from 'components/Partnerships/Data/PartnishipLinks';
import {
  getSessionStorage,
  setSessionStorage,
} from 'utils/windowSessionStorage';
import {
  PHONE_NUMBER_LINK,
  FLEET_PHONE_NUMBER_LINK,
} from '../../models/enum/HeaderLinks';

import Header from '../../components/Header';
import { LogOutUserMutation } from '../../../generated/LogOutUserMutation';
import { IHeaderLink } from '../../components/Header/Header';
import {
  GetPrimaryHeaderData as HeaderData,
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups as LinkGroups,
} from '../../../generated/GetPrimaryHeaderData';
import { convertChildrenNavLink, getPromotionalImage } from './helpers';
// eslint-disable-next-line import/no-unresolved
const HEADER_DATA = require('../../deps/data/menuData.json');

export const LOGOUT_USER_MUTATION = gql`
  mutation LogOutUserMutation {
    logoutV2 {
      isSuccessful
    }
  }
`;

const HeaderContainer: FC = () => {
  const data: HeaderData = HEADER_DATA;
  const router = useRouter();
  const client = useApolloClient();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1215px)' });
  const phoneNumberLink =
    router.pathname === '/fleet' ? FLEET_PHONE_NUMBER_LINK : PHONE_NUMBER_LINK;
  const partnerLinks = PartnershipsLinks;

  const LOGIN_LINK = {
    label: 'Login',
    href: '/account/login-register',
    query: {
      redirect: router.asPath,
    },
    as: '/account/login-register',
  };

  const [logOut] = useMutation<LogOutUserMutation>(LOGOUT_USER_MUTATION);

  const [partnership, setPartnership] = useState<string | null>(null);
  const [partnershipLinks, setPartnershipLinks] = useState<any>([]);
  const [partnershipHomeLink, setPartnershipHomeLink] = useState<any>(null);

  const offerLink =
    data?.primaryHeader?.links?.map(el => ({
      href: el?.url || '',
      label: el?.text || '',
      highlight: true,
    })) || [];

  const topLinks = data?.primaryHeader.linkGroups?.reduce(
    (link, linksGroup) => {
      const transformLinks = linksGroup?.links?.map(el => ({
        href: el?.url || '',
        label: el?.text || '',
        id: el?.url || '',
        highlightLabel: el?.label || '',
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
            children: el.links?.map(convertChildrenNavLink),
          }));
        const childrenGroupLinks = transformGroupLink?.length
          ? [specialOffersLinks, ...transformGroupLink, ...transformLinks]
          : [specialOffersLinks, ...transformLinks];

        headerTopLinks = {
          href: linksGroupUrl?.href || '',
          label: linksGroup?.name || '',
          id: linksGroupUrl.label || '',
          promotionalImage: getPromotionalImage(linksGroup),
          children: isTabletOrMobile
            ? [linksGroupUrl, ...childrenGroupLinks]
            : childrenGroupLinks,
        };
      } else if (linksGroup?.linkGroups?.length) {
        const transformGroupLink =
          linksGroup?.linkGroups &&
          (linksGroup?.linkGroups as LinkGroups[]).map(el => {
            const childrenLinkArray: ILink[] = el.links!.map(
              convertChildrenNavLink,
            );
            const linksGroupUrl = childrenLinkArray.shift() as ILink;
            const specialOffersLinks = {
              ...(childrenLinkArray.shift() as ILink),
              highlight: true,
            };
            const childrenLink = [specialOffersLinks, ...childrenLinkArray];

            return {
              label: el.name || '',
              href: linksGroupUrl.href,
              id: el?.name || '',
              children: isTabletOrMobile
                ? [linksGroupUrl, ...childrenLink]
                : childrenLink,
              promotionalImage: getPromotionalImage(el),
            };
          });

        headerTopLinks = {
          href: '',
          label: linksGroup?.name || '',
          id: linksGroup.name || '',
          promotionalImage: getPromotionalImage(linksGroup),
          children: transformGroupLink,
        };
      } else {
        const linksGroupUrl = transformLinks?.shift();
        headerTopLinks = {
          href: linksGroupUrl?.href || '',
          label: linksGroup?.name || '',
          id: linksGroupUrl?.id,
          promotionalImage: getPromotionalImage(linksGroup),
        };
      }
      link.push(headerTopLinks);
      return link;
    },
    [] as any[],
  );

  // check if user is on a partnership journey
  useEffect(() => {
    const partnerName = getSessionStorage('partnerships');
    const path = router.pathname;
    if (partnerName) {
      setPartnership(partnerName);
      const links = partnerLinks.find(p => p.name === partnerName)?.links;
      setPartnershipLinks(links);
    } else if (path.includes('partnerships')) {
      const partner = path.split('/').pop();
      if (partner) {
        setPartnership(partner);
        setPartnershipHomeLink(`/partnerships/${partner}`);
        setSessionStorage('partnerships', partner);
        const links = partnerLinks.find(p => p.name === partner)?.links;
        setPartnershipLinks(links);
      }
    }
  }, []);

  if (partnership) {
    return (
      <Header
        onLogOut={async () => {
          await localForage.clear();
          await client.resetStore();
          await logOut().catch();
        }}
        loginLink={LOGIN_LINK}
        phoneNumberLink={phoneNumberLink}
        topBarLinks={[...partnershipLinks]}
        customHomePath={partnershipHomeLink}
      />
    );
  }

  if (topLinks?.length) {
    return (
      <Header
        onLogOut={async () => {
          await localForage.clear();
          await client.resetStore();
          await logOut().catch();
        }}
        loginLink={LOGIN_LINK}
        phoneNumberLink={phoneNumberLink}
        topBarLinks={[...offerLink, ...topLinks]}
      />
    );
  }
  return <></>;
};

export default HeaderContainer;
