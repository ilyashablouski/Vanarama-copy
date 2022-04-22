import React, { useMemo } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import dynamic from 'next/dynamic';
import {
  isServerRenderOrAppleDevice,
  VIEWPORTS,
} from '../../../utils/deviceType';

import SearchPageMarkdown from '../components/SearchPageMarkdown';
import FeaturedSection from '../../../components/FeaturedSection';
import RelatedCarousel from '../../../components/RelatedCarousel';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_tiles as Tiles,
  GenericPageQuery_genericPage_sections_carousel as CarouselData,
} from '../../../../generated/GenericPageQuery';
import { getSectionsData } from '../../../utils/getSectionsData';
import Skeleton from '../../../components/Skeleton';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';
import { sortGlossaryByAlphabetic } from '../helpers';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

const RESPONSIVE_MASONRY_BREAKPOINTS = {
  [VIEWPORTS.xsSmall]: 1,
  [VIEWPORTS.small]: 2,
  [VIEWPORTS.medium]: 3,
};

interface IProps {
  pageData: GenericPageQuery;
  tiles: Tiles;
  dataUiTestId?: string;
  isFuelPage: boolean;
  isDynamicFilterPage: boolean;
  isManufacturerFeatureFlagEnabled?: boolean;
}

const DynamicParamBottomBlock = ({
  pageData,
  tiles,
  dataUiTestId,
  isFuelPage,
  isDynamicFilterPage,
  isManufacturerFeatureFlagEnabled,
}: IProps) => {
  const sectionsAsArray = pageData?.genericPage.sectionsAsArray;
  const features = sectionsAsArray?.featured?.slice(1);
  const titleFeaturedIndexes = useMemo(() => {
    return features?.reduce((acc, item, index) => {
      const isNotMediaSideItem =
        !item?.layout?.includes('Media Right') &&
        !item?.layout?.includes('Media Left');
      const isMediaSideNextItem =
        features[index + 1]?.layout?.includes('Media Right') ||
        features[index + 1]?.layout?.includes('Media Left');
      const isLastItem = item === features[features.length - 1];
      if (isNotMediaSideItem && (isMediaSideNextItem || isLastItem)) {
        return [...acc, index];
      }
      return acc;
    }, [] as number[] | []);
  }, [features]);
  const separatedFeatures = useMemo(() => {
    return titleFeaturedIndexes?.map(
      (featuredIndex: number | undefined, index: number) => {
        if (index === titleFeaturedIndexes.length - 1) {
          return features?.slice(featuredIndex);
        }
        return features?.slice(featuredIndex, titleFeaturedIndexes[index + 1]);
      },
    );
  }, [titleFeaturedIndexes]);
  const carousel: CarouselData = useMemo(
    () =>
      getSectionsData(['sections', 'carousel'], pageData?.genericPage) ||
      sectionsAsArray?.carousel?.[0],
    [pageData],
  );
  const isCarousel = useMemo(() => !!carousel?.cards?.length, [
    carousel?.cards?.length,
  ]);

  const applyColumns = !isFuelPage ? '-columns' : '';
  const glossaryGrid = sectionsAsArray?.glossaryGrid?.[0];
  const glossaryEntries = useMemo(
    () => sortGlossaryByAlphabetic(glossaryGrid?.glossaryEntries || null),
    [glossaryGrid],
  );

  return (
    <>
      {isDynamicFilterPage && (
        <LazyLoadComponent visibleByDefault={isServerRenderOrAppleDevice}>
          <div className={`row:text ${applyColumns}`}>
            <SearchPageMarkdown
              markdown={pageData?.genericPage.body}
              withoutImage
            />
          </div>
        </LazyLoadComponent>
      )}

      {separatedFeatures &&
        isManufacturerFeatureFlagEnabled &&
        separatedFeatures.map((featuresSection, index) => (
          <div
            key={`${featuresSection?.[0]?.title}_${featuresSection?.length}`}
            className={index % 2 ? 'row:full-gray -pb-600 -pt-600' : '-mb-600'}
          >
            {featuresSection?.map(featuredItem => {
              return (
                <FeaturedSection
                  key={featuredItem?.title}
                  featured={featuredItem}
                />
              );
            })}
          </div>
        ))}

      {glossaryEntries && glossaryEntries.length && (
        <div className="row:bg-lighter">
          <Heading
            size="large"
            color="black"
            position="center"
            className="-pb-500"
          >
            {glossaryGrid?.title}
          </Heading>
          {glossaryEntries?.length >= 4 && (
            <ResponsiveMasonry
              columnsCountBreakPoints={RESPONSIVE_MASONRY_BREAKPOINTS}
            >
              <Masonry columnsCount={3} gutter="10px">
                {glossaryEntries?.map(item => (
                  <div className="-bg-white -p-300" key={item?.title}>
                    <Heading size="regular" color="black">
                      {item?.title}
                    </Heading>
                    <Text color="darker">{item.body}</Text>
                  </div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {glossaryEntries?.length < 4 && (
            <div className="-flex-row-stretch -gap-300">
              {glossaryEntries?.map(item => (
                <div className="-bg-white -p-300" key={item?.title}>
                  <Heading size="regular" color="black">
                    {item?.title}
                  </Heading>
                  <Text color="darker">{item.body}</Text>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!isDynamicFilterPage && tiles?.tiles?.length && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles.tiles}
          title={tiles.tilesTitle || ''}
          titleTag={tiles.titleTag}
        />
      )}

      {isCarousel && (
        <RelatedCarousel
          cards={carousel.cards}
          title={carousel.title}
          dataUiTestId={`${dataUiTestId}_related`}
        />
      )}
    </>
  );
};

export default DynamicParamBottomBlock;
