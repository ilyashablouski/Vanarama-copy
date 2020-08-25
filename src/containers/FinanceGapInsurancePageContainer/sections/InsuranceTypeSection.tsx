import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import ReactMarkdown from 'react-markdown';

interface IProps {
  heading: string | null;
  description?: string | null;
  body?: string | null;
}

const InsuranceTypeSection = ({ heading, description, body }: IProps) => (
  <div className="row:lead-text">
    <Heading size="xlarge" color="black">
      {heading}
    </Heading>
    {description && (
      <Text size="lead" color="darker" tag="p">
        {description || ''}
      </Text>
    )}
    {body && <ReactMarkdown source={body || ''} />}
  </div>
);

export default InsuranceTypeSection;
