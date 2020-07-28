import ReactMarkdown from 'react-markdown';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import Text from '@vanarama/uibook/lib/components/atoms/text';

import Link from '@vanarama/uibook/lib/components/atoms/link';
import { GetFleetLandingPage_fleetLandingPage_sections_tiles as IBenefitsSection } from '../../../../generated/GetFleetLandingPage';

const BenefitsSection = ({ name, tiles }: IBenefitsSection) => (
  <div className="row:features-4col">
    <Heading size="lead" color="black">
      {name}
    </Heading>
    {tiles?.map(tile => (
      <Tile key={tile.title || undefined} className="-button" centered plain>
        <span>
          {tile.image?.file?.url && (
            <Image src={tile.image.file.url} size="large" inline round />
          )}
        </span>
        <Link className="tile--link">
          <Heading size="regular" color="black" tag={tile.titleTag || 'p'}>
            {tile.title}
          </Heading>
        </Link>
        <Text size="regular" color="darker" tag="p">
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
