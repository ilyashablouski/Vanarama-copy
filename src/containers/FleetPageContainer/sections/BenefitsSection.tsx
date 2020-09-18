import ReactMarkdown from 'react-markdown';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import Text from '@vanarama/uibook/lib/components/atoms/text';

import Link from '@vanarama/uibook/lib/components/atoms/link';
import { GetFleetLandingPage_fleetLandingPage_sections_tiles as IBenefitsSection } from '../../../../generated/GetFleetLandingPage';
import RouterLink from '../../../components/RouterLink/RouterLink';

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
        <span className="tile--link">
          <Heading size="regular" color="black">
            {tile.title}
          </Heading>
        </span>
        <ReactMarkdown
          escapeHtml={false}
          source={tile.body || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return (
                <RouterLink
                  link={{ href, label: children }}
                  classNames={{ color: 'teal' }}
                />
              );
            },
            heading: props => (
              <Text {...props} size="lead" color="darker" className="-mt-100" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
      </Tile>
    ))}
  </div>
);

export default BenefitsSection;
