import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import CardTitle from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import { useRouter } from 'next/router';
import { GenericPageQuery_genericPage_sections_cards_cards as ICard } from '../../../generated/GenericPageQuery';
import withApollo from '../../hocs/withApollo';
import RouterLink from '../../components/RouterLink/RouterLink';
import getTitleTag from '../../utils/getTitleTag';
import { getSectionsData } from '../../utils/getSectionsData';
import { useGenericPage } from '../../gql/genericPage';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Head from '../../components/Head/Head';

export const LocationsPage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const cards = getSectionsData(['cards', 'cards'], data.genericPage?.sections);
  const metaDataName = getSectionsData(
    ['metaData', 'name'],
    data.genericPage?.sections,
  );
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

export default withApollo(LocationsPage, { getDataFromTree });
