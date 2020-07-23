import Image from '@vanarama/uibook/lib/components/atoms/image';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';
import { useCallback } from 'react';
import getTitleTag from '../../../utils/getTitleTag';
import {
  GetFleetLandingPage_fleetLandingPage_sections_featured2 as ISideMediaFeature,
  GetFleetLandingPage_fleetLandingPage_sections_featured2_image as ISideMediaImage,
} from '../../../../generated/GetFleetLandingPage';

export enum Side {
  left = 'left',
  right = 'right',
}

export interface ISideMediaFeatureProps extends ISideMediaFeature {
  side: Side;
}

const SideMediaFeature = ({
  image,
  side,
  titleTag,
  title,
  body,
}: ISideMediaFeatureProps) => {
  const renderImage = useCallback(
    (media: ISideMediaImage | null) =>
      media?.file?.url ? (
        <Image src={media.file.url} alt={media?.title || ''} />
      ) : null,
    [],
  );

  return (
    <div className={`row:featured-${side.toString()}`}>
      {side === Side.left && renderImage(image)}
      <div>
        <Heading size="large" color="black" tag={getTitleTag(titleTag) as any}>
          {title}
        </Heading>
        <ReactMarkdown
          source={body || ''}
          renderers={{
            heading: (props) => <Heading {...props} />,
            paragraph: (props) => <Text {...props} tag="p" color="darker" />
          }} />
      </div>
      {side === Side.right && renderImage(image)}
    </div>
  );
};

export default SideMediaFeature;
