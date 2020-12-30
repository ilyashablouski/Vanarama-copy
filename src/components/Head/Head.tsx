import React, { FC } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { IHeadProps } from './interface';
import { defaultTitle, twitter, defaultImage, fb } from './defaults';
import { FONT_LIST, FONT_PATH } from './fonts';

// const STATIC_DOMAIN = 'https://static.vanarama-nonprod.com';

const PRECONNECT = [
  process?.env?.API_URL?.replace('/graphql/', ''),
  process.env.STATIC_DOMAIN,
  '//cdn.embedly.com',
  'https://cdn.blueconic.net',
  'https://www.riddle.com',
  'https://widget.trustpilot.com',
  // 'https://cdn.speedcurve.com',
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
      <link rel="icon" type="image/png" href="/favicon.png" />
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

      {FONT_LIST.map(font => {
        return (
          <link
            key={font}
            rel="preload"
            as="font"
            href={`${FONT_PATH}${font}`}
            type="font/woff2"
            crossOrigin=""
          />
        );
      })}

      {PRECONNECT.map(domain => {
        return <link rel="dns-prefetch" href={domain} key={domain} />;
      })}
    </NextHead>
  );
};

Head.displayName = 'Head';

export default React.memo(Head);
