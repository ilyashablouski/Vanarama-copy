import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Text from "@vanarama/uibook/lib/components/atoms/text";
import { GetFleetLandingPage_fleetLandingPage_sections_leadText as ILeadText } from "../../../../generated/GetFleetLandingPage";
import { getTitleTag } from "utils/getTitleTag";

const LeadTextSection = (props: ILeadText) => (
    <div className="row:lead-text">
        <Heading size="xlarge" color="black" tag={getTitleTag(props.titleTag) as any}>
            {props.heading}
        </Heading>
        <Text size="lead" color="darker">
            {props.description}
        </Text>
    </div>
);

export default LeadTextSection;
