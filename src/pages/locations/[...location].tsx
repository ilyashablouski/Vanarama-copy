import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
//import ReactMarkdown from 'react-markdown/with-html';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
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
import { GenericPageQuery_genericPage_sections_hero as Hero } from '../../../generated/GenericPageQuery';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../generated/PageCollection';
import { PAGE_COLLECTION } from '../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../utils/pageSlugs';
import createApolloClient from '../../apolloClient';
import Skeleton from '../../components/Skeleton';

const ReactMarkdown = dynamic(
  () => import('react-markdown/with-html'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Heading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/heading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Card = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/cards'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Modal = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/modal'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Tile = dynamic(
  () => import('@vanarama/uibook/lib/components/molecules/tile'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const SchemaJSON = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/schema-json'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const RouterLink = dynamic(
  () => import('../../components/RouterLink/RouterLink'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const GoldrushForm = dynamic(
  () => import('../../components/GoldrushForm/GoldrushForm'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Breadcrumb = dynamic(
  () => import('../../components/Breadcrumb/Breadcrumb'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const Head = dynamic(
  () => import('../../components/Head/Head'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

export const LocationsPage: NextPage<IGenericPage> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const [createOpportunity, { loading }] = useOpportunityCreation(
    () => setShowModal(true),
    error => {
      if (error?.networkError) {
        handleNetworkError();
      }
      if (error?.message) {
        toast.error(
          'Sorry there seems to be an issue with your request. Pleaser try again in a few moments',
          error?.message,
        );
      }
    },
  );

  if (!data?.genericPage) {
    return null;
  }

  const hero: Hero = getSectionsData(['sections', 'hero'], data.genericPage);
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
        <div
          className="row:bg-hero"
          style={
            {
              '--hero-bg':
                'url(https://res.cloudinary.com/diun8mklf/image/upload/v1587843424/vanarama/Screenshot_2020-04-25_at_8.36.35_pm_wtp06s.png)',
            } as any
          }
        >
          <div className="row:hero">
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
            <div className="hero--decals">
              <svg
                aria-hidden="true"
                focusable="false"
                className="hero-logomark"
                width="320"
                height="318"
                viewBox="0 0 320 318"
              >
                <defs>
                  <clipPath id="clip-Vanarama_Logo">
                    <rect width="320" height="318" />
                  </clipPath>
                </defs>
                <g
                  id="Vanarama_Logo"
                  data-name="Vanarama Logo"
                  clipPath="url(#clip-Vanarama_Logo)"
                >
                  <g
                    id="Group_1"
                    data-name="Group 1"
                    transform="translate(-548.96 -430.411)"
                  >
                    <path
                      id="Path_1"
                      data-name="Path 1"
                      d="M791.259,591.381a17.785,17.785,0,0,0-17.84-17.729c-.222,0-.426.058-.645.067a17.72,17.72,0,0,0-9.362-32.84h0s-58.89.05-63.18,0c0,0,14.286-38.444,17.34-46.827a64.077,64.077,0,0,0,3.366-12.624c2.018-14.048-4.7-27.255-16.6-33.271-.3.472-49.532,89.221-67.931,120.809l.165-.067c-7.728,13.919-10.778,29.466-8.928,46.881,2.982,28.091,20.387,48.953,47.761,55.979,6.445,1.654,13.126,2.388,19.7,3.545l60.518-.194h0l.72,0h0l.667,0,.007-.08a17.7,17.7,0,0,0,8.4-32.663c.143.006.272.046.416.048l.717,0a17.706,17.706,0,0,0,8.032-33.307A17.726,17.726,0,0,0,791.259,591.381Z"
                    />
                    <path
                      id="Path_2"
                      data-name="Path 2"
                      d="M724.251,431.411a55.254,55.254,0,0,1,18.839,38.628,124.188,124.188,0,1,1-81.74,4.495c7.328-13.124,23.034-41.338,23.489-42.1C608.592,443.958,549.96,509.924,549.96,589.337c0,87.508,71.2,158.7,158.7,158.7s158.7-71.2,158.7-158.7C867.362,507.088,804.469,439.27,724.251,431.411Z"
                    />
                  </g>
                </g>
              </svg>
              <svg
                id="hero--curve"
                className="hero--curve"
                data-name="curve"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 170.2"
              >
                <path
                  className="hero--curve-background"
                  d="M0,65.16v107H1920V113.35s-271.62,32.89-625.91,42.9C925.77,179.08,394.27,183,0,65.16Z"
                  transform="translate(0 -2)"
                />
                <path
                  className="hero--curve-foreground"
                  d="M0,2V64.75c394.27,117.82,925.77,113.92,1294.09,91.08C874,167.71,337.57,147.42,0,2Z"
                  transform="translate(0 -1)"
                />
              </svg>
              <svg
                id="hero--curve-m"
                className="hero--curve-m"
                data-name="curve"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 375 65.05"
              >
                <path
                  className="hero--curve-foreground"
                  d="M0,1.81v35c122.83,16.41,249.92,25.7,375,30V47.6C246.33,38.57,119.07,24,0,1.81Z"
                  transform="translate(0 -1)"
                />
                <path
                  className="hero--curve-background"
                  d="M0,66.86H375c-125.08-4.32-252.17-13.61-375-30Z"
                  transform="translate(0 -1.81)"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      {breadcrumbsItems && (
        <div className="row:title -mt-200">
          <Breadcrumb items={breadcrumbsItems} />
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
                    marketingPreference: Boolean(values.consent),
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
          {tiles.tiles?.map((tile: any, idx: number) => (
            <div key={tile.title || idx}>
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
                    link={{ href: tile.link || '#', label: '' }}
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

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'Location',
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

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `locations/${paths?.join('/')}`,
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default LocationsPage;
