import React, { FC, memo } from 'react';
import Head from 'next/head';

import { IHeadProps } from './interface';

const defaultTitle = 'Vanarama';
const twitter = '@Vanarama';

const HeadTag: React.FC<IHeadProps> = props => {
  let { title = defaultTitle, metaRobots } = props;
  const { metaDescription, legacyUrl, publishedOn, featuredImage } = props;

  // Dev override.
  if (process.env.ENV !== 'production') {
    title = `[${process.env.ENV?.toUpperCase()}] ${title}`;
    metaRobots = 'noindex';
  }

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={title} />
      {metaRobots && <meta name="robots" content={metaRobots} />}
      {metaDescription && (
        <meta property="og:description" content={metaDescription} />
      )}
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
      <meta name="twitter:title" content={title} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:site" content={twitter} />
    </Head>
  );
};

export default memo(HeadTag);
