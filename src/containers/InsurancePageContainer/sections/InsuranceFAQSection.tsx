import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';

import getTitleTag from '../../../utils/getTitleTag';
import { GetInsuranceLandingPage_insuranceLandingPage_sections_featured2 as FAQSection } from '../../../../generated/GetInsuranceLandingPage';
import { ParsedLink } from '../renderers';

const InsuranceFAQSection = ({ title, titleTag, body }: FAQSection) => (
  <div className="row:lead-text">
    <Heading size="large" color="black" tag={getTitleTag(titleTag) as any}>
      {title}
    </Heading>
    <ReactMarkdown
      source={body || ''}
      renderers={{
        heading: props => (
          <Text {...props} size="lead" color="darker" className="-mt-100" />
        ),
        paragraph: props => <Text {...props} tag="p" color="darker" />,
        link: props => <ParsedLink {...props} size="lead" color="teal" />,
      }}
    />
  </div>
);

export default InsuranceFAQSection;
