import React from 'react';
import dynamic from 'next/dynamic';

import { Nullish } from '../../types/common';

import Skeleton from '../../components/Skeleton';

const Media = dynamic(() => import('core/atoms/media'), {
  loading: () => <Skeleton count={4} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});

interface IProps {
  featuredVideoUrl: Nullish<string>;
  featuredImageUrl: Nullish<string>;
}

function FeaturedMedia({ featuredImageUrl, featuredVideoUrl }: IProps) {
  if (featuredVideoUrl) {
    return <Media noLazy src={featuredVideoUrl} width="100%" height="324px" />;
  }
  if (featuredImageUrl) {
    return (
      <Image
        src={featuredImageUrl}
        optimisationOptions={{ fit: 'cover', height: 450 }}
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
      />
    );
  }

  return null;
}

export default FeaturedMedia;
