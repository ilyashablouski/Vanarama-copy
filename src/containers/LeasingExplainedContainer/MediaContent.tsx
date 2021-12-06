import React from 'react';
import dynamic from 'next/dynamic';

import { Nullish } from '../../types/common';
import { GenericPageQuery_genericPage_sections_featured_image_file as IFile } from '../../../generated/GenericPageQuery';

import Skeleton from '../../components/Skeleton';

const Media = dynamic(() => import('core/atoms/media'), {
  loading: () => <Skeleton count={4} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});

interface IProps {
  featuredVideoUrl: Nullish<string>;
  featuredImage: Nullish<IFile>;
}

function FeaturedMedia({ featuredImage, featuredVideoUrl }: IProps) {
  if (featuredVideoUrl) {
    return <Media noLazy src={featuredVideoUrl} width="100%" height="324px" />;
  }

  if (featuredImage?.url) {
    return (
      <ImageV2
        lazyLoad={false}
        objectFit="cover"
        width={featuredImage.details.image.width}
        height={450}
        optimisationOptions={{ fit: 'cover', height: 450 }}
        optimisedHost={process.env.IMG_OPTIMISATION_HOST}
        src={featuredImage.url}
      />
    );
  }

  return null;
}

export default FeaturedMedia;
