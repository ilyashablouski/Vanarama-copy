import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown/with-html';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import CardTitle from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';

import { LOCATIONS_PAGE_CONTENT } from '../../../gql/contact-us/contactUs';
import {
  LocationsPageData,
  LocationsPageData_regionalOfficesPage_sections_cards_cards as ICard,
} from '../../../../generated/LocationsPageData';

import withApollo from '../../../hocs/withApollo';
import BreadCrumbContainer from '../../../containers/BreadCrumbContainer';
import RouterLink from '../../../components/RouterLink/RouterLink';
import Head from '../../../components/Head/Head';
import getTitleTag from '../../../utils/getTitleTag';

export const LocationsPage: NextPage = () => {
  const { data, loading, error } = useQuery<LocationsPageData>(
    LOCATIONS_PAGE_CONTENT,
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <></>;
  }

  const cards = data?.regionalOfficesPage?.sections?.cards?.cards;
  const metaData = data?.regionalOfficesPage?.metaData;

  return (
    <>
      <Head
        title={metaData?.title || ''}
        metaDescription={metaData?.metaDescription}
        metaRobots={metaData?.metaRobots}
        legacyUrl={metaData?.legacyUrl}
        publishedOn={metaData?.publishedOn}
        featuredImage={data?.regionalOfficesPage.featuredImage}
      />
      <div className="row:title">
        <BreadCrumbContainer />
        <Heading size="xlarge" color="black">
          {data?.regionalOfficesPage.metaData.title}
        </Heading>
      </div>
      <section className="row:text">
        <Heading tag="h3" size="regular" color="black">
          {data?.regionalOfficesPage.intro}
        </Heading>
        <div>
          <ReactMarkdown
            escapeHtml={false}
            source={data?.regionalOfficesPage.body || ''}
            renderers={{
              link: props => {
                const { href, children } = props;
                return <RouterLink link={{ href, label: children }} />;
              },
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
                  }}
                />
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default withApollo(LocationsPage, { getDataFromTree });
