import ReactMarkdown from "react-markdown";

import Heading from "@vanarama/uibook/lib/components/atoms/heading";
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import Text from '@vanarama/uibook/lib/components/atoms/text';

import { GetFleetLandingPage_fleetLandingPage_sections_tiles as IBenefitsSection } from "../../../../generated/GetFleetLandingPage";

const BenefitsSection = (props: IBenefitsSection) => (
    <div className="row:features-4col">
        <Heading size="lead" color="black">{props.name}</Heading>
        {props.tiles?.map(tile => (
            <Tile
                key={tile.title || undefined}
                className="-button"
                centered
                scrollable
                plain >
                <span>
                    <Image
                        src={tile.image?.file?.url || "https://source.unsplash.com/collection/2102317/500x325?sig=403450"}
                        size="large"
                        inline
                        round />
                </span>
                <a href="#" className="tile--link">
                    <Heading size="regular" color="black">{tile.title}</Heading>
                </a>
                <Text size="regular" color="darker">
                    <ReactMarkdown
                        source={tile.body || ''}
                        disallowedTypes={['paragraph']}
                        unwrapDisallowed
                    /></Text>
            </Tile>))}
    </div>
);
export default BenefitsSection;