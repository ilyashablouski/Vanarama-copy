import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';

import getTitleTag from '../../../utils/getTitleTag';
import { GetFleetLandingPage_fleetLandingPage_sections_featured2 as IMediaFeature } from '../../../../generated/GetFleetLandingPage';
import RouterLink from '../../../components/RouterLink/RouterLink';

const MediaFeatureText = ({ title, titleTag, body }: IMediaFeature) => {
  return (
    <>
      <Heading
        size="large"
        color="black"
        tag={getTitleTag(titleTag) as keyof JSX.IntrinsicElements}
      >
        {title}
      </Heading>
      <ReactMarkdown
        source={body || ''}
        renderers={{
          heading: props => <Heading {...props} tag="h3" />,
          paragraph: props => <Text {...props} tag="p" color="darker" />,
          link: props => {
            const { href, children } = props;
            return (
              <RouterLink
                classNames={{ color: 'teal' }}
                link={{ href, label: children }}
              />
            );
          },
        }}
      />
    </>
  );
};

export default MediaFeatureText;
