import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown/with-html';
import SchemaJSON from 'core/atoms/schema-json';
import Breadcrumb from 'core/atoms/breadcrumb-v2';
import { GenericPageQuery_genericPage_sections_cards_cards as ICard } from '../../../generated/GenericPageQuery';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';
import { getSectionsData } from '../../utils/getSectionsData';
import { GENERIC_PAGE, IGenericPage } from '../../gql/genericPage';
import Head from '../../components/Head/Head';
import createApolloClient from '../../apolloClient';
import Skeleton from '../../components/Skeleton';
import { decodeData, encodeData } from '../../utils/data';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
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
  loading,
}) => {
  const data = decodeData(encodedData);
  if (loading) {
    return <Loading size="large" />;
  }

  if (!data?.genericPage) {
    return <></>;
  }

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
        <Breadcrumb items={breadcrumbsItems} />
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
            {cards.map((card: ICard, i: number) => (
              <Card
                optimisedHost={process.env.IMG_OPTIMISATION_HOST}
                key={i.toString()}
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

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: 'locations',
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data: encodeData(data),
        error: errors ? errors[0] : null,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default LocationsPage;
