import { ApolloError } from '@apollo/client';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import ReactMarkdown from 'react-markdown';
import SchemaJSON from '@vanarama/uibook/lib/components/atoms/schema-json';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import RouterLink from '../../components/RouterLink/RouterLink';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { getSectionsData } from '../../utils/getSectionsData';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Head from '../../components/Head/Head';

interface ISimplePageContainer {
  data: GenericPageQuery | undefined;
  loading?: boolean;
  error?: ApolloError | undefined;
}

const SimplePageContainer: React.FC<ISimplePageContainer> = prop => {
  const { data, loading, error } = prop;

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const metaDataName = getSectionsData(['metaData', 'name'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const featuredImageUrl = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
        <Heading tag="h1" size="xlarge" color="black">
          {metaDataName}
        </Heading>
      </div>
      {featuredImageUrl && (
        <div className="row:bg-white -compact">
          <div className="row:featured-image">
            <Image
              optimisedHost={process.env.IMG_OPTIMISATION_HOST}
              className="-white"
              size="expand"
              src={featuredImageUrl}
            />
          </div>
        </div>
      )}
      <div className="row:text -columns">
        <ReactMarkdown
          className="markdown"
          allowDangerousHtml
          source={data?.genericPage.body || ''}
          renderers={{
            link: props => {
              const { href, children } = props;
              return (
                <RouterLink
                  link={{ href, label: children }}
                  classNames={{ color: 'teal' }}
                />
              );
            },
            heading: props => (
              <Text {...props} size="lead" color="darker" tag="h3" />
            ),
            paragraph: props => <Text {...props} tag="p" color="darker" />,
            image: props => {
              const { src, alt } = props;
              return <img {...{ src, alt }} style={{ maxWidth: '100%' }} />;
            },
          }}
        />
      </div>
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default SimplePageContainer;
