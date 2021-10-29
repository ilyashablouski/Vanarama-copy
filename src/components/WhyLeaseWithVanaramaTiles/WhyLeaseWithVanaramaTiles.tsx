import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../Skeleton';
import TileLink from '../TileLink/TileLink';
import getTitleTag from '../../utils/getTitleTag';
import { Partner_partner_tiles as IPartnerTiles } from '../../../generated/Partner';

interface IWhyLeaseWithVanaramaTiles {
  title: string;
  titleTag?: string | null;
  tiles: IPartnerTiles[];
}

const WhyLeaseWithVanaramaTiles = ({
  title,
  titleTag,
  tiles,
}: IWhyLeaseWithVanaramaTiles) => {
  const Heading = dynamic(() => import('core/atoms/heading'), {
    loading: () => <Skeleton count={1} />,
  });
  const Tile = dynamic(() => import('core/molecules/tile'), {
    loading: () => <Skeleton count={3} />,
  });
  const Image = dynamic(() => import('core/atoms/image'), {
    loading: () => <Skeleton count={4} />,
  });
  const Text = dynamic(() => import('core/atoms/text'), {
    loading: () => <Skeleton count={1} />,
  });
  return (
    <section className="row:features-4col">
      <Heading
        size="large"
        color="black"
        tag={getTitleTag(titleTag || 'p') as keyof JSX.IntrinsicElements}
      >
        {title}
      </Heading>
      {tiles?.map((tile: IPartnerTiles, index) => (
        <div key={tile.title || index}>
          <Tile className="-plain -button -align-center" plain>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                inline
                round
                size="large"
                src={
                  tile.image?.file?.url ||
                  'https://source.unsplash.com/collection/2102317/1000x650?sig=403411'
                }
              />
            </div>
            <TileLink tile={tile} />
            <Text tag="p">{tile.body}</Text>
          </Tile>
        </div>
      ))}
    </section>
  );
};

export default WhyLeaseWithVanaramaTiles;
