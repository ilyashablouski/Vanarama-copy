import React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import NextHead from 'next/head';

const Heading = dynamic(() => import('core/atoms/heading'));

export const TempPage: NextPage = () => {
  return (
    <>
      <NextHead>
        <meta name="robots" content="noindex, nofollow" />
      </NextHead>

      <div className="row:title">
        <Heading tag="h2" size="xlarge" color="black">
          Section currently under maintenance.
        </Heading>
      </div>
    </>
  );
};

export default TempPage;
