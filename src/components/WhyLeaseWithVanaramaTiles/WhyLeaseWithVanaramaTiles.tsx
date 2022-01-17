import React from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';

import getTitleTag from '../../utils/getTitleTag';
import { Nullable } from '../../types/common';
import { Partner_partner_tiles as IPartnerTiles } from '../../../generated/Partner';

import Skeleton from '../Skeleton';
import TileLink from '../TileLink';
import RouterLink from '../RouterLink';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IWhyLeaseWithVanaramaTiles {
  title: Nullable<string>;
  titleTag?: Nullable<string>;
  tiles: IPartnerTiles[];
}

const WhyLeaseWithVanaramaTiles = ({
  title,
  titleTag,
  tiles,
}: IWhyLeaseWithVanaramaTiles) => (
  <section className="row:features-4col">
    {title && (
      <Heading
        size="large"
        color="black"
        tag={getTitleTag(titleTag || 'p') as keyof JSX.IntrinsicElements}
      >
        {title}
      </Heading>
    )}
    {tiles.map((tile: IPartnerTiles, index) => (
      <div key={tile.title || index}>
        <Tile className="-plain -button -align-center" plain>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImageV2
              inline
              round
              quality={70}
              sizes="50vw"
              width="100"
              height="100"
              size="large"
              src={
                tile.image?.file?.url ||
                'https://source.unsplash.com/collection/2102317/1000x650?sig=403411'
              }
            />
          </div>
          <TileLink tile={tile} />
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
      </div>
    ))}
  </section>
);

export default WhyLeaseWithVanaramaTiles;
