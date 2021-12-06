import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_tiles as ITiles } from '../../../generated/GenericPageQuery';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={3} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const TileLink = dynamic(() => import('../../components/TileLink/TileLink'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  tiles: ITiles;
}
const TilesBlock = ({ tiles }: IProps) => {
  return (
    <div className="row:features-4col">
      {tiles?.tiles?.map((tile, index) => (
        <Tile
          plain
          className="-align-center -button"
          key={`${tile.title}_${index.toString()}`}
        >
          <span>
            <ImageV2
              width={100}
              height={100}
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              src={tile.image?.file?.url || ''}
              inline
              round
              size="large"
            />
          </span>
          <TileLink tile={tile} />
          <Text color="darker" size="regular">
            {tile.body}
          </Text>
        </Tile>
      ))}
    </div>
  );
};

export default TilesBlock;
