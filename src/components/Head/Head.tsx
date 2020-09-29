import React, { FC, memo } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import { IHeadProps } from './interface';
import { defaultTitle, twitter, defaultImage, fb } from './defaults';

const Head: FC<IHeadProps> = props => {
  const router = useRouter();

  const {
    metaData: { metaDescription, legacyUrl, canonicalUrl, schema },
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
    <>
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
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        <link
          rel="canonical"
          href={canonicalUrl ?? legacyUrl ?? router.asPath}
        />
        {legacyUrl && <meta property="og:url" content={legacyUrl} />}
        <meta property="og:site_name" content={defaultTitle} />
        <meta name="og:image" content={defaultImage} />
        <meta name="twitter:image" content={defaultImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title || defaultTitle} />
        <meta name="twitter:creator" content={twitter} />
        <meta name="twitter:site" content={twitter} />
      </NextHead>
      <SchemaJSON json={JSON.stringify(schema)} />
    </>
  );
};

export default memo(Head);
