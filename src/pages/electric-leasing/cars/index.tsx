import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import Media from 'core/atoms/media';
import TrustPilot from 'core/molecules/trustpilot';
import SchemaJSON from 'core/atoms/schema-json';
import createApolloClient from '../../../apolloClient';
import FeaturedOnBanner from '../../../components/FeaturedOnBanner';
import NationalLeagueBanner from '../../../components/NationalLeagueBanner';
import WhyLeaseWithVanaramaTiles from '../../../components/WhyLeaseWithVanaramaTiles';
import Head from '../../../components/Head/Head';
import { HeroEv as Hero, HeroPrompt } from '../../../components/Hero';
import NewLeaseOfLifePriceHeader from '../../../components/NewLeaseOfLifePriceHeader';
import Skeleton from '../../../components/Skeleton';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import getTitleTag from '../../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../../utils/layout';
import { evOffersRequest, IEvOffersData } from '../../../utils/offers';
import { getFeaturedSectionsAsArray } from '../../../utils/sections';
import truncateString from '../../../utils/truncateString';
import { formatProductPageUrl, getLegacyUrl } from '../../../utils/url';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../../generated/GenericPageQuery';
import VehicleCard from '../../../components/VehicleCard';
import HeadingSection from '../../../components/HeadingSection';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';
import {
  IPageWithData,
  IPageWithError,
  PageTypeEnum,
} from '../../../types/common';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={4} />,
});
const RouterLink = dynamic(() =>
  import('../../../components/RouterLink/RouterLink'),
);
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

type IProps = IPageWithData<
  IEvOffersData & {
    data: GenericPageQuery;
  }
>;

const ECarsPage: NextPage<IProps> = ({
  data,
  productsElectricOnlyCar,
  vehicleListUrlData,
}) => {
  const [featuresArray, setFeaturesArray] = useState([]);
  const optimisationOptions = {
    height: 620,
    width: 620,
    quality: 59,
  };
  const { sections } = data?.genericPage;
  const titleTagText = sections?.leadText?.titleTag;
  const headerText = sections?.leadText?.heading;
  const descriptionText = sections?.leadText?.description;
  const tiles = data?.genericPage.sections?.tiles?.tiles;
  const tilesTitle = data?.genericPage.sections?.tiles?.tilesTitle;
  const tilesTitleTag = data?.genericPage.sections?.tiles?.titleTag;

  useEffect(() => {
    const newFeaturesArray = getFeaturedSectionsAsArray(sections);
    setFeaturesArray(newFeaturesArray);
  }, [sections]);

  const HeroSection = () => (
    <Hero>
      <div className="hero--left">
        <NewLeaseOfLifePriceHeader
          title={sections?.hero?.title}
          body={sections?.hero?.body}
        />
        {sections?.hero?.heroLabel?.[0]?.visible && (
          <HeroPrompt
            label={sections?.hero?.heroLabel?.[0]?.link?.text || ''}
            url={sections?.hero?.heroLabel?.[0]?.link?.url || ''}
            text={sections?.hero?.heroLabel?.[0]?.text || ''}
            btnVisible={sections?.hero?.heroLabel?.[0]?.link?.visible}
          />
        )}
      </div>
      <div className="hero--right">
        <Image
          lazyLoad
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          optimisationOptions={optimisationOptions}
          className="hero--image"
          plain
          size="expand"
          src={
            sections?.hero?.image?.file?.url ||
            'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/connect.png'
          }
        />
      </div>
    </Hero>
  );

  const CardsSection = () => (
    <section className="row:bg-lighter">
      <div className="row:cards-3col">
        {productsElectricOnlyCar?.productCarousel
          ?.slice(0, 6)
          .map((item, index) => {
            const productUrl = formatProductPageUrl(
              getLegacyUrl(vehicleListUrlData.edges, item?.capId),
              item?.capId,
            );
            return item ? (
              <VehicleCard
                data={item}
                key={item?.capId || index}
                isPersonalPrice={false}
                url={productUrl?.url}
                title={{
                  title: truncateString(
                    `${item?.manufacturerName} ${item?.modelName}`,
                  ),
                  description: item?.derivativeName || '',
                }}
              />
            ) : null;
          })}
      </div>
      <div className="-justify-content-row -pt-500">
        <RouterLink
          className="button"
          classNames={{
            color: 'teal',
            solid: true,
            size: 'regular',
          }}
          link={{
            label: 'View Latest Electric Car Deals',
            href: '/car-leasing/search',
            query: {
              fuelTypes: [
                'petrol/electric hybrid',
                'petrol/plugin elec hybrid',
                'Electric',
                'diesel/plugin elec hybrid',
                'hydrogen fuel cell',
              ],
            },
          }}
          withoutDefaultClassName
          dataTestId="view-all-electric-cars"
        >
          <div className="button--inner">View Latest Electric Car Deals</div>
        </RouterLink>
      </div>
    </section>
  );

  interface ISection {
    body: string;
    title: string;
    titleTag: string;
    image?: {
      file: {
        url: string;
      };
    };
    video?: string;
    index: number;
  }

  const Section = ({
    title,
    titleTag,
    body,
    image,
    video,
    index,
  }: ISection) => (
    <section className={`row:${getFeaturedClassPartial(featuresArray[index])}`}>
      {video ? (
        <Media src={video || ''} width="100%" height="360px" />
      ) : (
        <Image
          optimisedHost={process.env.IMG_OPTIMISATION_HOST}
          src={
            image?.file?.url ||
            'https://source.unsplash.com/collection/2102317/1000x650?sig=40349'
          }
        />
      )}

      <div>
        <Heading
          size="large"
          color="black"
          tag={getTitleTag(titleTag || 'p') as keyof JSX.IntrinsicElements}
        >
          {title}
        </Heading>
        <div className="markdown">
          <ReactMarkdown
            allowDangerousHtml
            source={body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
              heading: props => (
                <Text {...props} size="lead" color="darker" tag="h3" />
              ),
              paragraph: props => <Text {...props} tag="p" color="darker" />,
            }}
          />
        </div>
      </div>
    </section>
  );

  const TrustPilotBanner = () => (
    <section className="row:trustpilot">
      <TrustPilot />
    </section>
  );

  return (
    <>
      <HeroSection />
      <HeadingSection
        titleTag={titleTagText}
        header={headerText}
        description={descriptionText}
      />
      <CardsSection />
      {featuresArray.map(({ title, body, image, titleTag, video }, index) => (
        <Section
          index={index}
          body={body}
          title={title}
          titleTag={titleTag}
          image={image}
          key={title}
          video={video}
        />
      ))}
      {tiles && (
        <WhyLeaseWithVanaramaTiles
          tiles={tiles}
          title={tilesTitle || ''}
          titleTag={tilesTitleTag}
        />
      )}
      <NationalLeagueBanner />
      <FeaturedOnBanner />
      <TrustPilotBanner />
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
        slug: 'electric-leasing/cars',
        isPreview: !!context?.preview,
      },
    });

    const {
      productsElectricOnlyCar,
      vehicleListUrlData,
    } = await evOffersRequest(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        productsElectricOnlyCar: productsElectricOnlyCar || null,
        vehicleListUrlData: vehicleListUrlData || null,
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

export default ECarsPage;
