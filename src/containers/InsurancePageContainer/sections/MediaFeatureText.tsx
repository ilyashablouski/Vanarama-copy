import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';

import getTitleTag from '../../../utils/getTitleTag';
import { GetFleetLandingPage_fleetLandingPage_sections_featured2 as IMediaFeature } from '../../../../generated/GetFleetLandingPage';
import { ParsedLink } from '../renderers';

const MediaFeatureText = ({ title, titleTag, body }: IMediaFeature) => {
  let buttonFill: 'solid' | 'outline' = 'outline';
  return (
    <>
      <Heading size="large" color="black" tag={getTitleTag(titleTag) as any}>
        {title}
      </Heading>
      <ReactMarkdown
        source={body || ''}
        renderers={{
          heading: props => <Heading {...props} tag="h3" />,
          paragraph: props => <Text {...props} tag="p" color="darker" />,
          link: props => {
            buttonFill = buttonFill === 'solid' ? 'outline' : 'solid';
            return <ParsedLink {...props} fill={buttonFill} color="teal" />;
          },
        }}
      />
    </>
  );
};

export default MediaFeatureText;
