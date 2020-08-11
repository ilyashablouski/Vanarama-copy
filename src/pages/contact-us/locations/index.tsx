import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown/with-html';

import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Card from '@vanarama/uibook/lib/components/molecules/cards';
import CardTitle from '@vanarama/uibook/lib/components/molecules/cards/CardTitle';

import { LOCATIONS_PAGE_CONTENT } from '../../../gql/contact-us/contactUs';
import { LocationsPageData } from '../../../../generated/LocationsPageData';

import withApollo from '../../../hocs/withApollo';
import BreadCrumbContainer from '../../../containers/BreadCrumbContainer';

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

  return (
    <>
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
          />
        </div>
      </section>
      <section className="row:bg-lighter -thin">
        <div className="row:cards-3col">
          {[...Array(9)].map((i: number) => (
            <Card key={i}>
              <CardTitle title="Birmingham North and South" />
              <Text size="regular" color="darker">
                Tel: 01213825657
              </Text>
              <Text size="regular" color="darker">
                Email: info@autorama.uk
              </Text>
              <Button fill="clear" color="teal" label="More Information" />
            </Card>
          ))}
        </div>
      </section>
    </>
  );
};

export default withApollo(LocationsPage, { getDataFromTree });
