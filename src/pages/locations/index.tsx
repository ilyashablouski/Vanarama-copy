import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import {
  GenericPageQuery,
  GenericPageQuery_genericPage_sections_cards_cards as ICard,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';
import { getSectionsData } from '../../utils/getSectionsData';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../gql/genericPage';
import Head from '../../components/Head/Head';
import createApolloClient from '../../apolloClient';
import Skeleton from '../../components/Skeleton';
import { decodeData, encodeData } from '../../utils/data';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import { PageTypeEnum } from '../../types/common';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});
const Card = dynamic(() => import('core/molecules/cards'), {
  loading: () => <Skeleton count={1} />,
});
const CardTitle = dynamic(() => import('core/molecules/cards/CardTitle'), {
  loading: () => <Skeleton count={1} />,
});

export const LocationsPage: NextPage<IGenericPage> = ({
  data: encodedData,
}) => {
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const cards = getSectionsData(['cards', 'cards'], data.genericPage?.sections);
  const metaDataName = getSectionsData(['metaData', 'name'], data.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumbs items={breadcrumbsItems} />
        <Heading size="xlarge" color="black" tag="h1">
          {metaDataName}
        </Heading>
      </div>
      <section className="row:text -columns">
        <Heading tag="h3" size="regular" color="black">
          {data?.genericPage.intro}
        </Heading>
        <div>
          <ReactMarkdown
            allowDangerousHtml
            source={data?.genericPage.body || ''}
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
      </section>
      {cards?.length ? (
        <section className="row:bg-lighter -thin">
          <div className="row:cards-3col">
            {cards.map((card: ICard, index: number) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={index.toString()}
              >
                <CardTitle
                  title={card.title || ''}
                  tag={
                    getTitleTag(
                      card.titleTag || null,
                    ) as keyof JSX.IntrinsicElements
                  }
                />
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
      ) : null}
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
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
        slug: 'locations',
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
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

export default LocationsPage;
