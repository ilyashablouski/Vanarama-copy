import React, { FC, memo } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import SchemaJSON from 'core/atoms/schema-json';
import { IHeadProps } from './interface';

import { defaultTitle, twitter, fb } from './defaults';
import { FONT_LIST, FONT_PATH } from './fonts';
import { Env } from '../../utils/env';
import { removeUrlQueryPart } from '../../utils/url';

const env: any = process?.env?.ENV || '';

// Script environments
const scriptEnvs = {
  // gtm: ['uat', 'pre-prod', 'prod'],

  blueconic: [Env.UAT, Env.PRE_PROD, Env.PROD],

  vwo: [Env.UAT, Env.PRE_PROD, Env.PROD],
};

const PRECONNECT = [
  process?.env?.API_URL?.replace('/graphql/', ''),
  process.env.STATIC_DOMAIN,
  scriptEnvs.blueconic.includes(env) ? 'https://cdn.blueconic.net' : '',
  scriptEnvs.vwo.includes(env) ? 'https://dev.visualwebsiteoptimizer.com' : '',
  'https://widget.trustpilot.com',
].filter(value => value !== '');

const ArticleHead: FC<IHeadProps> = props => {
  const router = useRouter();

  const {
    metaData: { metaDescription, legacyUrl, canonicalUrl, schema, publishedOn },
    featuredImage,
  } = props;

  let {
    metaData: { metaRobots, title = defaultTitle },
  } = props;

  // Dev override.
  if (process.env.ENV && process.env.ENV !== 'prod') {
    title = `[${process.env.ENV?.toUpperCase()}] ${title}`;
    metaRobots = 'noindex';
  }

  return (
    <>
      <NextHead>
        <link rel="preconnect" href="https://cdn.blueconic.com" />
        {PRECONNECT.map(domain => {
          return <link rel="dns-prefetch" href={domain} key={domain} />;
        })}
        <title>{title}</title>
        {/* Preload and Preconnect */}
        {FONT_LIST.map((font: any) => {
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
        {/* Meta */}
        {metaRobots && <meta name="robots" content={metaRobots} />}
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="fb:app_id" content={String(fb.appId)} />
        <meta property="fb:admins" content={String(fb.admins)} />
        {metaDescription && (
          <meta property="og:description" content={metaDescription} />
        )}
        <meta property="og:url" content={legacyUrl ?? router.asPath} />
        <meta property="og:site_name" content={defaultTitle} />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/vanarama/"
        />
        {publishedOn && (
          <meta property="article:modified_time" content={publishedOn} />
        )}
        {featuredImage?.file && (
          <>
            <meta property="og:image" content={featuredImage.file.url} />
            <meta name="twitter:image" content={featuredImage.file.url} />
            {featuredImage.file.details?.image?.width && (
              <meta
                property="og:image:width"
                content={featuredImage.file.details.image.width.toString()}
              />
            )}
            {featuredImage.file.details?.image?.height && (
              <meta
                property="og:image:height"
                content={featuredImage.file.details.image.height.toString()}
              />
            )}
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || defaultTitle} />
        <meta name="twitter:creator" content={twitter} />
        <meta name="twitter:site" content={twitter} />
        {/* Icon, Canonical */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link
          rel="canonical"
          href={removeUrlQueryPart(
            canonicalUrl ?? legacyUrl ?? router.asPath ?? '',
          )}
        />
      </NextHead>
      <SchemaJSON json={JSON.stringify(schema)} />
    </>
  );
};

ArticleHead.displayName = 'Head';

export default memo(ArticleHead);
