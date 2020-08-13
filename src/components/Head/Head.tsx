import React, { FC, memo } from 'react';
import NextHead from 'next/head';

import { IHeadProps } from './interface';

import { defaultTitle, twitter, defaultImage } from './defaults';

const Head: FC<IHeadProps> = props => {
  let { title = defaultTitle, metaRobots } = props;
  const { metaDescription, legacyUrl, publishedOn } = props;

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
      <meta property="og:title" content={title} />
      <meta property="fb:app_id" content="243697725689492" />
      <meta property="fb:admins" content="1153795855" />
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
      <meta name="twitter:image" content={defaultImage} />
      <meta name="og:image" content={defaultImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:site" content={twitter} />
    </NextHead>
  );
};

export default memo(Head);
