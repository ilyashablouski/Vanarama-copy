import dynamic from 'next/dynamic';
import createApolloClient from 'apolloClient';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import { GENERIC_PAGE } from 'gql/genericPage';
import Image from 'core/atoms/image';
import SchemaJSON from 'core/atoms/schema-json';
import Accordion from 'core/molecules/accordion/Accordion';
import useLeaseType from 'hooks/useLeaseType';
import { IEvOffersData, specialOffersRequest } from 'utils/offers';
import ProductCarousel from 'components/ProductCarousel/ProductCarousel';
import ArticleCarousel from '../../../components/ArticleCarousel';
import FeaturedSection from '../../../components/FeaturedSection';
import Head from '../../../components/Head/Head';
import { HeroEv as Hero } from '../../../components/Hero';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { GetDerivatives } from '../../../../generated/GetDerivatives';
import { ProductCardData } from '../../../../generated/ProductCardData';

interface IProps extends IEvOffersData {
  data: GenericPageQuery;
  productsCar?: ProductCardData | undefined;
  productsCarDerivatives?: GetDerivatives | undefined;
  searchParam: String;
}

const FreeCarInsurance: NextPage<IProps> = ({
  data,
  productsCarDerivatives,
  productsCar,
  vehicleListUrlData,
  searchParam,
}) => {
  const Heading = dynamic(() => import('core/atoms/heading'), {
    loading: () => <Skeleton count={1} />,
  });
  const { cachedLeaseType } = useLeaseType(null);

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const sections = data?.genericPage.sectionsAsArray;
  const featureSections = sections?.featured || [];
  const isPersonalCar = cachedLeaseType.car === 'Personal';
  const accordionSections = sections?.questionSet?.[0]?.questionAnswers?.map(
    (question, i) => {
      return {
        id: i,
        title: question?.question,
        children: question?.answer,
      };
    },
  );
  const findOutMoreSections = sections?.carousel?.[1];

  return (
    <>
      <Hero>
        <div className="hero--left">
          <div className="nlol" style={{ left: 'auto' }}>
            <p>Find Your New Lease Of Life</p>
            <h2>1 Year FREE Insurance</h2>
            <p>On Every Car Hot Offer</p>
          </div>
        </div>
        <div className="hero--right">
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
      </Hero>
      {featureSections.map(featured => (
        <FeaturedSection featured={featured} key={featured?.title} />
      ))}
      {sections?.carousel?.[0] && (
        <section className="row:bg-lighter">
          <div>
            <Heading
              tag="h2"
              color="black"
              size="large"
              className="-a-center -mb-600"
            >
              {sections?.carousel?.[0]?.title}
            </Heading>

            <ProductCarousel
              leaseType={
                isPersonalCar ? LeaseTypeEnum.PERSONAL : LeaseTypeEnum.BUSINESS
              }
              data={{
                derivatives: productsCarDerivatives?.derivatives || null,
                productCard: productsCar?.productCarousel?.slice(0, 6) || null,
                vehicleList: vehicleListUrlData,
              }}
              countItems={productsCar?.productCarousel?.length || 6}
              dataTestIdBtn="car-view-offer"
            />

            <div className="-justify-content-row -pt-500">
              <RouterLink
                className="button"
                classNames={{
                  color: 'teal',
                  solid: true,
                  size: 'regular',
                }}
                link={{
                  label: 'View Latest Car Offers',
                  href: `/${searchParam}/search`,
                }}
                withoutDefaultClassName
                dataTestId="view-all-cars"
              >
                <div className="button--inner">View Latest Car Offers</div>
              </RouterLink>
            </div>
          </div>
        </section>
      )}
      {accordionSections && (
        <div
          className="row:bg-white -wide"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Accordion
            className="tilebox -align-center"
            items={accordionSections}
          />
        </div>
      )}
      {findOutMoreSections && <ArticleCarousel data={findOutMoreSections} />}
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

export default FreeCarInsurance;

export async function getServerSideProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const path = `car-leasing/free-car-insurance`;

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
      },
    });

    const {
      productsCarDerivatives,
      productsCar,
      vehicleListUrlData,
    } = await specialOffersRequest(client);

    return {
      props: {
        data,
        productsCarDerivatives: productsCarDerivatives || null,
        productsCar: productsCar || null,
        vehicleListUrlData,
        searchParam: 'car-leasing',
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
