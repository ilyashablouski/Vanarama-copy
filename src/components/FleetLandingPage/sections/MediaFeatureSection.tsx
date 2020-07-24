import Image from '@vanarama/uibook/lib/components/atoms/image';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import { useCallback } from 'react';
import getTitleTag from '../../../utils/getTitleTag';
import {
  GetFleetLandingPage_fleetLandingPage_sections_featured2 as IMediaFeature,
  GetFleetLandingPage_fleetLandingPage_sections_featured2_image as ISideMediaImage,
} from '../../../../generated/GetFleetLandingPage';

export enum Side {
  left = 'Media Left',
  right = 'Media Right',
  full = "Media Full",
  featuredProduct = "Featured Product"
}

const MediaFeatureSection = ({
  image,
  titleTag,
  title,
  body,
  layout
}: IMediaFeature) => {
  const renderImage = useCallback(
    (media: ISideMediaImage | null) =>
      media?.file?.url ? (
        <Image src={media.file.url} alt={media?.title || ''} />
      ) : null,
    [],
  );

  const selectedLayout = layout && layout[0] || '';
  let className = '';
  switch (selectedLayout) {
    case Side.right: {
      className = "right";
      break;
    }
    case Side.full: {
      className = "full";
      break;
    }
    case Side.featuredProduct: {
      className = "product";
      break;
    }
    default: {
      className = "left";
    }
  }

  return (
    <div className={`row:featured-${className}`}>
      {selectedLayout !== Side.right && renderImage(image)}
      <div>
        <Heading size="large" color="black" tag={getTitleTag(titleTag) as any}>
          {title}
        </Heading>
        <ReactMarkdown
          source={body || ''}
          renderers={{
            heading: (props) => <Heading {...props} tag="h3" />,
            paragraph: (props) => <Text {...props} tag="p" color="darker" />
          }} />
      </div>
      {selectedLayout === Side.right && renderImage(image)}
    </div>
  );
};

export default MediaFeatureSection;
