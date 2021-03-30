import React, { FC } from 'react';
import dynamic from 'next/dynamic';

const Text = dynamic(() => import('core/atoms/text'));

interface IVersion {
  buildVersion?: string;
}

const Version: FC<IVersion> = ({ buildVersion }) => {
  return (
    <Text size="regular" color="darker" className="-mt-600">
      {buildVersion}
    </Text>
  );
};

export default React.memo(Version);
