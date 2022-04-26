import React, { useEffect, useMemo, useState } from 'react';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { ApolloError } from '@apollo/client';
import { ParsedUrlQueryInput } from 'querystring';
import ReactMarkdown from 'react-markdown';
import dynamic from 'next/dynamic';

import ImageV2 from 'core/atoms/image/ImageV2';
import SchemaJSON from 'core/atoms/schema-json';
import Accordion from 'core/molecules/accordion';
import { IAccordionItem } from 'core/molecules/accordion/AccordionItem';

import {
  IPageWithData,
  IPageWithError,
  Nullable,
  Nullish,
  PageTypeEnum,
} from '../../types/common';
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
import FeaturedSection from '../../components/FeaturedSection';
import ArticleCarousel from '../../components/ArticleCarousel';
import ProductCarousel from '../../components/ProductCarousel';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

const DEFAULT_HERO_IMAGE_URL = `${process.env.HOST_DOMAIN}/vehiclePlaceholder.jpg`;
const DEFAULT_HOT_OFFERS_COUNT = 6;

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
    productCard: Nullable<ProductCardData>;
    productDerivatives: Nullable<GetDerivatives>;
    searchParam: string;
  }
>;

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
}) => {
  const { cachedLeaseType } = useLeaseType(null);

  const sections = data?.genericPage.sectionsAsArray;
  const questionsSection = sections?.questionSet?.[0];
  const findOutMoreSection = sections?.carousel?.[1];
  const featureSections = sections?.featured;

  const heroImage = sections?.hero?.[0]?.image?.file;
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
      <Hero hideCurve terms={sections?.hero?.[0]?.heroTerms}>
        <div className="hero--left">
          <div className="nlol nlol-free-insurance" style={{ left: 'auto' }}>
            <ReactMarkdown
              allowDangerousHtml
              source={sections?.hero?.[0]?.body ?? ''}
            />
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
            width={heroImage?.details.image.width}
            height={heroImage?.details.image.height}
            src={heroImage?.url || DEFAULT_HERO_IMAGE_URL}
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

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});

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
        pageType: PageTypeEnum.DEFAULT,
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
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default RedundancyAndLifeEventCoverPage;
