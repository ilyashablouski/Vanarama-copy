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
        <Heading tag="h2" size="large" color="black">
          If you would like to place an order, find out the status of current
          order or you have an existing vehicle and need some help, please call
          01442 902324 and speak to one of our account managers.
        </Heading>
      </div>
    </>
  );
};

export default TempPage;
