import React, { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import { ParsedUrlQueryInput } from 'querystring';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';

import Image from 'core/atoms/image';
import SchemaJSON from 'core/atoms/schema-json';
import Accordion from 'core/molecules/accordion';
import { IAccordionItem } from 'core/molecules/accordion/AccordionItem';

import { IErrorProps, Nullable, Nullish } from '../../types/common';
import { GENERIC_PAGE } from '../../gql/genericPage';
import { LeaseTypeEnum } from '../../../generated/globalTypes';
import { GetDerivatives } from '../../../generated/GetDerivatives';
import { ProductCardData } from '../../../generated/ProductCardData';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import { GenericPageQuestionQuery_genericPage_sections_faqs_questionSets_questionAnswers as IQuestion } from '../../../generated/GenericPageQuestionQuery';
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
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import ErrorPage from '../_error';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const DEFAULT_HERO_IMAGE_URL =
  'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png';
const DEFAULT_HOT_OFFERS_COUNT = 6;

const optimisationOptions = {
  height: 620,
  width: 620,
  quality: 59,
};

interface IProps extends IEvOffersData {
  data: GenericPageQuery;
  productCard?: Nullish<ProductCardData>;
  productDerivatives?: Nullish<GetDerivatives>;
  searchParam: string;
  error?: IErrorProps;
}

const mapQuestionAnswersToAccordionItems = (
  questionAnswers: Nullish<Nullable<IQuestion>[]>,
): Nullish<IAccordionItem[]> =>
  questionAnswers?.filter(Boolean).map((question, index) => ({
    id: index,
    title: question?.question ?? '',
    children: question?.answer,
  }));

const RedundancyAndLifeEventCoverPage: NextPage<IProps> = ({
  data,
  productDerivatives,
  productCard,
  vehicleListUrlData,
  searchParam,
  error,
}) => {
  const { cachedLeaseType } = useLeaseType(null);

  const sections = data?.genericPage.sectionsAsArray;
  const questionsSection = sections?.questionSet?.[0];
  const findOutMoreSection = sections?.carousel?.[1];
  const featureSections = sections?.featured;

  const heroImageUrl =
    sections?.hero?.[0]?.image?.file?.url || DEFAULT_HERO_IMAGE_URL;
  const isPersonalCar = cachedLeaseType.car === LeaseTypeEnum.PERSONAL;
  const leaseType = isPersonalCar
    ? LeaseTypeEnum.PERSONAL
    : LeaseTypeEnum.BUSINESS;

  const accordionSection = useMemo(
    () => mapQuestionAnswersToAccordionItems(questionsSection?.questionAnswers),
    [questionsSection?.questionAnswers],
  );

  const hotOfferProductCard =
    productCard?.productCarousel?.slice(0, DEFAULT_HOT_OFFERS_COUNT) ?? null;
  const hotOfferDerivatives = productDerivatives?.derivatives ?? null;

  const [partnershipActive, setPartnershipActive] = useState(false);
  const [findOutMoreQueries, setFindOutMoreQueries] = useState<
    Nullable<ParsedUrlQueryInput>
  >(null);

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

  if (error || !data) {
    return <ErrorPage errorData={error} />;
  }

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
            src={heroImageUrl}
          />
        </div>
      </Hero>
      {featureSections?.map(featured => (
        <FeaturedSection featured={featured} key={featured?.title} />
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
            leaseType={leaseType}
            countItems={hotOfferProductCard?.length}
            dataTestIdBtn="car-view-offer"
            data={{
              derivatives: hotOfferDerivatives,
              productCard: hotOfferProductCard,
              vehicleList: vehicleListUrlData,
            }}
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
      {accordionSection && (
        <div
          className="row:bg-white -wide"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Accordion
            className="tilebox -align-center"
            items={accordionSection}
          />
        </div>
      )}
      {findOutMoreSection && !partnershipActive && (
        <ArticleCarousel data={findOutMoreSection} />
      )}
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'redundancy-and-life-event-cover',
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
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        data,
        productDerivatives: productsCarDerivatives || null,
        productCard: productsCar || null,
        vehicleListUrlData,
        searchParam: 'car-leasing',
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        error: convertErrorToProps(error),
      },
    };
  }
}

export default RedundancyAndLifeEventCoverPage;
