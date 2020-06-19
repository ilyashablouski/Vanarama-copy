import React, { FC, memo } from 'react';
import Head from 'next/head';

const HeadTag: FC = () => {
  return (
    <Head>
      {process.env.NODE_ENV !== 'production' && (
        <meta name="robots" content="noindex" />
      )}
    </Head>
  );
};

export default memo(HeadTag);
