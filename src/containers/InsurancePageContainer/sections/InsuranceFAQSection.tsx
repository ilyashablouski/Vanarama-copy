import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';

import getTitleTag from '../../../utils/getTitleTag';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_featured2 as FAQSection } from '../../../../generated/GetInsuranceLandingPage';
import RouterLink from '../../../components/RouterLink/RouterLink';

const InsuranceFAQSection = ({ title, titleTag, body }: FAQSection) => (
  <div className="row:lead-text">
    <Heading
      size="large"
      color="black"
      tag={getTitleTag(titleTag) as keyof JSX.IntrinsicElements}
    >
      {title}
    </Heading>
    <ReactMarkdown
      allowDangerousHtml
      source={body || ''}
      renderers={{
        heading: props => (
          <Text {...props} size="lead" color="darker" tag="h3" />
        ),
        paragraph: props => <Text {...props} tag="p" color="darker" />,
        link: props => {
          const { href, children } = props;
          return (
            <RouterLink
              classNames={{ size: 'lead', color: 'teal' }}
              link={{ href, label: children }}
            />
          );
        },
      }}
    />
  </div>
);

export default InsuranceFAQSection;
