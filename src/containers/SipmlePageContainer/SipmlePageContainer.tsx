import { ApolloError } from '@apollo/client';
import Heading from '@vanarama/uibook/lib/components/atoms/heading';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import ReactMarkdown from 'react-markdown';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import RouterLink from '../../components/RouterLink/RouterLink';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

interface ISimplePageContainer {
  data: GenericPageQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

const SimplePageContainer: React.FC<ISimplePageContainer> = prop => {
  const { data, loading, error } = prop;

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const metaData = data?.genericPage?.metaData;

  return (
    <>
      <div className="row:title">
        <Breadcrumb />
        <Heading tag="h1" size="xlarge" color="black">
          {metaData?.name}
        </Heading>
      </div>
      {data?.genericPage.featuredImage?.file?.url && (
        <div className="row:bg-white -compact">
          <div className="row:featured-image">
            <Image
              className="-white"
              size="expand"
              src={data?.genericPage.featuredImage?.file?.url}
            />
          </div>
        </div>
      )}
      <div className="row:text -columns">
        <ReactMarkdown
          escapeHtml={false}
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
    </>
  );
};

export default SimplePageContainer;
