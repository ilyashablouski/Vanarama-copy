import * as React from 'react';
import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import { HomePageData_homePage_sections_tiles_tiles_link } from '../../../generated/HomePageData';
import Skeleton from '../Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface ITileLinkProps {
  tile: {
    link?: HomePageData_homePage_sections_tiles_tiles_link | null;
    title: string | null;
  };
  dataUiTestId?: string;
}

const TileLink: React.FC<ITileLinkProps> = props => {
  const { tile, dataUiTestId } = props;
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
      <Heading
        tag="span"
        size="regular"
        color="black"
        dataUiTestId={dataUiTestId}
      >
        {tile.title}
      </Heading>
    </span>
  );
};

export default TileLink;
