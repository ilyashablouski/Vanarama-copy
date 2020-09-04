import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import Breadcrumb from '@vanarama/uibook/lib/components/atoms/breadcrumb/Breadcrumb';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import CheckmarkCircleSharp from '@vanarama/uibook/lib/assets/icons/CheckmarkCircleSharp';
import ReactMarkdown from 'react-markdown';
import withApollo from '../../../hocs/withApollo';
import { useGenericPage } from '../../../gql/genericPage';
import Head from '../../../components/Head/Head';
import RouterLink from '../../../components/RouterLink/RouterLink';

const crumbs = [
  { label: 'Home', href: '/' },
  { label: 'Van Insurance', href: '/van-insurance' },
  { label: 'Thank You', href: '/van-insurance/multi-year-van-insurance' },
];

const ThankYouPage: NextPage = () => {
  const { data, loading, error } = useGenericPage(
    '/van-insurance/multi-year-van-insurance/thank-you',
  );

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data?.genericPage) {
    return null;
  }

  const metaData = data?.genericPage?.metaData;
  const sections = data.genericPage?.sections;

  return (
    <>
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.genericPage.featuredImage}
      />
      <>
        <div className="row:title">
          <Breadcrumb items={crumbs} />
        </div>
        <div className="row:lead-text">
          <Heading tag="h1" size="xlarge" color="black">
            <Icon
              className="-pr-300"
              color="success"
              icon={<CheckmarkCircleSharp />}
            />
            {sections?.leadText?.heading}
          </Heading>
          <Text size="lead" color="darker">
            {sections?.leadText?.description}
          </Text>
        </div>
      </>
    </>
  );
};

export default withApollo(ThankYouPage, { getDataFromTree });
