import React from 'react';
import { NextPage } from 'next';
import NextHead from 'next/head';
import Version from '../../components/Version';

interface IVersionPageProps {
  buildVersion?: string;
}

const VersionPage: NextPage<IVersionPageProps> = ({ buildVersion }) => {
  return (
    <>
      <NextHead key="buildVersion">
        <meta name="robots" content="noindex, nofollow" />
      </NextHead>

      <Version buildVersion={buildVersion} />
    </>
  );
};

export async function getStaticProps() {
  const buildVersion = process.env.BUILD_VERSION || 'No build version';

  return {
    props: { buildVersion },
  };
}

export default VersionPage;
