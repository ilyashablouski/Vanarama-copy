import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import ReactMarkdown from 'react-markdown/with-html';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import * as toast from 'core/atoms/toast/Toast';
import { PreviewNextPageContext } from 'types/common';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import LogoMarkIcon from 'core/assets/icons/custom/LogoMark';
import {
  handleNetworkError,
  DEFAULT_POSTCODE,
} from '../../containers/GoldrushFormContainer/GoldrushFormContainer';
import { useOpportunityCreation } from '../../containers/GoldrushFormContainer/gql';
import { OpportunityTypeEnum } from '../../../generated/globalTypes';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import getTitleTag from '../../utils/getTitleTag';
import { getFeaturedClassPartial } from '../../utils/layout';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
  GenericPageQuery_genericPage_sections_hero as IHero,
  GenericPageQuery_genericPage_sections_tiles_tiles as ITileData,
} from '../../../generated/GenericPageQuery';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../generated/PageCollection';
import { PAGE_COLLECTION } from '../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../utils/pageSlugs';
import createApolloClient from '../../apolloClient';
import RouterLink from '../../components/RouterLink/RouterLink';
import Head from '../../components/Head/Head';
import Skeleton from '../../components/Skeleton';
import { HeroBackground as Hero } from '../../components/Hero';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import ErrorPage from '../_error';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={1} />,
});
const Modal = dynamic(() => import('core/molecules/modal'), {
  loading: () => <Skeleton count={1} />,
});
const Tile = dynamic(() => import('core/molecules/tile'), {
  loading: () => <Skeleton count={1} />,
});
const SchemaJSON = dynamic(() => import('core/atoms/schema-json'), {
  loading: () => <Skeleton count={1} />,
});
const GoldrushForm = dynamic(
  () => import('../../components/GoldrushForm/GoldrushForm'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const HERO_BACKGROUND_URL =
  'https://res.cloudinary.com/diun8mklf/image/upload/v1587843424/vanarama/Screenshot_2020-04-25_at_8.36.35_pm_wtp06s.png';

export const LocationsPage: NextPage<IGenericPage> = ({ data, error }) => {
  const [showModal, setShowModal] = useState(false);

  const [createOpportunity, { loading }] = useOpportunityCreation(
    () => setShowModal(true),
    creationError => {
      if (creationError?.networkError) {
        handleNetworkError();
      }
      if (creationError?.message) {
        toast.error(
          'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
          creationError?.message,
        );
      }
    },
  );

  if (error || !data) {
    return <ErrorPage errorData={error} />;
  }

  const hero: IHero = getSectionsData(['sections', 'hero'], data.genericPage);
  const leadText = getSectionsData(['sections', 'leadText'], data.genericPage);
  const featured = getSectionsData(['sections', 'featured1'], data.genericPage);
  const tiles = getSectionsData(['sections', 'tiles'], data.genericPage);
  const featured1 = getSectionsData(
    ['sections', 'featured2'],
    data.genericPage,
  );
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      {hero && (
        <Hero backgroundUrl={HERO_BACKGROUND_URL}>
          <div className="hero--left">
            <Heading size="xlarge" color="inherit" tag="h1">
              {hero.title}
            </Heading>
            <Text size="large" color="inherit" tag="p">
              {hero.body}
            </Text>
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              className="hero--image"
              plain
              src={
                hero.image?.file?.url ||
                'https://ellisdonovan.s3.eu-west-2.amazonaws.com/benson-hero-images/Audi-Hero-Image-removebg-preview.png'
              }
            />
          </div>
          <div className="hero--right">
            {hero.heroCard &&
              hero.heroCard.map(el => (
                <Card
                  optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                  className="hero-card"
                >
                  <div className="hero-card--inner">
                    <Heading tag="span" color="black" size="small">
                      {el?.title}
                    </Heading>
                    {el?.body ? (
                      <ReactMarkdown
                        allowDangerousHtml
                        source={el?.body || ''}
                        renderers={{
                          link: props => {
                            const { href, children } = props;
                            return (
                              <RouterLink link={{ href, label: children }} />
                            );
                          },
                          heading: props => (
                            <Text
                              {...props}
                              size="lead"
                              color="black"
                              tag="h3"
                            />
                          ),
                          paragraph: props => (
                            <Text {...props} tag="p" color="black" />
                          ),
                        }}
                      />
                    ) : (
                      <>
                        <Button
                          color="teal"
                          size="regular"
                          fill="solid"
                          label="Call 07771 501507"
                          className="-fullwidth"
                        />
                        <Button
                          color="teal"
                          size="regular"
                          fill="outline"
                          label="Get A Quote"
                          className="-fullwidth"
                        />
                      </>
                    )}
                  </div>
                </Card>
              ))}
          </div>
          <LogoMarkIcon />
        </Hero>
      )}
      {breadcrumbsItems && (
        <div className="row:title -mt-200">
          <Breadcrumbs items={breadcrumbsItems} />
        </div>
      )}
      {leadText && (
        <div className="row:lead-text">
          <Heading
            tag={
              getTitleTag(
                leadText.titleTag || null,
              ) as keyof JSX.IntrinsicElements
            }
            size="xlarge"
            color="black"
          >
            {leadText.heading}
          </Heading>
          <ReactMarkdown
            allowDangerousHtml
            source={leadText.description || ''}
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
      )}
      {featured && (
        <div className={`row:${getFeaturedClassPartial(featured)}`}>
          <Card optimisedHost={process.env.IMG_OPTIMISATION_HOST}>
            <GoldrushForm
              callBack={false}
              isSubmitting={loading}
              isPostcodeVisible
              isTextInVisible
              onSubmit={values => {
                createOpportunity({
                  variables: {
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    fullName: values.fullName,
                    postcode: values.postcode || DEFAULT_POSTCODE,
                    communicationsConsent: Boolean(values.consent),
                    privacyPolicy: Boolean(values.privacyPolicy),
                    termsAndConditions: Boolean(values.termsAndCons),
                    opportunityType: OpportunityTypeEnum.CALLBACK,
                  },
                });
              }}
            />
          </Card>
          <div>
            <Heading color="black" size="lead" tag="h3">
              {featured.title}
            </Heading>
            <hr className="-fullwidth\" />
            <ReactMarkdown
              allowDangerousHtml
              source={featured.body || ''}
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
      )}
      {tiles && (
        <section className="row:features-4col">
          <Heading
            size="large"
            color="black"
            tag={
              getTitleTag(tiles.titleTag || 'p') as keyof JSX.IntrinsicElements
            }
          >
            {data && tiles.tilesTitle}
          </Heading>
          {tiles.tiles?.map((tile: ITileData, index: number) => (
            <div key={tile.title || index}>
              <Tile className="-plain -button -align-center" plain>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Image
                    optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                    inline
                    round
                    size="large"
                    src={
                      tile.image?.file?.url ||
                      ' https://source.unsplash.com/collection/2102317/1000x650?sig=403411'
                    }
                  />
                </div>
                {tile.link ? (
                  <RouterLink
                    link={{
                      href: tile.link.legacyUrl || tile.link.url || '#',
                      label: '',
                    }}
                    className="tile--link"
                  >
                    <Heading tag="span" size="regular" color="black">
                      {tile.title}
                    </Heading>
                  </RouterLink>
                ) : (
                  <span className="tile--link">
                    <Heading tag="span" size="regular" color="black">
                      {tile.title}
                    </Heading>
                  </span>
                )}
                <Text tag="p">{tile.body}</Text>
              </Tile>
            </div>
          ))}
        </section>
      )}
      {featured1 && (
        <div className="row:text -columns">
          <Heading size="large" color="black" tag="h2">
            {featured1.title}
          </Heading>
          <div>
            <ReactMarkdown
              allowDangerousHtml
              source={featured1.body || ''}
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
      )}

      {showModal && (
        <Modal
          className="-mt-000 callBack"
          show
          onRequestClose={() => setShowModal(false)}
        >
          <div className="-pt-000">
            <Heading size="regular" color="black">
              Thank you for submitting the form. We will be in touch shortly.
            </Heading>
            <Button
              className="-mt-600"
              dataTestId="goldrush-button_close"
              label="Close"
              size="lead"
              fill="solid"
              color="teal"
              onClick={() => setShowModal(false)}
            />
          </div>
        </Modal>
      )}
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticPaths(context: PreviewNextPageContext) {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Location',
      isPreview: !!context?.preview,
    },
  });
  const items = data?.pageCollection?.items;

  return {
    paths: getPathsFromPageCollection(items, 'locations'),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.location as string[];

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: `locations/${paths?.join('/')}`,
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        data,
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

export default LocationsPage;
