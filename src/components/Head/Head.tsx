import React, { FC, memo } from 'react';
import Head from 'next/head';

import { IHeadProps } from './interface';

const HeadTag: React.FC<IHeadProps> = props => {
  let { title = 'Vanarama' } = props;
  const { metaDescription, legacyUrl, publishedOn, featuredImage } = props;

  if (process.env.ENV !== 'production')
    title = `[${process.env.ENV?.toUpperCase()}] ${title}`;

  return (
    <Head>
      {process.env.ENV !== 'production' && (
        <meta name="robots" content="noindex" />
      )}
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={title} />
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
      {legacyUrl && <meta property="og:url" content={legacyUrl} />}
      <meta property="og:site_name" content="Vanarama" />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/vanarama/"
      />
      {publishedOn && (
        <meta property="article:modified_time" content={publishedOn} />
      )}
      {featuredImage && (
        <>
          {featuredImage.url && (
            <>
              <meta property="og:image" content={featuredImage.url} />
              <meta name="twitter:image" content={featuredImage.url} />
            </>
          )}
          {featuredImage.width && (
            <meta
              property="og:image:width"
              content={featuredImage.width.toString()}
            />
          )}
          {featuredImage.height && (
            <meta
              property="og:image:height"
              content={featuredImage.height.toString()}
            />
          )}
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:creator" content="@Vanarama" />
      <meta name="twitter:site" content="@Vanarama" />
    </Head>
  );
};

export default memo(HeadTag);
