import Image from '@vanarama/uibook/lib/components/atoms/image';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import getTitleTag from '../../../utils/getTitleTag';
import { GetFleetLandingPage_fleetLandingPage_sections_featured2 as IMediaFeature } from '../../../../generated/GetFleetLandingPage';
import LayoutTypes from '../../../models/enum/LayoutTypes';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { useState } from 'react';

export interface IMediaFeatureProps extends IMediaFeature {
  imageOnly?: boolean;
}

const MediaFeatureSection: React.FC<IMediaFeatureProps> = ({
  image,
  titleTag,
  title,
  body,
  layout,
  children,
  imageOnly
}) => {
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
      {selectedLayout !== LayoutTypes.right && image?.file?.url ? (
        <Image src={image.file.url} alt={image?.title || ''} />
      ) : null}
      <div>
        {imageOnly ? children : <>
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
        </>}
      </div>
      {selectedLayout === LayoutTypes.right && image?.file?.url ? (
        <Image src={image.file.url} alt={image?.title || ''} />
      ) : null}
    </div>
  );
};

export default MediaFeatureSection;
