import React, { FC, useState, useEffect } from 'react';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useQuery } from '@apollo/client';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import {
  TestimonialsData,
  TestimonialsData_testimonials as TestimonialData,
} from '../../../generated/TestimonialsData';
import { GenericPageTestimonialsQuery_genericPage_sections as Section } from '../../../generated/GenericPageTestimonialsQuery';
import getTitleTag from '../../utils/getTitleTag';
import { TESTIMONIALS_DATA } from '../../gql/testimonials';
import TileLink from '../../components/TileLink/TileLink';
import { FeaturedHtml } from '../FeaturedAndTilesContainer/getFeaturedHtml';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';

interface IProps {
  sections: Section | null;
  title: string | null;
  body: string | null;
  breadcrumbsItems: any;
}

const CustomerTestimonialsContainer: FC<IProps> = ({
  title,
  sections,
  breadcrumbsItems,
}) => {
  const [page, setPage] = useState(1);
  const [data, setTestimonialsData] = useState<TestimonialsData>();

  const { loading, error, fetchMore } = useQuery<TestimonialsData>(
    TESTIMONIALS_DATA,
    {
      variables: { size: 4, page },
      notifyOnNetworkStatusChange: true,
      onCompleted: d => {
        const prev = data?.testimonials || [];
        setTestimonialsData({
          ...d,
          testimonials: [...d.testimonials, ...prev],
        });
      },
    },
  );

  useEffect(() => {
    if (fetchMore) {
      fetchMore({
        variables: {
          page,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...fetchMoreResult,
            testimonials: [
              ...prev.testimonials,
              ...fetchMoreResult.testimonials?.filter(
                n => !prev.testimonials?.some(p => p?.name === n?.name),
              ),
            ],
          };
        },
      });
    }
  }, [page, fetchMore]);

  const onFetchMore = () => {
    setPage(page + 1);
  };

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
        {data?.testimonials
          ?.sort((a, b) => Date.parse(b?.date) - Date.parse(a?.date))
          .map((item: TestimonialData | null, idx) => (
            <div className="review" key={idx}>
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                size="expand"
                round
                src={`https://eu.ui-avatars.com/api/?name=name=${item?.name}&color=ffffff&background=0A0D10&format=svg&rounded=true`}
              />
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
            onClick={() => onFetchMore()}
          />
        </div>
      </div>
      <div className="testimonials--sidebar">
        <TrustPilot
          templateId="5613c9cde69ddc09340c6beb"
          height="100%"
          dataStyleHeight="100%"
        />
        {sections?.tiles2?.tiles?.map(tile => {
          return (
            <div
              className="testimonials--sidebar--service tilebox"
              key={tile.title || ''}
            >
              <Image
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                src={tile.image?.file?.url || ''}
                alt={tile.image?.title || ''}
                size="expand"
                round
              />
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
          {sections?.tiles1?.tiles?.map((tile, key) => {
            return (
              <div key={`Tile1_${key}`}>
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
