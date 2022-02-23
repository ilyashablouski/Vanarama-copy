import React, { FC, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLazyQuery } from '@apollo/client';
import TrustPilot from 'core/molecules/trustpilot';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import {
  TestimonialsData,
  TestimonialsDataVariables,
} from '../../../generated/TestimonialsData';
import { GenericPageTestimonialsQuery_genericPage_sections as Section } from '../../../generated/GenericPageTestimonialsQuery';
import { TESTIMONIALS_DATA } from '../../gql/testimonials';
import { FeaturedHtml } from '../FeaturedAndTilesContainer/getFeaturedHtml';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import Skeleton from '../../components/Skeleton';
import { IBreadcrumbLink } from '../../types/breadcrumbs';
import { Nullish } from '../../types/common';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Initials = dynamic(() => import('core/atoms/initials'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Rating = dynamic(() => import('core/atoms/rating'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  breadcrumbsItems: Nullish<IBreadcrumbLink[]>;
  initialTestimonials: TestimonialsData['testimonials'] | undefined;
}

const CustomerTestimonialsContainer: FC<IProps> = ({
  title,
  sections,
  breadcrumbsItems,
  initialTestimonials,
}) => {
  const [page, setPage] = useState(initialTestimonials ? 2 : 1);
  const [testimonials, setTestimonialsData] = useState<
    TestimonialsData['testimonials'] | undefined
  >(initialTestimonials);
  const tiles = sections?.tiles1?.tiles;
  const tilesTitle = sections?.tiles1?.name;
  const tilesTitleTag = sections?.tiles1?.titleTag;

  const [getTestimonials, { error, loading }] = useLazyQuery<
    TestimonialsData,
    TestimonialsDataVariables
  >(TESTIMONIALS_DATA, {
    variables: { size: 4, page },
    onCompleted: data => {
      setTestimonialsData([
        ...(testimonials || []),
        ...(data.testimonials || []),
      ]);
      setPage(page + 1);
    },
  });

  const handleFetchMore = () =>
    getTestimonials({
      variables: {
        page,
        size: 4,
      },
    });

  // request testimonials in case if server not returned during first rendering
  useEffect(() => {
    if (!initialTestimonials && page === 1) {
      handleFetchMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && page === 1) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="testimonials--content">
        <Breadcrumbs items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
        <br />
        {testimonials?.map(item => (
          <div className="review" key={item?.name + (item?.date ?? '')}>
            <Initials fullName={item?.name || ''} />
            <Heading size="regular" color="black">
              {item?.whyLease}
            </Heading>
            <Rating score={item?.overallRating || 4} />
            <Text size="regular" color="darker" className="review--content">
              {item?.comments}
            </Text>
            <Text size="xsmall" color="black" className="review--meta">
              <span>{item?.name}</span>
              <span>{item?.date}</span>
            </Text>
          </div>
        ))}
        <div className="button-group">
          <Button
            color="teal"
            size="regular"
            fill="outline"
            label="View More Reviews"
            onClick={handleFetchMore}
          />
        </div>
      </div>
      <div className="testimonials--sidebar">
        <TrustPilot />
        {sections?.tiles2?.tiles?.map(tile => {
          return (
            <div
              className="testimonials--sidebar--service tilebox"
              key={tile.title || ''}
            >
              {!!tile.image?.file?.url && (
                <div>
                  <ImageV2
                    quality={60}
                    width={tile.image?.file.details.image.width}
                    height={tile.image?.file.details.image.height}
                    src={tile.image?.file?.url || ''}
                    alt={tile.image?.title || ''}
                    size="expand"
                    round
                  />
                </div>
              )}
              <div>
                <Heading size="regular" color="black">
                  {tile.title}
                </Heading>
                <Text size="small" color="darker">
                  {tile.body}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
      {tiles && (
        <div className="row:bg-lighter">
          <WhyLeaseWithVanaramaTiles
            tiles={tiles}
            title={tilesTitle || ''}
            titleTag={tilesTitleTag}
          />
        </div>
      )}
      <FeaturedHtml featured={sections?.featured} />
    </>
  );
};

export default CustomerTestimonialsContainer;
