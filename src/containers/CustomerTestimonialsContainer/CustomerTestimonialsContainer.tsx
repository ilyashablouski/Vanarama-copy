import React, { FC, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLazyQuery } from '@apollo/client';
import {
  TestimonialsData,
  TestimonialsDataVariables,
} from '../../../generated/TestimonialsData';
import { GenericPageTestimonialsQuery_genericPage_sections as Section } from '../../../generated/GenericPageTestimonialsQuery';
import getTitleTag from '../../utils/getTitleTag';
import { TESTIMONIALS_DATA } from '../../gql/testimonials';
import TileLink from '../../components/TileLink/TileLink';
import { FeaturedHtml } from '../FeaturedAndTilesContainer/getFeaturedHtml';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
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
const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={3} />,
});
const TrustPilot = dynamic(() => import('core/molecules/trustpilot'), {
  ssr: false,
});

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  breadcrumbsItems: any;
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

  const [getTestimonials, { error, loading }] = useLazyQuery<
    TestimonialsData,
    TestimonialsDataVariables
  >(TESTIMONIALS_DATA, {
    variables: { size: 4, page },
    onCompleted: data => {
      setTestimonialsData([...(testimonials || []), ...data.testimonials]);
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
        <Breadcrumb items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {title}
        </Heading>
        <br />
        {testimonials?.map(item => (
          <div className="review" key={item?.name + item?.date}>
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
                  <Image
                    optimisedHost={process.env.IMG_OPTIMISATION_HOST}
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

      <div className="row:bg-lighter">
        <div className="row:features-4col">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(
                sections?.tiles1?.titleTag || 'h2',
              ) as keyof JSX.IntrinsicElements
            }
          >
            {sections?.tiles1?.name}
          </Heading>
          {sections?.tiles1?.tiles?.map(tile => {
            return (
              <div key={`Tile1_${tile.title}`}>
                <Tile className="-plain -button -align-center" plain>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                      inline
                      round
                      size="large"
                      alt={tile.image?.title || ''}
                      src={tile.image?.file?.url || ''}
                    />
                  </div>
                  <TileLink tile={tile} />
                  <Text tag="p">{tile.body}</Text>
                </Tile>
              </div>
            );
          })}
        </div>
      </div>
      <FeaturedHtml featured={sections?.featured} />
    </>
  );
};

export default CustomerTestimonialsContainer;
