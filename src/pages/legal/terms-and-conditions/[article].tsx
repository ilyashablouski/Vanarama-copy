import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import withApollo from '../../../hocs/withApollo';
import { useLegalPageQuery } from '../../../containers/LegalArticleContainer/gql';
import LegalArticleContainer from '../../../containers/LegalArticleContainer/LegalArticleContainer';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useLegalPageQuery(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const sections = data?.genericPage?.sections;

  return (
    <LegalArticleContainer
      body={body}
      name={name}
      image={image}
      sections={sections}
    />
  );
};

export default withApollo(BlogPost);
