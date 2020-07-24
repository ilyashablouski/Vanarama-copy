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
import { LayoutTypes } from '../../../models/enum/LayoutTypes';

const MediaFeatureSection = ({
  image,
  titleTag,
  title,
  body,
  layout,
}: IMediaFeature) => {
  const renderImage = useCallback(
    (media: ISideMediaImage | null) =>
      media?.file?.url ? (
        <Image src={media.file.url} alt={media?.title || ''} />
      ) : null,
    [],
  );

  const selectedLayout = (layout && layout[0]) || '';
  let className = '';
  switch (selectedLayout) {
    case LayoutTypes.right: {
      className = 'right';
      break;
    }
    case LayoutTypes.full: {
      className = 'full';
      break;
    }
    case LayoutTypes.featuredProduct: {
      className = 'product';
      break;
    }
    default: {
      className = 'left';
    }
  }

  return (
    <div className={`row:featured-${className}`}>
      {selectedLayout !== LayoutTypes.right && renderImage(image)}
      <div>
        <Heading size="large" color="black" tag={getTitleTag(titleTag) as any}>
          {title}
        </Heading>
        <ReactMarkdown
          source={body || ''}
          renderers={{
            heading: props => <Heading {...props} tag="h3" />,
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
      </div>
      {selectedLayout === LayoutTypes.right && renderImage(image)}
    </div>
  );
};

export default MediaFeatureSection;
