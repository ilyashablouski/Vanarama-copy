import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { GetFleetLandingPage_fleetLandingPage_sections_tiles as IBenefitsSection } from '../../../../generated/GetFleetLandingPage';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
    ssr: false,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Tile = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tile'),
  {
    loading: () => <Skeleton count={5} />,
  },
);

const BenefitsSection = ({ name, tiles }: IBenefitsSection) => (
  <div className="row:features-4col">
    <Heading size="lead" color="black">
      {name}
    </Heading>
    {tiles?.map(tile => (
      <Tile key={tile.title || undefined} className="-button" centered plain>
        <span>
          {tile.image?.file?.url && (
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={tile.image.file.url}
              size="large"
              inline
              round
            />
          )}
        </span>
        <span className="tile--link">
          <Heading size="regular" color="black">
            {tile.title}
          </Heading>
        </span>
        <ReactMarkdown
          allowDangerousHtml
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
              <Text {...props} size="lead" color="darker" tag="h3" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
          }}
        />
      </Tile>
    ))}
  </div>
);

export default BenefitsSection;
