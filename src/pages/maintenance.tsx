import React from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';

const Heading = dynamic(() => import('core/atoms/heading'));

export const TempPage: NextPage = () => {
  return (
    <>
      <div className="row:title">
        <Heading tag="h2" size="xlarge" color="black">
          Section currently under maintenance.
        </Heading>
      </div>
    </>
  );
};

export default TempPage;
