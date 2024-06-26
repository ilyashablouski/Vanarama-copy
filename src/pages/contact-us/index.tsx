import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Map from 'core/atoms/map';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import { getFeaturedClassPartial } from '../../utils/layout';
import RouterLink from '../../components/RouterLink/RouterLink';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../gql/genericPage';
import Head from '../../components/Head/Head';
import createApolloClient from '../../apolloClient';
import Skeleton from '../../components/Skeleton';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import { convertErrorToProps } from '../../utils/helpers';
import { PageTypeEnum } from '../../types/common';
import { getBreadCrumbsItems } from '../../utils/breadcrumbs';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={5} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});
const CardTitle = dynamic(() => import('core/molecules/cards/CardTitle'), {
  loading: () => <Skeleton count={1} />,
});

export const ContactUsPage: NextPage<IGenericPage> = ({ data }) => {
  const [show, setShow] = useState(false);

  const COORDS = { lat: 51.762479, lng: -0.438241 };
  const metaData = data?.genericPage?.metaData;
  const breadcrumbsItems = getBreadCrumbsItems(metaData);

  const cardsSection = data?.genericPage.sections?.cards;
  const featured2Section = data?.genericPage.sections?.featured2;

  return (
    <>
      <div className="row:title">
        <Breadcrumbs items={breadcrumbsItems} />
        <Heading size="xlarge" color="black" tag="h1">
          {metaData?.name}
        </Heading>
      </div>
      <section
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured1'], data?.genericPage.sections),
        )}`}
      >
        <div>
          <Heading tag="span" size="large" color="black">
            {getSectionsData(
              ['featured1', 'title'],
              data?.genericPage.sections,
            )}
          </Heading>
          <ReactMarkdown
            allowDangerousHtml
            source={
              getSectionsData(
                ['featured1', 'body'],
                data?.genericPage.sections,
              ) || ''
            }
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
          <div className="button-group">
            <Button
              label="View Office"
              fill="solid"
              color="teal"
              onClick={() => Router.push('')}
            />
          </div>
        </div>
        <Map
          apiKey="AIzaSyDwZ-btyncKZtsysSU-FnjRpydDBwAEwsM"
          center={COORDS}
          zoom={11}
        >
          {show && (
            <Map.InfoWindow
              onCloseClick={() => setShow(false)}
              position={COORDS}
            >
              <div>
                HP2 7DE Maylands Ave, Hemel Hempstead Industrial Estate, Hemel
                Hempstead
              </div>
            </Map.InfoWindow>
          )}
          <Map.Marker
            icon="http://m.schuepfen.ch/icons/helveticons/black/60/Pin-location.png"
            onClick={() => setShow(true)}
            position={COORDS}
            title="Image title"
          />
        </Map>
      </section>
      <section className="row:bg-light">
        <div className="row:tiles">
          {cardsSection?.cards?.map((card, index) => (
            <Card
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              key={card.title || index}
            >
              <Heading size="large" color="black">
                {card.title}
              </Heading>
              <ReactMarkdown
                allowDangerousHtml
                source={card.body || ''}
                renderers={{
                  link: props => {
                    const { href, children } = props;
                    return <RouterLink link={{ href, label: children }} />;
                  },
                  heading: props => (
                    <Text {...props} size="lead" color="darker" tag="h3" />
                  ),
                  paragraph: props => (
                    <Text {...props} tag="p" color="darker" />
                  ),
                }}
              />
            </Card>
          ))}
        </div>
      </section>
      <section
        className={`row:${getFeaturedClassPartial(
          getSectionsData(['featured2'], data?.genericPage.sections),
        )}`}
      >
        <div>
          <Heading size="large" color="black">
            {getSectionsData(
              ['featured2', 'title'],
              data?.genericPage.sections,
            )}
          </Heading>
          <ReactMarkdown
            allowDangerousHtml
            source={
              getSectionsData(
                ['featured2', 'body'],
                data?.genericPage.sections,
              ) || ''
            }
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
        {featured2Section?.cards?.map((card, index) => (
          <Card
            optimisedHost={process.env.IMG_OPTIMISATION_HOST}
            key={card?.title || index}
            inline
          >
            <ImageV2
              quality={60}
              className="card-image"
              width={card?.image?.file?.details.image.width}
              height={card?.image?.file?.details.image.height}
              src={card?.image?.file?.url || ''}
            />
            <CardTitle title={card?.title || ''} />
            <Text color="darker">{card?.body}</Text>
            <RouterLink
              classNames={{ color: 'teal' }}
              className="button -clear"
              link={{
                href: card?.link?.legacyUrl || card?.link?.url || '',
                label: card?.link?.text || '',
              }}
            >
              <div className="button--inner">{card?.link?.text}</div>
            </RouterLink>
          </Card>
        ))}
      </section>
      {metaData && (
        <>
          <Head
            metaData={metaData}
            featuredImage={data?.genericPage.featuredImage}
          />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IGenericPageProps>> {
  try {
    const client = createApolloClient({});

    const { data } = await client.query<
      GenericPageQuery,
      GenericPageQueryVariables
    >({
      query: GENERIC_PAGE,
      variables: {
        slug: 'contact-us',
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
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
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default ContactUsPage;
