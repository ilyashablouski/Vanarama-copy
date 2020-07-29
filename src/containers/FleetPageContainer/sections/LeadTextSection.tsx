import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import getTitleTag from '../../../utils/getTitleTag';
import { GetFleetLandingPage_fleetLandingPage_sections_leadText as ILeadText } from '../../../../generated/GetFleetLandingPage';

const LeadTextSection = ({ titleTag, heading, description }: ILeadText) => (
  <div className="row:lead-text">
    <Heading size="xlarge" color="black" tag={getTitleTag(titleTag) as keyof JSX.IntrinsicElements}>
      {heading}
    </Heading>
    <Text size="lead" color="darker">
      {description}
    </Text>
  </div>
);

export default LeadTextSection;
