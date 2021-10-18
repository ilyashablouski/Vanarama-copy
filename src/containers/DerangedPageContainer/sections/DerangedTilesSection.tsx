import React from 'react';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Skeleton from '../../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_tiles as ITilesSection } from '../../../../generated/GenericPageQuery';
import { isServerRenderOrAppleDevice } from '../../../utils/deviceType';
import getTitleTag from '../../../utils/getTitleTag';
import { getSectionsData } from '../../../utils/getSectionsData';
import { HomePageData_homePage_sections_tiles_tiles as TileData } from '../../../../generated/HomePageData';
import TileLink from '../../../components/TileLink/TileLink';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={2} />,
});

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={4} />,
});

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const DerangedTilesSection = ({ tiles, tilesTitle }: ITilesSection) => {
  return (
    <section className="row:features-4col">
      <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
        <Heading
          size="large"
          color="black"
          tag={
            getTitleTag(
              getSectionsData(['titleTag'], tiles) || 'p',
            ) as keyof JSX.IntrinsicElements
          }
        >
          {tilesTitle || ''}
        </Heading>
        {tiles &&
          tiles.map((tile: TileData, index) => (
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
                      ' https://source.unsplash.com/collection/2102317/1000x650?sig=403411'
                    }
                  />
                </div>
                <TileLink tile={tile} />
                <Text tag="p">{tile.body || ''}</Text>
              </Tile>
            </div>
          ))}
      </LazyLoadComponent>
    </section>
  );
};

export default React.memo(DerangedTilesSection);
