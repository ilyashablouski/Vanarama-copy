import React, { FC, memo } from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import { IHeadProps } from './interface';

import { defaultTitle, twitter, fb } from './defaults';
import { FONT_LIST, FONT_PATH } from './fonts';

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
  if (process.env.ENV && process.env.ENV !== 'production') {
    title = `[${process.env.ENV?.toUpperCase()}] ${title}`;
    metaRobots = 'noindex';
  }

  return (
    <>
      <NextHead>
        <title>{title}</title>
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="fb:app_id" content={String(fb.appId)} />
        <meta property="fb:admins" content={String(fb.admins)} />
        {metaRobots && <meta name="robots" content={metaRobots} />}
        {metaDescription && (
          <meta property="og:description" content={metaDescription} />
        )}
        <link
          rel="canonical"
          href={canonicalUrl ?? legacyUrl ?? router.asPath}
        />
        {legacyUrl && <meta property="og:url" content={legacyUrl} />}
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
        {FONT_LIST.map(font => {
          return (
            <link
              key={font}
              rel="preload"
              href={`${FONT_PATH}${font}`}
              as="font"
              type="font/woff2"
              crossOrigin=""
            />
          );
        })}
      </NextHead>
      <SchemaJSON json={JSON.stringify(schema)} />
    </>
  );
};

ArticleHead.displayName = 'Head';

export default memo(ArticleHead);
