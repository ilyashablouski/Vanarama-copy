import { NextPage } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import { useRouter } from 'next/router';
import { getSectionsData } from '../../../utils/getSectionsData';
import withApollo from '../../../hocs/withApollo';
import BlogPostContainer from '../../../containers/BlogPostContainer/BlogPostContainer';
import { useGenericPage } from '../../../gql/genericPage';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const BlogPost: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const body = data?.genericPage?.body;
  const name = data?.genericPage?.metaData?.name;
  const image = data?.genericPage?.featuredImage?.file?.url;
  const cards = getSectionsData(
    ['cards', 'cards'],
    data?.genericPage?.sections,
  );

  return (
    <BlogPostContainer body={body} name={name} image={image} cards={cards} />
  );
};

export default withApollo(BlogPost);