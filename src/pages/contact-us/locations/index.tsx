import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown/with-html';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import CardTitle from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';
import Text from '@vanarama/uibook/lib/components/atoms/text';
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
import { getSectionsData } from '../../../utils/getSectionsData';

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

  const cards = getSectionsData(
    ['cards', 'cards'],
    data.regionalOfficesPage?.sections,
  );
  const metaData = data?.regionalOfficesPage?.metaData;

  return (
    <>
      {metaData && (
        <Head
          metaData={metaData}
          featuredImage={data?.regionalOfficesPage?.featuredImage}
        />
      )}
      <div className="row:title">
        <BreadCrumbContainer />
        <Heading size="xlarge" color="black">
          {metaData?.name}
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
              heading: props => (
                <Text
                  {...props}
                  size="lead"
                  color="darker"
                  className="-mt-100"
                />
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
                      <Text
                        {...props}
                        size="lead"
                        color="darker"
                        className="-mt-100"
                      />
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
    </>
  );
};

export default withApollo(LocationsPage, { getDataFromTree });
