import React from 'react';
import { GetStaticPropsResult, NextPage } from 'next';
import NextHead from 'next/head';

import Version from '../../components/Version';

interface IProps {
  buildVersion?: string;
}

const VersionPage: NextPage<IProps> = ({ buildVersion }) => {
  return (
    <>
      <NextHead key="buildVersion">
        <meta name="robots" content="noindex, nofollow" />
      </NextHead>

      <Version buildVersion={buildVersion} />
    </>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<IProps>> {
  const buildVersion = process.env.NSF_BUILD_VERSION || 'No build version';

  return {
    props: { buildVersion },
  };
}

export default VersionPage;
