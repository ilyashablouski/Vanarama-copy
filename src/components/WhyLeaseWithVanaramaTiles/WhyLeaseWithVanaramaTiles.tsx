import Skeleton from 'components/Skeleton';
import TileLink from 'components/TileLink/TileLink';
import dynamic from 'next/dynamic';
import React from 'react';
import getTitleTag from 'utils/getTitleTag';

interface IWhyLeaseWithVanaramaTiles {
  title: string;
  titleTag?: string;
  tiles: {
    title: string;
    body: string;
    image: {
      file: {
        url: string;
      };
    };
  }[];
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
      {tiles?.map((tile: any, idx) => (
        <div key={tile.title || idx}>
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
