import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Media = dynamic(() => import('core/atoms/media'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const EligibilityCheckerButton = dynamic(
  () => import('./EligibilityCheckerButton'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface ILease {
  body: string | null;
  title: string | null;
  video: string | null;
}

const Lease: FC<ILease> = ({ body, title, video }) => (
  <div className="row:featured-right">
    <div>
      <Heading size="large" color="black">
        {title}
      </Heading>
      <Text tag="p" size="regular" color="darker">
        {body}
      </Text>
      <EligibilityCheckerButton />
    </div>
    {video && (
      <div className="media">
        <Media
          responsive
          src={video || ''}
          vimeoConfig={{ color: 'EC6408', portrait: false }}
          className="media-player"
          controls
          width="100%"
          height="100%"
        />
      </div>
    )}
  </div>
);

export default Lease;
