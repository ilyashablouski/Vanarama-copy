import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactMarkdown from 'react-markdown/with-html';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import CardTitle from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import { useRouter } from 'next/router';
import { GenericPageQuery_genericPage_sections_cards_cards as ICard } from '../../../generated/GenericPageQuery';
import withApollo from '../../hocs/withApollo';
import RouterLink from '../../components/RouterLink/RouterLink';
import Head from '../../components/Head/Head';
import getTitleTag from '../../utils/getTitleTag';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { useGenericPage } from '../../gql/genericPage';

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

  const cards = getSectionsData(['cards', 'cards'], data.genericPage?.sections);
  const metaData = data?.genericPage?.metaData;

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading size="xlarge" color="black" tag="h1">
          {metaData?.name}
        </Heading>
      </div>
      <section className="row:text -columns">
        <Heading tag="h3" size="regular" color="black">
          {data?.genericPage.intro}
        </Heading>
        <div>
          <ReactMarkdown
            escapeHtml={false}
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
              <Card key={i.toString()}>
                <CardTitle
                  title={card.title || ''}
                  tag={
                    getTitleTag(
                      card.titleTag || null,
                    ) as keyof JSX.IntrinsicElements
                  }
                />
                <ReactMarkdown
                  escapeHtml={false}
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
        <Head
          metaData={metaData}
          featuredImage={data?.genericPage?.featuredImage}
        />
      )}
    </>
  );
};

export default withApollo(LocationsPage, { getDataFromTree });