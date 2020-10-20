import * as React from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import RouterLink from '../RouterLink/RouterLink';
import { HomePageData_homePage_sections_tiles_tiles as TileData } from '../../../generated/HomePageData';

interface ITileLinkProps {
  tile: TileData;
}

const TileLink: React.FC<ITileLinkProps> = props => {
  const { tile } = props;
  if (tile.link) {
    return (
      <RouterLink
        link={{ href: tile.link.url || '#', label: '' }}
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
