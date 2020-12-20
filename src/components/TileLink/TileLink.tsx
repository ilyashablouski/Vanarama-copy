import * as React from 'react';
import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import { HomePageData_homePage_sections_tiles_tiles as TileData } from '../../../generated/HomePageData';
import Skeleton from '../Skeleton';

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface ITileLinkProps {
  tile: TileData;
}

const TileLink: React.FC<ITileLinkProps> = props => {
  const { tile } = props;
  if (tile.link) {
    return (
      <RouterLink
        link={{ href: tile.link.legacyUrl || tile.link.url || '#', label: '' }}
        className="tile--link"
      >
        <Heading tag="span" size="regular" color="black">
          {tile.title}
        </Heading>
      </RouterLink>
    );
  }
  return (
    <span className="tile--link">
      <Heading tag="span" size="regular" color="black">
        {tile.title}
      </Heading>
    </span>
  );
};

export default TileLink;
