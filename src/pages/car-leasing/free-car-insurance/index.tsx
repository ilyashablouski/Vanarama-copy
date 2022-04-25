import dynamic from 'next/dynamic';
import { ApolloError } from '@apollo/client';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import React, { useEffect, useState } from 'react';
import ImageV2 from 'core/atoms/image/ImageV2';
import SchemaJSON from 'core/atoms/schema-json';
import Accordion from 'core/molecules/accordion/Accordion';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import useLeaseType from '../../../hooks/useLeaseType';
import { IEvOffersData, specialOffersRequest } from '../../../utils/offers';
import createApolloClient from '../../../apolloClient';
import ArticleCarousel from '../../../components/ArticleCarousel';
import FeaturedSection from '../../../components/FeaturedSection';
import Head from '../../../components/Head/Head';
import ProductCarousel from '../../../components/ProductCarousel/ProductCarousel';
import { HeroEv as Hero } from '../../../components/Hero';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Skeleton from '../../../components/Skeleton';
import { LeaseTypeEnum } from '../../../../generated/globalTypes';
import { GetDerivatives } from '../../../../generated/GetDerivatives';
import { ProductCardData } from '../../../../generated/ProductCardData';
import { getPartnerProperties } from '../../../utils/partnerProperties';
import { Nullable } from '../../../types/common';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps extends IEvOffersData {
  data: GenericPageQuery;
  productsCar?: Nullable<ProductCardData>;
  productsCarDerivatives?: Nullable<GetDerivatives>;
  searchParam: String;
}

export const freeInsuranceSmallPrint =
  '*Based on UK annual average insurance cost. Offer available on selected Car Hot Offers only & subject to availability. Terms Apply.';

const FreeCarInsurance: NextPage<IProps> = ({
  data,
  productsCarDerivatives,
  productsCar,
  vehicleListUrlData,
  searchParam,
}) => {
  const { cachedLeaseType } = useLeaseType(null);

  const sections = data?.genericPage.sectionsAsArray;
  const heroImage = sections?.hero?.[0]?.image?.file;
  const featureSections = sections?.featured || [];
  const isPersonalCar = cachedLeaseType.car === LeaseTypeEnum.PERSONAL;
  const accordionSections: any = sections?.questionSet?.[0]?.questionAnswers?.map(
    (question, index) => {
      return {
        id: index,
        title: question?.question,
        children: question?.answer,
      };
    },
  );
  const findOutMoreSections = sections?.carousel?.[1];

  const [partnershipActive, setPartnershipActive] = useState(false);
  const [findOutMoreQueries, setFindOutMoreQueries] = useState({});

  useEffect(() => {
    const partnership = getPartnerProperties();
    if (partnership) {
      setPartnershipActive(true);
      if (partnership.fuelTypes) {
        setFindOutMoreQueries({
          fuelTypes: partnership.fuelTypes,
        });
      }
    }
  }, []);
  // The small print will eventually be pulled from the CMS
  return (
    <>
      <Hero hideCurve smallPrint={freeInsuranceSmallPrint}>
        <div className="hero--left">
          <div className="nlol nlol-free-insurance" style={{ left: 'auto' }}>
            <p>Find Your New Lease Of Life</p>
            <h2>1 Year&apos;s FREE Insurance</h2>
            <p>On Car Hot Offers</p>
          </div>
        </div>
        <div className="hero--right">
          <ImageV2
            plain
            quality={70}
            size="expand"
            optimisedHost
            lazyLoad={false}
            className="hero--image -pt-000"
            width={heroImage?.details.image.width ?? 1710}
            height={heroImage?.details.image.height ?? 1278}
            src={
              heroImage?.url ||
              'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
            }
          />
        </div>
      </Hero>
      {featureSections.map(featured => (
        <FeaturedSection
          featured={featured}
          key={featureSections.indexOf(featured)}
        />
      ))}
      {sections?.carousel?.[0] && !partnershipActive && (
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
                  query: findOutMoreQueries,
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
      {findOutMoreSections && !partnershipActive && (
        <ArticleCarousel data={findOutMoreSections} />
      )}
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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProps>> {
  try {
    const client = createApolloClient({}, context);
    const path = `car-leasing/free-car-insurance`;

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: path,
        sectionsAsArray: true,
        isPreview: !!context?.preview,
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
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}
