import React, { useEffect, useState } from 'react';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';

import Image from 'core/atoms/image';
import SchemaJSON from 'core/atoms/schema-json';
import Accordion from 'core/molecules/accordion';

import { Nullish } from '../../types/common';
import { GENERIC_PAGE } from '../../gql/genericPage';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { GetDerivatives } from '../../../generated/GetDerivatives';
import { ProductCardData } from '../../../generated/ProductCardData';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { getPartnerProperties } from '../../utils/partnerProperties';
import { IEvOffersData, specialOffersRequest } from '../../utils/offers';

import useLeaseType from '../../hooks/useLeaseType';
import createApolloClient from '../../apolloClient';

import Head from '../../components/Head';
import Skeleton from '../../components/Skeleton';
import RouterLink from '../../components/RouterLink';
import { HeroEv as Hero } from '../../components/Hero';
import { freeInsuranceSmallPrint } from '../car-leasing/free-car-insurance';
import FeaturedSection from '../../components/FeaturedSection';
import ArticleCarousel from '../../components/ArticleCarousel';
import ProductCarousel from '../../components/ProductCarousel';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps extends IEvOffersData {
  data: GenericPageQuery;
  productsCar?: Nullish<ProductCardData>;
  productsCarDerivatives?: Nullish<GetDerivatives>;
  searchParam: string;
}

const RedundancyAndLifeEventCoverPage: NextPage<IProps> = ({
  data,
  productsCarDerivatives,
  productsCar,
  vehicleListUrlData,
  searchParam,
}) => {
  const { cachedLeaseType } = useLeaseType(null);

  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };

  const sections = data?.genericPage.sectionsAsArray;
  const featureSections = sections?.featured || [];
  const findOutMoreSections = sections?.carousel?.[1];
  const isPersonalCar = cachedLeaseType.car === LeaseTypeEnum.PERSONAL;
  const accordionSections: any = sections?.questionSet?.[0]?.questionAnswers?.map(
    (question, i) => {
      return {
        id: i,
        title: question?.question,
        children: question?.answer,
      };
    },
  );

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

  return (
    <>
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
      <Hero hideCurve smallPrint={freeInsuranceSmallPrint}>
        <div className="hero--left">
          <div className="nlol nlol-free-insurance" style={{ left: 'auto' }}>
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.hero?.[0]?.body ?? ''}
            />
          </div>
        </div>
        <div className="hero--right">
          <Image
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
        <FeaturedSection
          featured={featured}
          key={featureSections.indexOf(featured)}
        />
      ))}
      {sections?.carousel?.[0] && !partnershipActive && (
        <section className="row:bg-lighter">
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
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'redundancy-and-life-event-cover',
        sectionsAsArray: true,
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });

    const {
      productsCarDerivatives,
      productsCar,
      vehicleListUrlData,
    } = await specialOffersRequest(client);

    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL),
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

export default RedundancyAndLifeEventCoverPage;
