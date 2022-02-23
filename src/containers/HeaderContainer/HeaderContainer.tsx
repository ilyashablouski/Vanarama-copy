import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import localForage from 'localforage';
import { useMediaQuery } from 'react-responsive';
import { ILink } from 'core/interfaces/link';
import {
  clearInactiveSessionFuelTypes,
  getPartnerProperties,
  removePartnerProperties,
} from 'utils/partnerProperties';
import Cookies from 'js-cookie';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import { getPartnershipLinks } from '../../components/Partnerships/helpers';
import Header from '../../components/Header';
import { IHeaderLink } from '../../components/Header/Header';
import { convertChildrenNavLink, convertPromoImageLink } from './helpers';
import { useStoredPersonQuery } from '../../gql/storedPerson';
import {
  GetPrimaryHeaderData as HeaderData,
  GetPrimaryHeaderData_primaryHeader_linkGroups_linkGroups as LinkGroups,
} from '../../../generated/GetPrimaryHeaderData';
import {
  PHONE_NUMBER_LINK,
  FLEET_PHONE_NUMBER_LINK,
} from '../../models/enum/HeaderLinks';
import { LinkTypes } from '../../models/enum/LinkTypes';
import { removeAuthenticationCookies } from '../../utils/authentication';
import {
  addHeapUserIdentity,
  addHeapUserProperties,
} from '../../utils/addHeapProperties';
import { useLogOutMutation } from './gql';
// eslint-disable-next-line import/no-unresolved
const HEADER_DATA = require('../../deps/data/menuData.json');

const creteLoginLink = (redirect: string) => ({
  label: 'Login',
  href: '/account/login-register',
  query: {
    redirect,
  },
  as: '/account/login-register',
});

interface IProps {
  serviceBanner?: IServiceBanner;
}

const HeaderContainer: FC<IProps> = ({ serviceBanner }) => {
  const data: HeaderData = HEADER_DATA;
  const router = useRouter();
  const client = useApolloClient();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1215px)' });
  const phoneNumberLink =
    router.pathname === '/fleet' ? FLEET_PHONE_NUMBER_LINK : PHONE_NUMBER_LINK;

  const loginLink = useMemo(() => creteLoginLink(router.asPath), [
    router.asPath,
  ]);

  const [logOut] = useLogOutMutation();
  const { data: storedPersonData, refetch } = useStoredPersonQuery(
    operationResult => {
      if (operationResult?.storedPerson) {
        addHeapUserIdentity(
          operationResult?.storedPerson?.emailAddresses?.[0].value,
        );
        addHeapUserProperties({
          uuid: operationResult?.storedPerson?.uuid,
          bcuid: Cookies.get('BCSessionID') || 'undefined',
        });
      }
    },
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  const [partnership, setPartnership] = useState<string | null>(null);
  const [partnershipLinks, setPartnershipLinks] = useState<any>([]);
  const [partnershipHomeLink, setPartnershipHomeLink] = useState<any>(null);
  const [partnershipPhoneLink, setPartnershipPhoneLink] = useState<any>(null);

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
          id: linksGroupUrl.id || '',
          promoImagesLinks: linksGroup?.promotionalImages?.map(
            convertPromoImageLink,
          ),
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
              promoImageLink: convertPromoImageLink(el.promotionalImage),
              children: isTabletOrMobile
                ? [linksGroupUrl, ...childrenLink]
                : childrenLink,
            };
          });

        const linksGroupUrl = transformLinks?.shift() as ILink;
        headerTopLinks = {
          href: linksGroupUrl?.href || '',
          label: linksGroup?.name || '',
          id: linksGroupUrl?.id || '',
          promoImagesLinks: linksGroup?.promotionalImages?.map(
            convertPromoImageLink,
          ),
          children: isTabletOrMobile
            ? [linksGroupUrl, ...transformGroupLink]
            : transformGroupLink,
        };
      } else {
        const linksGroupUrl = transformLinks?.shift() as ILink;
        headerTopLinks = {
          href: linksGroupUrl?.href || '',
          label: linksGroup?.name || '',
          id: linksGroupUrl?.id || '',
          promoImagesLinks: linksGroup?.promotionalImages?.map(
            convertPromoImageLink,
          ),
        };
      }
      link.push(headerTopLinks);
      return link;
    },
    [] as any[],
  );

  // check if user is on a partnership journey
  useEffect(() => {
    const partnerDetails = getPartnerProperties();
    const path = window?.location?.pathname;
    const pathname = path.split('/').pop();
    if (!pathname) {
      removePartnerProperties();
    } else if (partnerDetails) {
      const partnerName = partnerDetails?.slug;
      setPartnership(partnerName || null);
      setPartnershipHomeLink(`/partnerships/${partnerName?.toLowerCase()}`);
      const links = getPartnershipLinks(partnerDetails.vehicleTypes);
      setPartnershipLinks(links);
    } else if (path.includes('partnerships')) {
      if (pathname) {
        setPartnership(pathname);
        setPartnershipHomeLink(`/partnerships/${pathname?.toLowerCase()}`);
      }
    }
  }, []);

  useEffect(() => {
    clearInactiveSessionFuelTypes();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (getPartnerProperties()) {
        const partnerDetails = getPartnerProperties();
        if (partnerDetails?.telephone) {
          const hrefNumber = partnerDetails.telephone.replace(/\s/g, '');
          const phoneData = {
            href: `tel:${hrefNumber}`,
            label: partnerDetails.telephone,
            linkType: LinkTypes.external,
          };
          setPartnershipPhoneLink(phoneData);
        }
        const links = getPartnershipLinks(partnerDetails?.vehicleTypes);
        setPartnershipLinks(links);
      }
    }, 500);
  }, []);

  const handleLogOut = useCallback(async () => {
    removeAuthenticationCookies();
    await localForage.clear();
    await logOut().catch(() => {});
    await client.resetStore();
  }, [client, logOut]);

  if (partnership) {
    return (
      <Header
        serviceBanner={serviceBanner}
        person={storedPersonData?.storedPerson}
        onLogOut={handleLogOut}
        loginLink={loginLink}
        phoneNumberLink={partnershipPhoneLink || phoneNumberLink}
        topBarLinks={partnershipLinks}
        customHomePath={partnershipHomeLink}
      />
    );
  }

  if (topLinks?.length) {
    return (
      <Header
        serviceBanner={serviceBanner}
        person={storedPersonData?.storedPerson}
        onLogOut={handleLogOut}
        loginLink={loginLink}
        phoneNumberLink={phoneNumberLink}
        topBarLinks={[...offerLink, ...topLinks]}
      />
    );
  }

  return <></>;
};

export default HeaderContainer;
