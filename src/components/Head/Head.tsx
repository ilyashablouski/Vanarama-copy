import React, { FC } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { IHeadProps } from './interface';
import { defaultTitle, twitter, defaultImage, fb } from './defaults';

const STATIC_DOMAIN = 'https://static.vanarama-nonprod.com';
const FONT_PATH = `${STATIC_DOMAIN}/fonts/`;

const PRECONNECT = [
  process.env.API_URL,
  STATIC_DOMAIN,
  '//cdn.embedly.com',
  'https://cdn.blueconic.net',
  'https://www.riddle.com',
  'https://widget.trustpilot.com',
  'https://cdn.speedcurve.com',
];

const FONT_LIST = [
  'DkMono/DkMono-400-normal.otf',
  'DkMono/DkMono-400-italic.otf',
  'FFCocon/FFCocon-300-normal.otf',
  'FFCocon/FFCocon-300-italic.otf',
  'FFCocon/FFCocon-400-normal.otf',
  'FFCocon/FFCocon-400-italic.otf',
  'NunitoSans/NunitoSans-200-normal.otf',
  'NunitoSans/NunitoSans-200-italic.otf',
  'NunitoSans/NunitoSans-300-normal.otf',
  'NunitoSans/NunitoSans-300-italic.otf',
  'NunitoSans/NunitoSans-400-normal.otf',
  'NunitoSans/NunitoSans-400-italic.otf',
  'NunitoSans/NunitoSans-500-normal.otf',
  'NunitoSans/NunitoSans-500-italic.otf',
  'NunitoSans/NunitoSans-600-normal.otf',
  'NunitoSans/NunitoSans-600-italic.otf',
  'NunitoSans/NunitoSans-700-normal.otf',
  'NunitoSans/NunitoSans-700-italic.otf',
  'NunitoSans/NunitoSans-800-normal.otf',
  'NunitoSans/NunitoSans-800-italic.otf',
];

const Head: FC<IHeadProps> = props => {
  const router = useRouter();

  const {
    metaData: { metaDescription, legacyUrl, canonicalUrl },
  } = props;

  let {
    metaData: { metaRobots, title = defaultTitle },
  } = props;

  // Dev override.
  if (process.env.ENV && process.env.ENV !== 'production') {
    title = `[${process.env.ENV?.toUpperCase()}] ${title}`;
    metaRobots = 'noindex';
  }

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="fb:app_id" content={String(fb.appId)} />
      <meta property="fb:admins" content={String(fb.admins)} />
      {metaRobots && <meta name="robots" content={metaRobots} />}
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      {metaDescription && <meta name="description" content={metaDescription} />}
      <link rel="canonical" href={canonicalUrl ?? legacyUrl ?? router.asPath} />
      {legacyUrl && <meta property="og:url" content={legacyUrl} />}
      <meta property="og:site_name" content={defaultTitle} />
      <meta name="og:image" content={defaultImage} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:site" content={twitter} />
      {PRECONNECT.map(domain => {
        return <link rel="preconnect dns-prefetch" href={domain} />;
      })}
      {FONT_LIST.map(font => {
        return (
          <link key={font} href={`${FONT_PATH}${font}`} type="font/woff2" />
        );
      })}
      <link href={FONT_PATH.replace('/fonts/', '')} />
      <link href={process?.env?.API_URL?.replace('/graphql/', '')} />
    </NextHead>
  );
};

Head.displayName = 'Head';

export default React.memo(Head);
