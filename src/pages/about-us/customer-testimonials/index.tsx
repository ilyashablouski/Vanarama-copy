import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery, useLazyQuery } from '@apollo/client';
import Rating from '@vanarama/uibook/lib/components/atoms/rating';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Tile from '@vanarama/uibook/lib/components/molecules/tile';
import TrustPilot from '@vanarama/uibook/lib/components/molecules/trustpilot';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import withApollo from '../../../hocs/withApollo';
import { TESTIMONIALS_DATA } from '../../../gql/testimonials';
import {
  TestimonialsData,
  TestimonialsData_testimonials as TestimonialData,
} from '../../../../generated/TestimonialsData';
import BreadCrumbs from '../../../containers/BreadCrumbContainer';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import { GENERIC_PAGE } from 'gql/genericPage';
import Head from '../../../components/Head/Head';

export const CustomerTestimonialPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const [data, setTestimonialsData] = useState<TestimonialsData>();

  const [pageData, setPageData] = useState<GenericPageQuery>();

  const [getGenericPage] = useLazyQuery<
    GenericPageQuery,
    GenericPageQueryVariables
  >(GENERIC_PAGE, {
    onCompleted: result => {
      setPageData(result);
      // setMetaData(result.genericPage.metaData);
      //setFeaturedImage(result.genericPage.featuredImage);
    },
  });

  useEffect(() => {
    getGenericPage({
      variables: {
        slug: `/about-us/customer-testimonials`,
      },
    });
  }, [getGenericPage]);

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
      <Head
        title={pageData?.genericPage.metaData.title || ''}
        metaDescription={pageData?.genericPage.metaData.metaDescription}
        metaRobots={pageData?.genericPage.metaData.metaRobots}
        legacyUrl={pageData?.genericPage.metaData.legacyUrl}
        publishedOn={pageData?.genericPage.metaData.publishedOn}
        featuredImage={pageData?.genericPage.featuredImage}
      />
      <div className="testimonials--content">
        <BreadCrumbs />
        <Heading tag="h1" size="xlarge" color="black">
          Testimonials Hub
        </Heading>
        <br />
        {data?.testimonials
          ?.sort((a, b) => Date.parse(b?.date) - Date.parse(a?.date))
          .map((item: TestimonialData | null, idx) => (
            <div className="review" key={idx}>
              <Image
                size="expand"
                round
                src="https://eu.ui-avatars.com/api/?name=name=John+Doe&color=ffffff&background=0A0D10&format=svg&rounded=true"
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
        <div className="testimonials--sidebar--service tilebox">
          <Image
            src="https://source.unsplash.com/collection/2102317/400x400?sig=403432"
            size="expand"
            round
          />
          <div>
            <Heading size="regular" color="black">
              Our Price Promise
            </Heading>
            <Text size="small" color="darker">
              Lorem ullamco laborum enim id aliqua ipsum sunt reprehenderit
              consectetur et ipsum incidid...
            </Text>
          </div>
        </div>
        <div className="testimonials--sidebar--service tilebox">
          <Image
            src="https://source.unsplash.com/collection/2102317/400x400?sig=403432"
            size="expand"
            round
          />
          <div>
            <Heading size="regular" color="black">
              Fixed Monthly Costs
            </Heading>
            <Text size="small" color="darker">
              Lorem ullamco laborum enim id aliqua ipsum sunt reprehenderit
              consectetur et ipsum incidid...
            </Text>
          </div>
        </div>
        <div className="testimonials--sidebar--service tilebox">
          <Image
            src="https://source.unsplash.com/collection/2102317/400x400?sig=403432"
            size="expand"
            round
          />
          <div>
            <Heading size="regular" color="black">
              5 Star Customer Service
            </Heading>
            <Text size="small" color="darker">
              Lorem ullamco laborum enim id aliqua ipsum sunt reprehenderit
              consectetur et ipsum incidid...
            </Text>
          </div>
        </div>
      </div>
      <div className="row:bg-lighter">
        <div className="row:features-4col">
          <Heading size="large" color="black" tag="h2">
            Why Choose Vanarama?
          </Heading>
          {[1, 2, 3, 4].map(t => (
            <div key={t}>
              <Tile className="-plain -button -align-center" plain>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    inline
                    round
                    size="large"
                    src=" https://source.unsplash.com/collection/2102317/1000x650?sig=403411"
                  />
                </div>
                <a className="tile--link" href="##">
                  <Heading tag="span" size="regular" color="black">
                    Lorem Ipsum Dolor
                  </Heading>
                </a>
                <Text tag="p">
                  Pretium facilisi etiam pretium, cras interdum enim, nullam.
                </Text>
              </Tile>
            </div>
          ))}
        </div>
      </div>
      <div className="row:text">
        <Heading color="black" size="large">
          Company History
        </Heading>
        <div>
          <Text size="regular" color="darker">
            At Vanarama, we have a range of funders offering new van finance
            including contract hire with various options to suit you and your
            business needs, including Contract Hire, Finance Lease and Contract
            Purchase. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Hic nisi ab odio perspiciatis, veritatis nulla eaque tempore.
          </Text>

          <Text size="regular" color="darker">
            Repellendus, rem! Minima voluptatibus obcaecati incidunt expedita
            dignissimos? Vanarama can also arrange personal van finance if
            that&apos;s what you require. We understand the importance of your
            new van purchase and we want to make sure the process of arranging
            finance for your new vehicle is as simple and seamless as possible
            for you.
          </Text>
        </div>
      </div>
    </>
  );
};

export default withApollo(CustomerTestimonialPage, { getDataFromTree });
