import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';

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
    {(description || body) && (
      <Text size="lead" color="darker" tag="p">
        {description || body || ''}
      </Text>
    )}
  </div>
);

export default InsuranceTypeSection;
