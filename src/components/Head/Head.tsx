import React, { FC } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { IHeadProps } from './interface';
import {
  defaultTitle,
  twitter,
  defaultImage,
  fb,
  PAGES_WITHOUT_DEFERRED_STYLES,
} from './defaults';
import { FONT_LIST, FONT_PATH } from './fonts';
import { Env } from '../../utils/env';
import { getCanonicalUrl } from '../../utils/url';

const env: any = process?.env?.ENV || '';

// Script environments
const scriptEnvs = {
  // gtm: ['dev', 'uat', 'pre-prod', 'prod'],

  vwo: [Env.UAT, Env.PRE_PROD, Env.PROD],
};

const PRECONNECT = [
  process?.env?.API_URL?.replace('/graphql/', ''),
  process.env.STATIC_DOMAIN,
  scriptEnvs.vwo.includes(env) ? 'https://dev.visualwebsiteoptimizer.com' : '',
  'https://widget.trustpilot.com',
].filter(value => value !== '');

const Head: FC<IHeadProps> = props => {
  const router = useRouter();

  const {
    metaData: { metaDescription, legacyUrl, canonicalUrl },
    paginatedPageNumber,
  } = props;

  let {
    metaData: { metaRobots, title = defaultTitle },
  } = props;

  // Dev override.
  if (process.env.ENV && process.env.ENV !== 'prod') {
    title = `[${process.env.ENV?.toUpperCase()}] ${title}`;
    metaRobots = 'noindex';
  }

  // Paginated override.
  if (title && paginatedPageNumber && paginatedPageNumber > 1) {
    const [pageName, siteName] = title.split('|');
    title = `${pageName} | Page ${paginatedPageNumber} | ${siteName}`;
  }

  return (
    <NextHead>
      {PRECONNECT.map(domain => {
        return <link rel="dns-prefetch" href={domain} key={domain} />;
      })}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>{title}</title>
      {FONT_LIST.map(font => {
        return (
          <link
            key={font}
            rel="preload"
            as="font"
            href={`${FONT_PATH}${font}`}
            type={`font/${font.split('.')[1]}`}
            crossOrigin="anonymous"
          />
        );
      })}

      {!PAGES_WITHOUT_DEFERRED_STYLES.includes(router.pathname) && (
        <link rel="preload" href="/styles/deferred.css" as="style" />
      )}

      {/* Meta */}
      {metaRobots && <meta name="robots" content={metaRobots} />}
      {metaDescription && <meta name="description" content={metaDescription} />}
      <meta name="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="fb:app_id" content={String(fb.appId)} />
      <meta property="fb:admins" content={String(fb.admins)} />
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      <meta property="og:url" content={legacyUrl ?? router.asPath} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta name="og:image" content={defaultImage} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:site" content={twitter} />
      {/* Icon, Canonical */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="canonical" href={getCanonicalUrl(canonicalUrl)} />
    </NextHead>
  );
};

Head.displayName = 'Head';

export default React.memo(Head);
