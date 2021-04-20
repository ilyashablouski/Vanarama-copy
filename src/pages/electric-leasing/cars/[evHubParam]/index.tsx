import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
// import { LazyLoadComponent } from 'react-lazy-load-image-component';
import SchemaJSON from 'core/atoms/schema-json';
import Image from 'core/atoms/image';
import Carousel from 'core/organisms/carousel';
import createApolloClient from '../../../../apolloClient';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';
import { GENERIC_PAGE } from '../../../../gql/genericPage';
import { HeroEv as Hero, HeroHeading } from '../../../../components/Hero';
import FeaturedSection from '../../../../components/FeaturedSection';
import Head from '../../../../components/Head/Head';
import Skeleton from '../../../../components/Skeleton';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  data: GenericPageQuery;
}

export const EVHubPage: NextPage<IProps> = ({ data }) => {
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const sections = data?.genericPage.sectionsAsArray;

  return (
    <>
      <Hero>
        <div className="hero--left">
          <Image
            loadImage
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            optimisationOptions={optimisationOptions}
            className="hero--image"
            plain
            size="expand"
            src={
              sections?.hero?.[0]?.image?.file?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
        <div className="hero--right">
          <HeroHeading
            text={sections?.hero?.[0]?.title || ''}
            titleTag="h1"
            color="orange"
          />
        </div>
      </Hero>

      {sections?.featured?.map(section => (
        <FeaturedSection {...section} />
      ))}

      <section className="row:bg-lighter">
        <div>
          <Heading color="black" size="large" className="-a-center -mb-400">
            More Articles
          </Heading>
          {sections?.carousel?.[2]?.cards && (
            <Carousel countItems={3} className="-mh-auto about-us">
              {sections?.carousel?.[2]?.cards.map((card, idx) => (
                <div className="card" key={card?.name || idx}>
                  <img
                    className="card-image"
                    alt="img"
                    src={card?.image?.file?.url}
                    width="600"
                    height="240"
                  />
                  <div className="card-footer basic">
                    <Heading tag="p" color="black" className="-mb-400">
                      {card?.body}
                    </Heading>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </section>

      {data?.genericPage.metaData && (
        <>
          <Head
            metaData={data?.genericPage.metaData}
            featuredImage={data?.genericPage.featuredImage}
          />
          <SchemaJSON
            json={JSON.stringify(data?.genericPage.metaData.schema)}
          />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const path = `electric-leasing/cars/${context?.params?.evHubParam}`;

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
      },
    });

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default EVHubPage;
