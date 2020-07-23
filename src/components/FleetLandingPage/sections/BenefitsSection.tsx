import ReactMarkdown from 'react-markdown';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import Text from '@vanarama/uibook/lib/components/atoms/text';

import { GetFleetLandingPage_fleetLandingPage_sections_tiles as IBenefitsSection } from '../../../../generated/GetFleetLandingPage';
import Link from '@vanarama/uibook/lib/components/atoms/link';

const BenefitsSection = ({ name, tiles }: IBenefitsSection) => (
    <div className="row:features-4col">
        <Heading size="lead" color="black">
            {name}
        </Heading>
        {tiles?.map(tile => (
            <Tile
                key={tile.title || undefined}
                className="-button"
                centered
                scrollable
                plain
            >
                <span>
                    {tile.image?.file?.url && (
                        <Image src={tile.image.file.url} size="large" inline round />
                    )}
                </span>
                <Link className="tile--link">
                    <Heading size="regular" color="black">
                        {tile.title}
                    </Heading>
                </Link>
                <Text size="regular" color="darker">
                    <ReactMarkdown
                        source={tile.body || ''}
                        disallowedTypes={['paragraph']}
                        unwrapDisallowed
                    />
                </Text>
            </Tile>
        ))}
    </div>
);

export default BenefitsSection;
